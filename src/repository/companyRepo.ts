// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class CompanyRepo extends BaseRepo<DB.Company> {
  constructor() {
    super();

    this.tableName = TABLES.COMPANIES;
  }
}
