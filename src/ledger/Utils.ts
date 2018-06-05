import * as path from 'path';
import * as fs from 'fs';

class Utils {

    private static getPrivateKeyPath(domainName: string, userName: string, cryptoDir: string): string {
        return path.join(this.getCryptoDir(cryptoDir), '/peerOrganizations/', domainName, '/users/', userName + '@' + domainName + '/msp/keystore');
    }

    public static getCertPath(domainName: string, userName: string, cryptoDir: string): string {
        return path.join(this.getCryptoDir(cryptoDir), "/peerOrganizations/", domainName,
            '/users/Admin@' + domainName + '/msp/signcerts/' + userName + '@' + domainName + '-cert.pem');
    }

    public static getCert(domainName: string, userName: string, cryptoDir: string): string {
        const path = this.getCertPath(domainName, userName, cryptoDir);
        return fs.readFileSync(path, 'utf8');
    }

    public static getPrivateKeyFilePath(domainName: string, userName: string, cryptoDir: string): string {
        // List all files in a directory in Node.js recursively in a synchronous fashion
        try {
            let files = [];
            fs.readdirSync(this.getPrivateKeyPath(domainName, userName, cryptoDir))
                .filter((file) => {
                    if (file.indexOf('_sk'))
                        files.push(file);
                });
            if (files.length > 1) {
                throw new Error('Multiple keystore files found!');
            }
            const path = this.getPrivateKeyPath(domainName, userName, cryptoDir) + '/' + files[0]
            return path;
        } catch (err) {
            throw new Error(err);
        }
    }

    public static getPrivateKey(domainName: string, userName: string, cryptoDir: string): Buffer {
        return fs.readFileSync(this.getPrivateKeyFilePath(domainName , userName , cryptoDir));
    }

    private static getCryptoDir(cryptoDir: string): string {
        const os = require('os');
        return cryptoDir || os.homedir();
    }
}

export { Utils };