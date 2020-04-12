// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class PostRepo extends BaseRepo<DB.Post> {
  constructor() {
    super();

    this.tableName = TABLES.POSTS;
  }
}
