import * as path from 'path';
import * as fs from 'fs';
import {
  mergeTypes,
  mergeResolvers,
} from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import * as glob from 'glob';
import { AuthenticationDirective } from 'gql/directives';

export const genSchema = () => {
  const pathToModules = path.join(__dirname, '../gql/modules');
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

  /* eslint-disable global-require  */
  /* eslint-disable import/no-dynamic-require */
  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map((resolver) => require(resolver).resolvers);
  /* eslint-enable global-require  */
  /* eslint-enable import/no-dynamic-require */

  return makeExecutableSchema({
    schemaDirectives: {
      authentication: AuthenticationDirective,
    },
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers<unknown, any>(resolvers),
  });
};
