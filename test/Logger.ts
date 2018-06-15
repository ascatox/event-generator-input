import * as winston from 'winston'
import * as moment from 'moment'

const tsFormat = () => moment().format('DD-MM-YYYY HH:mm:ss').trim();

const logger = new (winston.Logger)({
    level: process.env.LOGGING_LEVEL || 'debug',
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true
        }),
    ]
});
console.log('Logger level is: ' + logger.level);
logger.exitOnError = false;
export { logger };