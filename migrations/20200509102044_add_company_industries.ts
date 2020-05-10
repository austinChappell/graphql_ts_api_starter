import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns, addForeignKey } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.COMPANIES_INDUSTRIES, ((t) => {
    addDefaultColumns(knex, t);

    addForeignKey(
      t,
      {
        columnName: 'company_id',
        tableName: TABLES.COMPANIES,
      }
    );

    addForeignKey(
      t,
      {
        columnName: 'industry_id',
        tableName: TABLES.INDUSTRIES,
      }
    );
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.COMPANIES_INDUSTRIES);
}
