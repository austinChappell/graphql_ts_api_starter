import * as path from 'path';
import * as fs from 'fs';
import {
  mergeTypes,
  mergeResolvers,
} from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';
import * as glob from 'glob';
import { AuthenticationDirective, LengthDirective } from 'gql/directives';

export const genSchema = () => {
  const pathToModules = path.join(__dirname, '../gql/modules');
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-restricted-syntax
    console.log('writing schema...');

    fs.writeFile(
      path.join(__dirname, '../types/schema.graphql'),
      mergeTypes(graphqlTypes),
      (err) => {
        if (err) {
          // eslint-disable-next-line no-restricted-syntax
          console.log(err);
        }
      }
    );
  }

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
      length: LengthDirective,
    },
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers<unknown, any>(resolvers),
  });
};
