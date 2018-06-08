import { FileParser } from "./FileParser";
import { ConveyorItem } from "../model/ConveyorItem";
import { ConveyorItemType } from "../model/ConveyorItemType";
import { eventGeneratorInput } from "../EventGeneratorInput";
class Timer {
  private fileParser: FileParser;
  private item: ConveyorItem;
  private itemType: ConveyorItemType;

  //private itemType: ConveyorItemType;
  constructor() {
    this.fileParser = new FileParser();
    //this.itemType = new ConveyorItemType(null, null);
  }

  public run() {
    let timer = this.fileParser.extactTimestamp();
    console.log("Next Item will arrive in: " + timer + " second");
    
    function start() {
      console.log("Simulation start...");
      let lineRead = this.fileParser.parseData();
      let arrayItem = [null, null, null, null];
      arrayItem = lineRead.split(";");
      console.log("ItemIN : " + arrayItem);
      for (let index = 0; index < arrayItem.length; index++) {
        console.log(arrayItem[index]);
      }
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
      console.log("Query done");
      console.log("Simulation finish...");
    }

    setTimeout(start, +timer);
  }
}
export { Timer };
