// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class WorkTypeRepo extends BaseRepo<DB.WorkType> {
  constructor() {
    super();

    this.tableName = TABLES.WORK_TYPES;
  }
}
