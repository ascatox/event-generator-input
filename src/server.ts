import winston from "winston";
// const port = process.env.PORT || 3000;

import { FileParser } from "./parser/FileParser";
import { LedgerClient } from 'node-ledger-client'
import { eventGeneratorInput } from "./EventGeneratorInput";
import eventGeneratorInputRest from './EventGeneratorInputWebInterface'
const config = require('../resources/config-fabric-network.json');

const port = process.env.PORT || 3001;

function launchREST() {
  eventGeneratorInputRest.listen(port, (err) => {
    if (err) {
      return console.log(err)
    }
    //return console.log(`server is listening on ${port}`)
  });
}
async function main() {
  const ledgerClient = await LedgerClient.init(config);
  launchREST();
  await eventGeneratorInput.init(ledgerClient);
  //await eventGeneratorInput.initChaincode();
  const fileParser = new FileParser();
  fileParser.parseData();
};
main();
