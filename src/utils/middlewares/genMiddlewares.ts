import * as path from 'path';
import * as glob from 'glob';
import merge from 'lodash.merge';

const genMiddlewaresArray = () => {
  const pathToModules = path.join(__dirname, '../../../../gql/modules');

  /* eslint-disable global-require  */
  /* eslint-disable import/no-dynamic-require */
  const middlewares = glob
    .sync(`${pathToModules}/**/middlewares.?s`)
    .map((middleware) => require(middleware).middlewares);
  /* eslint-enable global-require  */
  /* eslint-enable import/no-dynamic-require */

  return middlewares;
};

export const genMiddlewares = () => {
  const middlewaresArray = genMiddlewaresArray();

  const middlewares = {};

  middlewaresArray.forEach(middleware => {
    merge(middlewares, middleware);
  });

  return middlewares;
};
