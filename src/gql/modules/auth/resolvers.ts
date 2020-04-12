import { MappedResolvers } from 'types/graphqlUtils';

import { queries } from './queries';
import { mutations } from './mutations';

export const resolvers: MappedResolvers = {
  Query: { ...queries },
  Mutation: { ...mutations },
};
