import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns, addForeignKey } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.USERS_SKILLS, ((t) => {
    addDefaultColumns(knex, t);

    addForeignKey(
      t,
      {
        columnName: 'skill_id',
        tableName: TABLES.SKILLS,
      }
    );

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
  return knex.schema.dropTable(TABLES.USERS_SKILLS);
}
