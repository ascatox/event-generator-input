import { LedgerClient } from "node-ledger-client";
import { ConveyorItem } from "./model/ConveyorItem";
const config = require("../resources/config-fabric-network.json");
import * as log from "./Logger";

class EventGeneratcorInput {
  private ledgerClient: LedgerClient;

  constructor() {}

  public init(ledgerClient: LedgerClient) {
    this.ledgerClient = ledgerClient;
  }
  public async storeConveyorItem(item: ConveyorItem) {
    if (!this.ledgerClient)
      throw new Error("LedgerClient not instantiated, call init()");
    try {
      const json = JSON.stringify(item);
      return await this.ledgerClient.doInvoke("storeConveyorItem", [json]);
    } catch (err) {
      log.logger.error(err);
      throw new Error(err);
    }
  }
  public async getConveyorItem() {
    if (!this.ledgerClient)
      throw new Error("LedgerClient not instantiated, call init()");
    try {
      return await this.ledgerClient.doInvoke("getConveyorItem", []);
    } catch (err) {
      log.logger.error(err);
      throw new Error(err);
    }
  }

  public async getConveyorItemById(id: string) {
    if (!this.ledgerClient)
      throw new Error("LedgerClient not instantiated, call init()");
    try {
      return await this.ledgerClient.doInvoke("getItemById", [id]);
    } catch (err) {
      log.logger.error(err);
      throw new Error(err);
    }
  }

  public async getConveyorItemByDescription(desc: string) {
    if (!this.ledgerClient)
      throw new Error("LedgerClient not instantiated, call init()");
    try {
      return await this.ledgerClient.doInvoke("getItemById", [desc]);
    } catch (err) {
      log.logger.error(err);
      throw new Error(err);
    }
  }
}

export const eventGeneratorInput = new EventGeneratcorInput();
