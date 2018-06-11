import { ConveyorItem } from "../model/ConveyorItem";
import { ConveyorItemType } from "../model/ConveyorItemType";
import { eventGeneratorInput } from "../EventGeneratorInput";
import * as log from "../Logger";

class FileParser {
  private item: ConveyorItem;
  private itemType: ConveyorItemType;
  private lines: any;
  private index: number;

  constructor() {
    this.index = 0;
    this.lines = require("fs")
      .readFileSync("logger_input.txt", "utf-8")
      .split("\n");
  }

  public parseData() {
    try {
      log.logger.debug("Line read: " + this.lines[this.index]);
      const arrayRead = this.lines[this.index].split(";");
      let timestamp = arrayRead[2];
      setTimeout(() => {
        const arrayItem = this.lines[this.index].split(";");
        log.logger.debug("ItemIN : " + arrayItem);
        this.item = {
          id: arrayItem[0],
          typeObject: null,
          type: this.itemType,
          state: null,
          conveyorBay: null
        };
        this.itemType = {
          id: arrayItem[3],
          description: 'oven'
        };
        log.logger.debug(this.item);
        log.logger.debug(this.itemType);
        log.logger.debug("Query chaincode...");
        //eventGeneratorInput.storeConveyorItem(this.item);
        log.logger.debug("Query done at " + new Date());
        this.index++;
        this.parseData();
      }, +timestamp);
    } catch (e) {
        log.logger.error(e);
    }
  }
}

export { FileParser };
