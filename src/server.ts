import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit'
import { applyMiddleware } from 'graphql-middleware';

import { genSchema } from 'utils/genSchema';
import keys from './config/keys';
import app from './app'; // This needs to be imported before graphql shield permission
import { gqlShieldMiddlewares } from './utils/middlewares/index';

const { PORT = '4000' } = keys;

const schema = genSchema();

const schemaWithMiddleware = applyMiddleware(
  schema,
  gqlShieldMiddlewares
);

export const server = new ApolloServer({
  context: (req) => ({ ...req }),
  schema: schemaWithMiddleware,
  uploads: {
    maxFileSize: 26214400, // 25mb
  },
  validationRules: [depthLimit(10)],
});

server.applyMiddleware({ app }); // app is from an existing express app

class Server {
  start: () => void;

  constructor() {
    this.start = () => {
      app.listen({ port: PORT }, () => {
        // eslint-disable-next-line no-restricted-syntax
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      });
    };
  }
}

export default Server;
