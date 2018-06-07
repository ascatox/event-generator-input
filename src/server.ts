import winston from 'winston';
// const port = process.env.PORT || 3000;

import {FileParser} from './parser/FileParser'
import { Clock } from './parser/Clock';
// productUnitWebInterface.listen(port, (err) => {
//   if (err) {
//     return console.log(err)
//   }

//   return console.log(`server is listening on ${port}`)
// })
(async function main() {
  //const fileParser = new FileParser();
  //let line = fileParser.parseData(70,true);
  //console.log(line);
   
  
  const clock = new Clock();
  clock.start();
  

}());
