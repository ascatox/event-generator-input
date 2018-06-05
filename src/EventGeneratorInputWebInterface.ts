import * as express from 'express';
import * as bodyParser from 'body-parser';
import { logger } from "./Logger";
import { eventGeneratorInput } from "./EventGeneratorInput"
import { ConveyorItem } from './ledger/model/ConveyorItem';
class EventGeneratorInputWebInterface {
  public express

  constructor() {
    this.express = express()
    this.mountRoutes()
  }


  private mountRoutes(): void {
    const router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json())

    router.post('/storeConveyorItem', (req, res) => {
      const body: string = req.body;
      let item: ConveyorItem = JSON.parse(req.body);
      eventGeneratorInput.storeConveyorItem(item).then(data => {
        res.json(data);
      }, error => {
        logger.error(error.message);
        res.status(error.staus || 500).send(error.message);
      });
    });


    this.express.use('/api', router)
  }
}
export default new EventGeneratorInputWebInterface().express
