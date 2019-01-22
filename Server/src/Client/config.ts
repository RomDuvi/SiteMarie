const config = require('../../src/config.json');

export class Config {
    public appPort: string;
    public picturePath: string;
    public jwtSecret: string;
    public databaseUsername: string;
    public databasePassword: string;
    public databaseName: string;
    public clientPath: string;
    public tempPath: string;

    constructor() {
        this.appPort = config.appPort;
        this.picturePath = config.picturePath;
        this.jwtSecret = config.jwtSecret;
        this.databaseUsername = config.databaseUsername;
        this.databasePassword = config.databasePassword;
        this.databaseName = config.databaseName;
        this.clientPath = config.clientPath;
        this.tempPath = config.tempPath;
    }
}