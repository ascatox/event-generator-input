const scheduler = require("node-schedule");
import {FileParser} from "./FileParser";


class Clock {

    constructor(){

    }
   
    private static clock(){

    var event = scheduler.scheduleJob("5 * * * * *", function() {
        console.log('This runs every 5 second');
        this.FileParse.parseData();
        


    });

    }


}

export { Clock };