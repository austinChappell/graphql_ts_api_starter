import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns, addForeignKey } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.RESUME_ATTACHMENTS, ((t) => {
    addDefaultColumns(knex, t);

    t.string('label', 100).notNullable();
    t.string('url', 1000).notNullable();

    addForeignKey(
      t,
      {
        columnName: 'user_id',
        tableName: TABLES.USERS,
      }
    );
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.RESUME_ATTACHMENTS);
}
