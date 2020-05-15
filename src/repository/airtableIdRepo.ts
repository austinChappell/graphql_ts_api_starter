// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class AirtableIdRepo extends BaseRepo<DB.AirtableId> {
  constructor() {
    super();

    this.tableName = TABLES.AIRTABLE_IDS;
  }
}
