import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns, addForeignKey } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.USERS, ((t) => {
    addDefaultColumns(knex, t);
    t.date('date_available').notNullable();
    t.string('email').notNullable().unique();
    t.string('first_name').notNullable();
    t.string('job_title').notNullable();
    t.string('key_skills').notNullable();
    t.string('last_name').notNullable();
    t.string('linked_in_url').notNullable();
    t.string('location').notNullable();
    t.string('password', 1000).notNullable();
    t.string('phone_number', 20).notNullable();

    addForeignKey(
      t,
      {
        columnName: 'work_type_id',
        isInt: true,
        tableName: TABLES.WORK_TYPES,
      }
    );
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.USERS);
}
