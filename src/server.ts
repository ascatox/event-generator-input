import winston from 'winston';
// const port = process.env.PORT || 3000;

import {FileParser} from './parser/FileParser'
// productUnitWebInterface.listen(port, (err) => {
//   if (err) {
//     return console.log(err)
//   }

//   return console.log(`server is listening on ${port}`)
// })
(function main() {
  const fileParser = new FileParser();
  let line = fileParser.parseData(70,true);
  console.log(line);

}());
