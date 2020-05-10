import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.WORK_TYPES, ((t) => {
    addDefaultColumns(knex, t, { intPrimaryKey: true });
    t.string('label').notNullable();
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.WORK_TYPES);
}
