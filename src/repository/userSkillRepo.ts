// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class UserSkillRepo extends BaseRepo<DB.UserSkill> {
  constructor() {
    super();

    this.tableName = TABLES.USERS_SKILLS;
  }
}
