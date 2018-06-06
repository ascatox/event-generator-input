
class FileParser {

    constructor() {
    }

    public parseData() {

        var LineByLineReader = require('../line-by-line.js'),
            lr = new LineByLineReader('big_file.txt');

        lr.on('error', function (err) {
            // 'err' contains error object
        });

        lr.on('line', function (line) {
            // 'line' contains the current line without the trailing newline character.
        });

        lr.on('end', function () {
            // All lines are read, file is closed now.
        });
    }

}
export { FileParser };