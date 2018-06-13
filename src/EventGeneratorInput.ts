import {LedgerClient} from 'node-ledger-client'
import { ConveyorItem } from './model/ConveyorItem';
const config = require('../resources/config-fabric-network.json');

class EventGeneratcorInput {
    private ledgerClient;

    constructor() {
       this.ledgerClient = LedgerClient.init(config); 
    }

    public async storeConveyorItem(item: ConveyorItem) {
        try {
            const json = JSON.stringify(item);
            return await this.ledgerClient.doInvoke('storeConveyorItem', [json]);
        } catch (err) {
            throw new Error(err);
        }
    }


}

export const eventGeneratorInput = new EventGeneratcorInput();