import { MappedResolvers } from 'types/graphqlUtils';

import { queries } from './queries';

import UserRepo from 'repository/userRepo';

const userRepo = new UserRepo();

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  Post: {
    author: (post: DB.Post) => userRepo.getById(post.authorId),
    body: (post: DB.Post) => post.body,
    id: (post: DB.Post) => post.id,
    title: (post: DB.Post) => post.title,
  },
};