import { MappedResolvers } from 'types/graphqlUtils';

import { queries } from './queries';

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  User: {
    email: (user: DB.User) => user.email,
    id: (user: DB.User) => user.id,
    firstName: (user: DB.User) => user.firstName,
    lastName: (user: DB.User) => user.lastName,
  },
};
