import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.USERS, ((t) => {
    addDefaultColumns(knex, t);
    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('email').notNullable().unique();
    t.string('password', 1000).notNullable();
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.USERS);
}
