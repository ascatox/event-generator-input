import * as express from 'express';
import * as bodyParser from 'body-parser';
import { logger } from "./Logger";
import { eventGeneratorInput } from "./EventGeneratorInput"
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

    router.post('/store', (req, res) => {
      const body: string = req.body;
      eventGeneratorInput.storeProcessStepRouting(JSON.stringify(body)).then(data => {
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
