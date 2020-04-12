// External Dependencies
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { generateNamespace } from '@gql2ts/from-schema';

// Internal Dependencies
import Server from '../server';
import { genSchema } from '../utils/genSchema';

config();

new Server();

const typescriptTypes = generateNamespace('GQL', genSchema());

fs.writeFile(
  path.join(__dirname, '../types/schema.d.ts'),
  typescriptTypes,
  (err) => {
    // eslint-disable-next-line no-restricted-syntax
    console.log(err);
  }
);
