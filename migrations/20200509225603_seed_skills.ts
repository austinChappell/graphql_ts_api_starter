import * as Knex from 'knex';

import { TABLES } from '../src/constants';

const skills = [
  '.NET',
  'AWS',
  'Agile (Scrum Master / Coach)',
  'Agile',
  'Angular',
  'Back End Development',
  'Business Development',
  'Cloud',
  'Data Science',
  'Database Developer',
  'Database Engineering',
  'Front End / UI',
  'Graphic Design / Art Direction',
  'IT Sales',
  'Infrastructure',
  'Java',
  'Javascript',
  'Junior Developer',
  'Laravel',
  'Marketing',
  'MySQL',
  'Node.js',
  'Other',
  'PHP',
  'Product Management',
  'Project Management',
  'Python',
  'Quality Assurance',
  'React',
  'SQL',
  'Sales / Biz Development',
  'Sales',
  'Social Media / Content Management',
  'Software Engineering',
  'UX Design',
  'VP/Director',
  'Vue',
];

export async function up(knex: Knex): Promise<any> {
  return knex(TABLES.SKILLS).insert(skills.map(label => ({
    label,
  })));
}

export async function down(knex: Knex): Promise<any> {
  return knex(TABLES.SKILLS).whereIn('label', skills).del();
}
