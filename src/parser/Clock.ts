
// import { FileParser } from "./FileParser";
// import { ConveyorItem } from "../model/ConveyorItem";
// import { ConveyorItemType } from "../model/ConveyorItemType";
// import { eventGeneratorInput } from "../EventGeneratorInput";
// //import { ConveyorItem } from "../model/ConveyorItem";
// //import { ConveyorItemType } from "../model/ConveyorItemType";


// const scheduler = require("node-schedule");
// class Clock {
//     private fileParser: FileParser;
//     private item: ConveyorItem;
//     private itemType: ConveyorItemType;
//     //private itemType: ConveyorItemType;
//     constructor() {
//         this.fileParser = new FileParser();
//         //this.itemType = new ConveyorItemType(null, null);

//     }

//     public start() {
//         var timer = this.fileParser.extactTimestamp();
//         /* var date = new Date(0, 0, 0, 0, 0, +timer);
//         var event = scheduler.scheduleJob( date, () => { */

//         var rule = new scheduler.RecurrenceRule();
//         rule.second = +timer;
//         var event = scheduler.scheduleJob(rule, () => {
//             console.log('EventGeneratorInput start...');
//             let lineRead = this.fileParser.parseData();
//             let arrayItem = [null, null, null, null];
//             arrayItem = lineRead.split(';');
//             console.log('ItemIN : ' + arrayItem);
//             for (let index = 0; index < arrayItem.length; index++) {
//                 console.log(arrayItem[index]);
//             }
//             this.item =
//                 {
//                     id: arrayItem[0],
//                     typeObject: null,
//                     type: arrayItem[3],
//                     state: null,
//                     bay: null,
//             };

//             this.itemType =
//              {
//                 id : arrayItem[0],
//                 description : arrayItem[3],
                
//             };


//             console.log(this.item);
//             console.log(this.itemType);

//             console.log('Query chaincode...');
//             eventGeneratorInput.storeConveyorItem(this.item);
//             console.log('Query done');
//             event.cancel();
//         });
//     }
// }
// export { Clock };