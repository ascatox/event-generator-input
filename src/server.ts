import productUnitWebInterface from './ProductUnitWebInterface'
import winston from 'winston'

const port = process.env.PORT || 3000;


productUnitWebInterface.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
