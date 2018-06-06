import * as ledgerClient from 'node-ledger-client'
import { ConveyorItem } from './model/ConveyorItem';

class EventGeneratorInput {

    constructor() {
        //TODO
    }

    public async storeConveyorItem(item: ConveyorItem) {
        try {
            const json = JSON.stringify(item);
            return await ledgerClient.doInvoke('storeConveyorItem', [json]);
        } catch (err) {
            throw new Error(err);
        }
    }


}

export const eventGeneratorInput = new EventGeneratorInput();