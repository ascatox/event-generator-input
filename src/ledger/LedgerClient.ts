import utils = require("./Utils");
import Client = require('fabric-client');
import FabricCAServices = require('fabric-ca-client');
import * as path from 'path';
const jsonFile = require("../../resources/config-fabric-network.json");
import { logger } from "../Logger";

class LedgerClient {

    private ledgerClient: Client;
    private config: any;
    private channel: any; //I cant use the interface of fabric-client because not exposed from module :-()
    private cryptoSuite: any;
    private users: any;
    private loggedUser: any;
    private store_path: string;
    private logger: any;


    constructor() {
        //this.logger = new Logger();
        this.ledgerClient = new Client();
        this.config = jsonFile;
        this.loadCerts();
        this.loadOrganizations();
    }

    public async doQuery(fcn: string, args: string[]) {
        if (!this.channel) {
            logger.error('Channel not correctly initialized --> call instantiateChanel');
            throw new Error('Channel not correctly initialized --> call instantiateChanel');
        }
        const request = {
            //targets : --- letting this default to the peers assigned to the channel
            chaincodeId: this.config.chaincode.name,
            chaincodePath: this.config.chaincode.path,
            chaincodeVersion: this.config.chaincode.version,
            chaincodeLang: this.config.chaincode.lang,
            fcn: fcn,
            args: args
        };
        const query_responses = await this.channel.queryByChaincode(request);
        return new Promise((resolve, reject) => {
            logger.info("Query has completed, checking results");
            if (query_responses && query_responses.length == 1) {
                if (query_responses[0] instanceof Error) {
                    logger.error("error from query = ", query_responses[0]);
                    reject("error from query = " + query_responses[0]);
                } else {
                    logger.info("Response is ", query_responses[0].toString());
                    resolve(query_responses[0].toString());
                }
            } else {
                logger.info("No payloads were returned from query");
                reject("No payloads were returned from query");
            }
        });
    }


    public async doInvoke(fcn: string, args: string[]) {
        if (!this.channel) {
            logger.error('Channel not correctly initialized --> call instantiateChanel');
            throw new Error('Channel not correctly initialized --> call instantiateChanel');
        }
        // get a transaction id object based on the current user assigned to fabric client
        const tx_id = await this.ledgerClient.newTransactionID();
        var request = {
            //targets: let default to the peer assigned to the client
            chaincodeId: this.config.chaincode.name,
            chaincodePath: this.config.chaincode.path,
            chaincodeVersion: this.config.chaincode.version,
            chaincodeLang: this.config.chaincode.lang,
            fcn: fcn,
            args: args,
            chainId: this.config.channelName,
            txId: tx_id
        };
        const results = await this.channel.sendTransactionProposal(request, this.config.timeout);
        return await this.manageInvokeProposal(results, tx_id);

    }

    private async manageInvokeProposal(results, tx_id) {
        var proposalResponses = results[0];
        var proposal = results[1];
        let isProposalGood = false;
        return new Promise((resolve, reject) => {
            if (proposalResponses && proposalResponses[0].response &&
                proposalResponses[0].response.status === 200) {
                isProposalGood = true;
                logger.info('Transaction proposal was good');
            } else {
                logger.error('Transaction proposal was bad: ' + proposalResponses[0].message);
                reject('Transaction proposal was bad: ' + proposalResponses[0].message);
            }
            if (isProposalGood) {
                logger.info(
                    'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s"',
                    proposalResponses[0].response.status, proposalResponses[0].response.message);

                // build up the request for the orderer to have the transaction committed
                var request = {
                    proposalResponses: proposalResponses,
                    proposal: proposal
                };

                // set the transaction listener and set a timeout of 30 sec
                // if the transaction did not get committed within the timeout period,
                // report a TIMEOUT status
                var transaction_id_string = tx_id.getTransactionID(); //Get the transaction ID string to be used by the event processing
                this.channel.sendTransaction(request).then(data => {
                    if (data.status === 'SUCCESS')
                        resolve(proposalResponses[0].response.payload.toString());
                    else
                        reject(data.status);
                }, error => {
                    reject(error);
                });
            }
        });
    }

    private async instantiateChannel(organization) {
        //client.loadFromConfig(jsonFile);
        if (this.config) {
            this.channel = this.ledgerClient.newChannel(this.config.channelName);
            let eh = this.ledgerClient.newEventHub();
            for (const peerConf of organization.peers) {
                const peer = this.ledgerClient.newPeer(peerConf.requestURL, null);
                this.channel.addPeer(peer);
                if (peerConf.eventURL) {
                    eh.setPeerAddr(peerConf.eventURL, null);
                }
            }
            for (const ordererConf of organization.orderers) {
                const peer = this.ledgerClient.newOrderer(ordererConf.url, null);
                this.channel.addOrderer(peer);
            }
            logger.info('instantiation finished');

        }
    }

    private async loadCerts() {
        this.store_path = path.join(__dirname, 'hfc-key-store');
        const stateStore = await Client.newDefaultKeyValueStore({ path: this.store_path });
        this.ledgerClient.setStateStore(stateStore);
        this.cryptoSuite = Client.newCryptoSuite();
        const cryptoKeyStore = Client.newCryptoKeyStore({ path: this.store_path });
        this.cryptoSuite.setCryptoKeyStore(cryptoKeyStore);
        this.ledgerClient.setCryptoSuite(this.cryptoSuite);
    }

    private async loadOrganizations() {
        for (const organization of this.config.organizations) {
            const userConfig = organization.users[0]; //Take only the first one
            const privateKeyPath = utils.Utils.getPrivateKeyFilePath(organization.domainName, userConfig.name, this.config.cryptoconfigdir);

            const cryptoContent = {
                privateKey: privateKeyPath,
                signedCert: utils.Utils.getCertPath(organization.domainName, userConfig.name, this.config.cryptoconfigdir)
            };
            const userOptions = {
                username: userConfig.name,
                mspid: organization.mspID,
                cryptoContent: cryptoContent,
                skipPersistence: false,
                isEnrolled: true
            };
            if (!this.loggedUser)
                this.loggedUser = await this.ledgerClient.createUser(userOptions);
            await this.instantiateChannel(organization);
        }
    }
}

export let ledgerClient = new LedgerClient();