import { MappedResolvers } from 'types/graphqlUtils';
import { queries } from './queries';

export const resolvers: MappedResolvers = {
  Query: { ...queries },
};
