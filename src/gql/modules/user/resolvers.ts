import PostRepo from 'repository/postRepo';
import { MappedResolvers } from 'types/graphqlUtils';
import { queries } from './queries';

const postRepo = new PostRepo();

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  User: {
    email: (user: DB.User) => user.email,
    id: (user: DB.User) => user.id,
    firstName: (user: DB.User) => user.firstName,
    lastName: (user: DB.User) => user.lastName,
    posts: (user: DB.User) => postRepo
      .findWhere({ authorId: user.id })
      .then(result => result.data),
  },
};
