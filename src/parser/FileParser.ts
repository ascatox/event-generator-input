import { ConveyorItem } from "../model/ConveyorItem";
import { ConveyorItemType } from "../model/ConveyorItemType";
import { eventGeneratorInput } from "../EventGeneratorInput";
class FileParser {
    private item: ConveyorItem;
    private itemType: ConveyorItemType;
    private lines: any;
    private index: number;

    constructor() {
        this.index = 0;
        this.lines = require('fs').readFileSync('../../data/logger_input.txt', 'utf-8').split('\n');
    }

    public parseData() {
        console.log('Line read: ' + this.lines[this.index]);
        const arrayRead = this.lines[this.index].split(';');
        let timestamp = arrayRead[2];
        setTimeout(() => {
            const arrayItem = this.lines[this.index].split(';');
            console.log("ItemIN : " + arrayItem);
            this.item = {
                id: arrayItem[0],
                typeObject: null,
                type: arrayItem[3],
                state: null,
                bay: null
            };
            this.itemType = {
                id: arrayItem[0],
                description: arrayItem[3]
            };
            console.log(this.item);
            console.log(this.itemType);
            console.log("Query chaincode...");
            eventGeneratorInput.storeConveyorItem(this.item);
            console.log("Query done at " + new Date());
            this.index++;
            this.parseData();
        }, +timestamp);
    }
}

export { FileParser };