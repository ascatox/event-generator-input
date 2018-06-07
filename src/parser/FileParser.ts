
class FileParser {
    private index;

    constructor() {
        this.index = 0;
    }
    public extactTimestamp(){
        let arrayRead = [null, null, null, null];
        var lines = require('fs').readFileSync('logger_text.txt', 'utf-8')
        .split('\n');
        for (var i = this.index; i < lines.length; i++) {
            arrayRead = lines[i].split(';');
            console.log('Timestamp extract: ' +arrayRead[2]);
            return arrayRead[2];
    }
}

    public parseData() {
        var lines = require('fs').readFileSync('logger_text.txt', 'utf-8')
            .split('\n');
        for (var i = this.index; i < lines.length; i++) {
            console.log('Line read: ' + lines[i]);
            //if (lines[i].split(';').includes('SORTER-INPUT')) {
            this.index++;
            return lines[i];
        }
    }
}

export { FileParser };