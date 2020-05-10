// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class IndustryRepo extends BaseRepo<DB.Industry> {
  constructor() {
    super();

    this.tableName = TABLES.INDUSTRIES;
  }
}
