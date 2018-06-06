
class FileParser {

    constructor() {
    }

    public parseData(count: number, flag) {
        var lines = require('fs').readFileSync('logger.txt', 'utf-8')
            .split('\n');
        if (!flag) {
            for (var i = 0; i < lines.length; i++) {
                console.log('Line read: ' + lines[i]);
                if (lines[i].split(';').includes('SORTER-INPUT')) {
                    return lines[i];
                }
            }
        }
        else {
            for (var i = count; i < lines.length; i++) {
                console.log('Line read: ' + lines[i]);
                if (lines[i].split(';').includes('SORTER-INPUT')) {
                    return lines[i];
                }

            }
        }

    }
}
export { FileParser };