import * as Knex from 'knex';

import { TABLES } from '../src/constants';
import { addDefaultColumns } from '../src/utils/db';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLES.COMPANIES, ((t) => {
    addDefaultColumns(knex, t);
    t.string('contact_email', 100).notNullable();
    t.string('job_description', 5000).notNullable();
    t.string('link', 5000).notNullable();
    t.string('name', 5000).notNullable();
  }));
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLES.COMPANIES);
}
