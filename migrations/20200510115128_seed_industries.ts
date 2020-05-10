import * as Knex from 'knex';

import { TABLES } from '../src/constants';

const industries = [
  'E-Commerce',
  'Financial',
  'Food & Beverage',
  'Healthcare',
  'Insurance',
  'Recruiting Agency',
  'Restaurant',
  'Robotics',
  'Technology Services',
  'Web',
];

export async function up(knex: Knex): Promise<any> {
  return knex(TABLES.INDUSTRIES).insert(industries.map(label => ({
    label,
  })));
}

export async function down(knex: Knex): Promise<any> {
  return knex(TABLES.INDUSTRIES).whereIn('label', industries).del();
}

