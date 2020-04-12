import PostRepo from 'repository/postRepo';
import { Queries } from 'types/graphqlUtils';

const postRepo = new PostRepo();

export const queries: Partial<Queries> = {
  posts: async (_parent, args) => {
    const users = await postRepo.findWhere({}, args.queryParams);

    return users;
  },

  post: async (_parent, args) => {
    const user = await postRepo.getById(args.id);

    if (!user) {
      throw new Error('Post not found.');
    }

    return user;
  },
};
