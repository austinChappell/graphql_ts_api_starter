// Internal Dependencies
import PostRepo from 'repository/postRepo';

import { Mutations } from 'types/graphqlUtils';
import { Context } from 'types/context';

const postRepo = new PostRepo();

async function verifyOwnership(
  args: GQL.IDeletePostOnMutationArguments | GQL.IUpdatePostOnMutationArguments,
  ctx: Context
) {
  const post = await postRepo.findOne({
    authorId: ctx.req.userId,
    id: args.id,
  });

  if (!post) {
    throw new Error('Post not found.');
  }
}

export const mutations: Partial<Mutations> = {
  createPost: (_parent, args, ctx) => postRepo
    .create({
      ...args.input,
      authorId: ctx.req.userId,
    }),

  deletePost: async (_parent, args, ctx) => {
    await verifyOwnership(args, ctx);

    return postRepo.deleteById(args.id);
  },

  updatePost: async (_parent, args, ctx) => {
    await verifyOwnership(args, ctx);

    return postRepo.updateById(args.id, args.input);
  }
};
