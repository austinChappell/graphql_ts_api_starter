// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class CompanyIndustryRepo extends BaseRepo<DB.CompanyIndustry> {
  constructor() {
    super();

    this.tableName = TABLES.COMPANIES_INDUSTRIES;
  }
}
