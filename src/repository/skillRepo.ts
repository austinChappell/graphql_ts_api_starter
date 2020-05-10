// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class SkillRepo extends BaseRepo<DB.Skill> {
  constructor() {
    super();

    this.tableName = TABLES.SKILLS;
  }
}
