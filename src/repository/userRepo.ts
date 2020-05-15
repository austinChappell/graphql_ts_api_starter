// External Dependencies
import bcrypt from 'bcryptjs';

// Internal Dependencies
import { db } from 'config/db.config';
import BaseRepo, { dbErrorMessage } from './baseRepo';
import { TABLES } from 'constants/index';
import { nullEmptyStringsFromObj } from 'utils';
import { getUtcNow } from 'utils/db';

// Local Variables
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return password ? bcrypt.hashSync(password, salt) : null;
}

export default class UserRepo extends BaseRepo<DB.User> {
  constructor() {
    super();

    this.tableName = TABLES.USERS;

    this.create = async (obj) => {
      const columns = await this.getColumnArray();

      const payload = { ...obj };

      try {
        const body = {
          ...payload,
          email: payload.email.trim().toLowerCase(),
          password: hashPassword(payload.password),
        };

        const data = await db(this.tableName)
          .insert(body)
          .returning(columns);

        const userId = data[0] && data[0].id;
        const user = await db(this.tableName)
          .select(db.raw('*'))
          .where({ id: userId })
          .first();

        return user as unknown as DB.User;
      } catch (error) {
        console.log('error creating user : ', error)
        throw new Error(dbErrorMessage);
      }
    };

    this.createMany = async (arrOfPayloads) => {
      try {
        const users = arrOfPayloads.map((payload) => {
          const payloads = nullEmptyStringsFromObj({
            ...payload,
            email: payload.email.toLowerCase(),
            password: hashPassword(payload.password),
          });

          return payloads;
        });

        const ids = await db(this.tableName).insert(users).returning('id');

        const data = await db(this.tableName).whereIn('id', ids);

        return data;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.updateById = async (id, obj) => {
      try {
        const body = { ...obj };

        if (body.password) {
          body.password = hashPassword(body.password);
        }

        await db(this.tableName)
          .where({ id })
          .update({
            ...body,
            updatedAt: getUtcNow(),
          });

        const user = await this.getById(id);

        return user;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.updateWhere = async (cond, changes) => {
      const columns = await this.getColumnArray();
      const whereObj: any = { ...cond };

      if (changes.password) {
        changes.password = hashPassword(changes.password)
      }

      delete whereObj.createdAt;
      delete whereObj.updatedAt;

      try {
        const data = await db(this.tableName)
          .where(whereObj)
          .update({
            ...changes,
            updatedAt: getUtcNow(),
          })
          .returning(columns);

        return data;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };
  }
}
