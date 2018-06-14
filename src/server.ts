import winston from "winston";
// const port = process.env.PORT || 3000;

import { FileParser } from "./parser/FileParser";
import { LedgerClient } from 'node-ledger-client'
import { eventGeneratorInput } from "./EventGeneratorInput";
const config = require('../resources/config-fabric-network.json');

async function main() {
  const ledgerClient = await LedgerClient.init(config);
  eventGeneratorInput.init(ledgerClient);
  const fileParser = new FileParser();
  fileParser.parseData();
};
main();
