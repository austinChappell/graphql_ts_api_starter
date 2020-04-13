import PostRepo from 'repository/postRepo';
import { Queries } from 'types/graphqlUtils';

const postRepo = new PostRepo();

export const queries: Partial<Queries> = {
  posts: async (_parent, args) => {
    const posts = await postRepo.findWhere({}, args.queryParams);

    return posts;
  },

  post: async (_parent, args) => {
    const post = await postRepo.getById(args.id);

    if (!post) {
      throw new Error('Post not found.');
    }

    return post;
  },
};
