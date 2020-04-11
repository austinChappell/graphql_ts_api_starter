export const denullifyObject = (
  obj,
  val: 'null' | 'undefined' = 'null') => {
  const copy = { ...obj };
  Object.entries(copy).forEach(([k, v]) => {
    if (val === 'null' && v === null) {
      delete copy[k];
    } else if (v === undefined) {
      delete copy[k];
    }
  });
  return copy;
};
