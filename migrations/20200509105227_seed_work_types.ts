import * as Knex from 'knex';

import { TABLES, WorkType } from '../src/constants';

const fullTime = {
  id: WorkType.FullTime,
  label: WorkType[WorkType.FullTime],
};
const partTime = {
  id: WorkType.PartTime,
  label: WorkType[WorkType.PartTime],
};
const either = {
  id: WorkType.Either,
  label: WorkType[WorkType.Either],
};

export async function up(knex: Knex): Promise<any> {
  return knex(TABLES.WORK_TYPES).insert([
    fullTime,
    partTime,
    either,
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return knex(TABLES.WORK_TYPES).whereIn('id', [fullTime.id, partTime.id, either.id]).del();
}
