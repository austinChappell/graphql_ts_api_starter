// External Dependencies
import { config } from 'dotenv';

config();

import knex, { Config } from 'knex';

// eslint-disable-next-line import/namespace
import * as dbConfigs from '../../knexfile';

// Internal Dependencies
const configs = dbConfigs as { [key: string]: Config };
const keys = require('./keys');
const { NODE_ENV = 'development' } = keys;
const environment = NODE_ENV.includes('sandbox') ? 'development' : NODE_ENV;
const envConfig = configs[environment];

const isTest = process.env.NODE_ENV === 'test';

export const db = knex({ ...envConfig });

export const dbConfig = isTest ? process.env.TEST_DB_URL : process.env.DB_URL;
