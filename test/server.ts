import winston from "winston";
// const port = process.env.PORT || 3000;

import { FileParser } from "./parser/FileParser";
import { LedgerClient } from "node-ledger-client";
import { eventGeneratorInput } from "./EventGeneratorInput";
import { logger } from "./Logger";
const config = require("../resources/config-fabric-network.json");
const port = process.env.PORT || 3000;

async function main() {
  const ledgerClient = await LedgerClient.init(config);
  await eventGeneratorInput.init(ledgerClient);
  const fileParser = new FileParser();
  fileParser.parseData();
  let id = "7784179"
  let item = await eventGeneratorInput.getConveyorItemById(id);
  this.logger.info(' getItemByID :' +item);

  let desc = "oven";
  let items = await eventGeneratorInput.getConveyorItemByDescription(desc);

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    this.logger.info(' getItemByID :' +element);
  }
/*  logger.
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    logger.console.log("getConveyorItem: " + element);
  } */
}
main();
