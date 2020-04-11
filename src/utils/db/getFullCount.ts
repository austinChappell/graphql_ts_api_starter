export function getFullCount(db, includeAllColumns = true) {
  const countSql = 'count(*) OVER() AS full_count';
  const baseSql = includeAllColumns ? '*, ' : '';
  const sql = `${baseSql}${countSql}`;
  return db.raw(sql);
}
