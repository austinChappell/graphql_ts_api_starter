import * as Knex from 'knex';

import { TABLES } from '../src/constants';

const skills = [
  'Software Engineering',
  'Java',
  '.NET',
  'UX Design',
  'Infrastructure',
  'Sales / Biz Development',
  'Product Management',
  'Quality Assurance',
  'Data Science',
  'Agile (Scrum Master / Coach)',
  'Front End / UI',
  'IT Sales',
  'Marketing',
  'Database Developer',
  'Other',
  'Graphic Design / Art Direction',
  'Project Management',
  'Social Media / Content Management',
  'Back End Development',
  'Junior Developer',
  'VP/Director'
];

export async function up(knex: Knex): Promise<any> {
  return knex(TABLES.SKILLS).insert(skills.map(label => ({
    label,
  })));
}

export async function down(knex: Knex): Promise<any> {
  return knex(TABLES.SKILLS).whereIn('label', skills).del();
}
