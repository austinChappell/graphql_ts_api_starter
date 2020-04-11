import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

export const convertObjToCamel = (obj) => {
  if (obj) {
    const keys = Object.keys(obj);
    keys.forEach((k) => {
      const newKey = camelCase(k);
      obj[newKey] = obj[k]; // eslint-disable-line no-param-reassign
      if (newKey !== k) {
        delete obj[k]; // eslint-disable-line no-param-reassign
      }
      if (Array.isArray(obj[newKey])) {
        obj[newKey].forEach((item) => {
          convertObjToCamel(item);
        });
      } else if (obj[newKey] && typeof obj[newKey] === 'object') {
        const isDate = obj[newKey] instanceof Date;
        
        if (!isDate) {
          convertObjToCamel(obj[newKey]);
        }
      }
    });
  }
  return obj;
};

export const convertObjToSnake = (obj) => {
  if (obj) {
    const keys = Object.keys(obj);
    keys.forEach((k) => {
      const newKey = snakeCase(k);
      obj[newKey] = obj[k]; // eslint-disable-line no-param-reassign
      if (newKey !== k) {
        delete obj[k]; // eslint-disable-line no-param-reassign
      }
      if (Array.isArray(obj[newKey])) {
        obj[newKey].forEach((item) => {
          convertObjToSnake(item);
        });
      } else if (obj[newKey] && typeof obj[newKey] === 'object') {
        convertObjToSnake(obj[newKey]);
      }
    });
  }
  return obj;
};
