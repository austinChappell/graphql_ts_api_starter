import { MappedResolvers } from 'types/graphqlUtils';

import { queries } from './queries';
import { mutations } from './mutations';

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  Mutation: { ...mutations },

  User: {
    email: (user: DB.User) => user.email,
    id: (user: DB.User) => user.id,
    firstName: (user: DB.User) => user.firstName,
    lastName: (user: DB.User) => user.lastName,
  },
};
