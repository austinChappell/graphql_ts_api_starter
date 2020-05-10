import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.INDUSTRIES, ((t) => {
    addDefaultColumns(knex, t);
    t.string('label', 100).notNullable();
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.INDUSTRIES);
}
