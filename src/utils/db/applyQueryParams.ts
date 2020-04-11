async function like(columns, query, queryParams) {
  if (!queryParams) {
    return query;
  }
  if (queryParams.q) {
    const rawSearch = columns.map(col => `${col}::text ILIKE ?`).join(' OR ');
    const bindings = new Array(columns.length).fill(`%${queryParams.q}%`);

    return query.whereRaw(`(${rawSearch})`, bindings);
  }
  return query;
}

function order(query, queryParams) {
  if (!queryParams) {
    return query;
  }
  if (queryParams.orderBy) {
    const sort = queryParams.sort || 'asc';
    return query.orderBy(queryParams.orderBy, sort);
  }
  return query;
}

function paginate(query, queryParams) {
  if (!queryParams) {
    return query;
  }

  // remove pagination if generating report
  if (queryParams.exportReport) {
    return query;
  }

  if (queryParams.limit && queryParams.page) {
    return query.limit(queryParams.limit).offset(queryParams.limit * (queryParams.page - 1));
  }

  return query;
}

export function applyQueryParams(query, queryParams, searchColumns) {
  query
    .modify(q => paginate(q, queryParams))
    .modify(q => order(q, queryParams))
    .modify(q => like(searchColumns, q, queryParams));
}
