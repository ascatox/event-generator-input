const scheduler = require("node-schedule");
//import { eventGeneratorInput } from "../EventGeneratorInput"
import { ConveyorItem } from "../ledger/model/ConveyorItem";
import { ConveyorItemType } from "../ledger/model/ConveyorItemType";


class Clock {

    constructor() {

    }

    private static clock() {

        var event = scheduler.scheduleJob("5 * * * * *", function () {
            console.log('EventGeneratorInput start...');

            let lineRead = this.FileParse.parseData();
            console.log('Item In on conveyor' +lineRead);
            let item: ConveyorItem;
            let itemType: ConveyorItemType = new ConveyorItemType(lineRead[0], lineRead[3]);

            item: { id: lineRead[0] };
            item: { typeObject: null  };
            item: { type: this.itemType.description};
            item: { state: null };
            item: { bay: null };

            console.log('Query chaincode...');
            this.eventGeneratorInput.storeConveyorItem(item);
            console.log('Query done');

        });

    }


}

export { Clock };