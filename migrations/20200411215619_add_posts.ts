import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns, addForeignKey } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.POSTS, ((t) => {
    addDefaultColumns(knex, t);
    t.string('title').notNullable();
    t.string('body', 5000).notNullable();

    addForeignKey(
      t,
      {
        columnName: 'author_id',
        tableName: TABLES.USERS,
      }
    )
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.POSTS);
}
