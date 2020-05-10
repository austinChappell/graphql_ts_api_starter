// Internal Dependencies
import BaseRepo from './baseRepo';
import { TABLES } from 'constants/index';

export default class ResumeAttachmentRepo extends BaseRepo<DB.ResumeAttachment> {
  constructor() {
    super();

    this.tableName = TABLES.RESUME_ATTACHMENTS;
  }
}
