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
    var timer = this.fileParser.extactTimestamp();

    setTimeout(function() {
      console.log(+Date.now());
      console.log("Simulation start...");
    }, timer);
    console.log(+Date.now());
    console.log("Simulation finish...");

  }
}
export {Timer};
