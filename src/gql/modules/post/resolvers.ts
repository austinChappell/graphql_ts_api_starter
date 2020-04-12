import { userLoader } from 'gql/dataloaders';
import { MappedResolvers } from 'types/graphqlUtils';
import { queries } from './queries';
import { mutations } from './mutations';

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  Mutation: { ...mutations },

  Post: {
    author: (post: DB.Post) => userLoader.load(post.authorId),
    body: (post: DB.Post) => post.body,
    id: (post: DB.Post) => post.id,
    title: (post: DB.Post) => post.title,
  },
};
