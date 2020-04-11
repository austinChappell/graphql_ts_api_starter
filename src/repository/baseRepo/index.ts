// Internal Dependencies
import {
  denullifyObject,
  nullEmptyStringsFromObj,
} from 'utils';
import { db } from 'config/db.config';
import {
  applyQueryParams,
  getFullCount,
  getUtcNow,
} from 'utils/db';
import { QueryParams } from 'types';

// Local Typings
type ArrayPartial<T> = {
  [P in keyof T]?: T[P] | T[P][];
};

// Local Variables
export const dbErrorMessage = 'Something went wrong.';

export default class BaseRepo<T = any> {
  create: (payload: Partial<T>) => Promise<T>;
  createMany: (payloads: Partial<T>[]) => Promise<T[]>;
  deleteById: (id: string | number) => Promise<boolean>;
  deleteManyById: (id: (string | number)[]) => Promise<boolean>;
  deleteWhere: (obj: Partial<T>) => Promise<boolean>;
  findManyBy: (column: string, valArray: any[]) => Promise<T[]>;
  findOne: (obj: Partial<T>) => Promise<T>;
  findWhere: (
    conditions: ArrayPartial<T>,
    query?: QueryParams,
  ) => Promise<{
    data: T[];
    fullCount: number;
  }>;
  findWhereExcept: (
    obj: any,
    query: QueryParams,
    exceptVals: any,
    exceptKey: any
  ) => Promise<{
    data: T[];
    fullCount: number;
  }>;
  getAll: (queryParams?: QueryParams) => Promise<T[]>;
  getById: (id: string | number) => Promise<T>;
  getColumnArray: () => Promise<string[]>;
  getManyById: (ids: (string | number)[]) => Promise<T[]>;
  searchColumns: string[];
  tableName: string;
  updateById: (id: string | number, changes: Partial<T>) => Promise<T>;
  updateMany: (ids: string[] | number[], changes: Partial<T>) => Promise<T[]>;
  updateWhere: (cond: Partial<T>, changes: Partial<T>) => Promise<T[]>;
  whereIn: (key: string, vals: any[]) => Promise<T[]>;

  constructor() {
    this.searchColumns = ['id'];

    this.create = async (payload) => {
      try {
        const columns = await this.getColumnArray();
        const data = await db(this.tableName)
          .insert(nullEmptyStringsFromObj(payload))
          .returning(columns);

        return data[0];
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.createMany = async (payloads) => {
      if (payloads.length === 0) {
        return [];
      }

      try {
        const columns = await this.getColumnArray();
        const insertArr = payloads.map(
          payload => nullEmptyStringsFromObj({ ...payload })
        );
        const data: T[] = await db<T>(this.tableName)
          .insert(insertArr)
          .returning(columns);

        return data;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.getAll = async (queryParams) => {
      try {
        const query = db(this.tableName)
          .select(db.raw(getFullCount(db)));

        applyQueryParams(query, queryParams, this.searchColumns);

        const data = await query;

        return data as T[];
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    // more performant than findOne function
    // use this if only needing id
    this.getById = async (id) => {
      try {
        const data = await db(this.tableName)
          .where({ id });
        return data[0];
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.findManyBy = async (column, valArr) => {
      if (!valArr || valArr.length === 0) {
        return [];
      }
      try {
        const data = await db
          .select(db.raw('*'))
          .from(this.tableName)
          .whereIn(column, valArr);

        return data as T[];
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.getManyById = async (ids) => {
      try {
        const data = await db(this.tableName)
          .whereIn('id', ids);

        return data;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    // if client already has all data, this filtering
    // should be done in the browser to alleviate server
    this.findWhere = async (obj, query) => {
      const whereObj: any = denullifyObject(obj);
      delete whereObj.createdAt;
      delete whereObj.updatedAt;

      const whereIn = {};

      Object.entries(whereObj).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          whereIn[k] = v;
          delete whereObj[k];
        }
      });

      const queryParams = query ? nullEmptyStringsFromObj(query) : null;

      try {
        const knexQuery = db<T>(this.tableName)
          .select(db.raw(getFullCount(db)))
          .where(whereObj);

        Object.entries(whereIn).forEach(([k, v]: [any, any]) => {
          knexQuery.whereIn(k, v);
        });

        applyQueryParams(knexQuery, queryParams, this.searchColumns);

        const data = await knexQuery as T[];
        const [first] = data as any;
        const fullCount = first ? Number(first.fullCount) : 0;
        const normalizedData = data.map(d => {
          const newDatum: any = { ...d };

          delete newDatum.fullCount;

          return newDatum as T;
        });

        const result = {
          data: normalizedData,
          fullCount,
        };

        return result;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.whereIn = async (key, vals) => {
      try {
        const data = await db.select()
          .from(this.tableName)
          .whereIn(key, vals);

        return data;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    // call .findWhere
    // filter out the remaining data with exceptValues and exceptKey if provided
    // exceptKey defaults to 'id'
    this.findWhereExcept = async (obj, query, exceptVals, exceptKey = 'id') => {
      const cleanQueryParams = { ...query };
      delete cleanQueryParams.limit;
      delete cleanQueryParams.page;
      try {
        const dataset = await this.findWhere(obj, query);
        const data = dataset.data.filter(
          item => !exceptVals.includes(String(item[exceptKey]))
        );
        return {
          data,
          fullCount: data.length,
        };
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.findOne = async (obj) => {
      try {
        const data = await db(this.tableName)
          .where(obj);

        return data[0];
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.getColumnArray = async () => {
      const columns = await db(this.tableName).columnInfo();
      return Object.keys(columns);
    };

    this.updateById = async (id, changes) => {
      try {
        const columns = await this.getColumnArray();
        const data = await db(this.tableName)
          .where({ id })
          .update({
            ...changes,
            updatedAt: getUtcNow(),
          })
          .returning(columns);

        return data[0];
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.updateMany = async (ids, changes) => {
      if (ids.length === 0) {
        return [];
      }

      const columns = await this.getColumnArray();

      try {
        const data = await db(this.tableName)
          .whereIn('id', ids)
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

    this.updateWhere = async (cond, changes) => {
      const columns = await this.getColumnArray();
      const whereObj: any = { ...cond };

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

    this.deleteById = async (id) => {
      try {
        await db(this.tableName).del().where({ id });

        return true;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.deleteManyById = async (ids) => {
      try {
        await db(this.tableName).del().whereIn('id', ids);

        return true;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };

    this.deleteWhere = async (obj) => {
      const whereObj: any = { ...obj };

      delete whereObj.createdAt;
      delete whereObj.updatedAt;
      delete whereObj.fullCount;

      try {
        await db(this.tableName).del().where(whereObj);

        return true;
      } catch (error) {
        throw new Error(dbErrorMessage);
      }
    };
  }
}
