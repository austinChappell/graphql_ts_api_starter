// Internal Dependencies
import PostRepo from 'repository/postRepo';

import { Mutations } from 'types/graphqlUtils';

const postRepo = new PostRepo();

export const mutations: Partial<Mutations> = {
  createPost: (_parent, args, ctx) => postRepo
    .create({
      ...args.input,
      authorId: ctx.req.userId,
    }),

  deletePost: (_parent, args, ctx) => postRepo
    .deleteById(args.id),

  updatePost: (_parent, args, ctx) => postRepo
    .updateById(args.id, args.input),
};
