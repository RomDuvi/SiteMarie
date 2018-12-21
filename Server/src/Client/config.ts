const config = require('../../src/config.json');

export class Config {
    public appPort;
    public picturePath;
    public jwtSecret;
    public databaseUsername;
    public databasePassword;
    public databaseName;

    constructor() {
        this.appPort = config.appPort;
        this.picturePath = config.picturePath;
        this.jwtSecret = config.jwtSecret;
        this.databaseUsername = config.databaseUsername;
        this.databasePassword = config.databasePassword;
        this.databaseName = config.databaseName;
    }
}