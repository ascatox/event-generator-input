//import * as LedgerClient from 'node-ledger-client'
import { ConveyorItem } from './model/ConveyorItem';
const config = require('../resources/config-fabric-network.json');

class EventGeneratcorInput {
    private ledgerClient;

    // const config = require('./config-fabric-network.json');
    // const ledgerClient = await LedgerClient.init(config);


    constructor() {
       // this.ledgerClient = new LedgerClient(config);
    }

    public async storeConveyorItem(item: ConveyorItem) {
        try {
            const json = JSON.stringify(item);
            //return await this.ledgerClient.doInvoke('storeConveyorItem', [json]);
        } catch (err) {
            throw new Error(err);
        }
    }


}

export const eventGeneratorInput = new EventGeneratcorInput();