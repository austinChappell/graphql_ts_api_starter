import cloneDeep from 'lodash.clonedeep';

export const nullEmptyStringsFromObj = (obj) => {
  const objCopy = cloneDeep(obj);
  Object.entries(objCopy).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      objCopy[k] = v;
    } else if (v && typeof v === 'object') {
      objCopy[k] = nullEmptyStringsFromObj(v);
    } else if (v === '') {
      objCopy[k] = null;
    }
  });
  return objCopy;
};
