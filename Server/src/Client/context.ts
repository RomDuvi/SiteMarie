import { Config } from './config';
const config = new Config();

var params = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: config.databaseUsername,
        password: config.databasePassword,
        database: config.databaseName,
        charset: 'utf8'
    }
}

var knex = require('knex')(params);

export const context = require('bookshelf')(knex);
