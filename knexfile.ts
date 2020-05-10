import { config } from 'dotenv';
import { Config } from 'knex';

config();

import snakeCase from 'lodash.snakecase';

import { convertObjToCamel } from './src/utils/snakeToCamel';
import keys from './src/config/keys';

const {
  DB_URL = 'postgresql://localhost/covid_19_jobs_dev',
  NODE_ENV,
  TEST_DB_URL = 'postgresql://localhost/covid_19_jobs_test',
} = keys;

const isTest = NODE_ENV === 'test';

const connectionString = isTest ? TEST_DB_URL : DB_URL;

const postProcessResponse = (result) => convertObjToCamel(result);

function afterCreate(conn, cb) {
  conn.query('SET timezone="UTC";', function (err) {
    cb(err, conn);
  });
}

const configs: {
  [key: string]: Config;
} = {
  development: {
    client: 'pg',
    connection: connectionString,
    debug: process.env.NODE_ENV === 'development' && process.env.DEBUG_DB === 'true',
    pool: { afterCreate },
    postProcessResponse,
    searchPath: ['knex', 'public'],
    wrapIdentifier: (value, origImpl) => origImpl(snakeCase(value)),
  },

  test: {
    client: 'pg',
    connection: connectionString,
    pool: { afterCreate },
    postProcessResponse,
    searchPath: ['knex', 'public'],
    wrapIdentifier: (value, origImpl) => origImpl(snakeCase(value)),
  },

  staging: {
    client: 'pg',
    connection: connectionString,
    migrations: {
      tableName: 'knex_migrations',
    },
    pool: {
      afterCreate,
      min: 2,
      max: 10,
    },
    postProcessResponse,
    wrapIdentifier: (value, origImpl) => origImpl(snakeCase(value)),
  },

  production: {
    client: 'pg',
    connection: connectionString,
    migrations: {
      tableName: 'knex_migrations',
    },
    pool: {
      afterCreate,
      min: 2,
      max: 10,
    },
    postProcessResponse,
    wrapIdentifier: (value, origImpl) => origImpl(snakeCase(value)),
  },
};

module.exports = configs;
