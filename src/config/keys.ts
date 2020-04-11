// External Dependencies
import { config } from 'dotenv';

config();

interface Keys {
  CLIENT_URL: string;
  DB_URL: string;
  NODE_ENV: string;
  PORT: string;
  TEST_DB_URL: string;
  TOKEN_SECRET: string;
}

const keyNames = [
  'CLIENT_URL',
  'DB_URL',
  'NODE_ENV',
  'PORT',
  'TEST_DB_URL',
  'TOKEN_SECRET',
];
const nullableKeys = [];

function getKey(name: string) {
  return process.env.NODE_ENV ? process.env[name] : '';
}

function buildKeys(): Keys {
  const fullDirname = __dirname;
  const finalSlashIndex = fullDirname.lastIndexOf('/');
  const dirname = fullDirname.slice(0, finalSlashIndex);

  const keys: Keys = {
    CLIENT_URL: getKey('CLIENT_URL'),
    DB_URL: getKey('DB_URL'),
    NODE_ENV: getKey('NODE_ENV'),
    PORT: getKey('PORT'),
    TEST_DB_URL: getKey('TEST_DB_URL'),
    TOKEN_SECRET: getKey('TOKEN_SECRET'),
  };

  keyNames.forEach((k) => {
    if (!process.env[k]) {
      throw new Error(`Missing environment variable ${k}`);
    }
  });

  nullableKeys.forEach((k) => {
    keys[k] = process.env[k];
  });

  return keys;
}

export default buildKeys();
