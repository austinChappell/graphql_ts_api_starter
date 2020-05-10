// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class CompanySkillRepo extends BaseRepo<DB.CompanySkill> {
  constructor() {
    super();

    this.tableName = TABLES.COMPANIES_SKILLS;
  }
}
