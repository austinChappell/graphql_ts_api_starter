// Internal Dependencies
import {
  authMiddleware,
  PermissionMiddleware,
} from 'utils/middlewares';
import { rule, and } from 'graphql-shield';
import { Context } from 'types/context';
import PostRepo from 'repository/postRepo';

// Local Variables
const postRepo = new PostRepo();

function isPostOwner() {
  return rule({ cache: 'contextual' })(
    async (
      _parent,
      _args: GQL.IDeletePostOnMutationArguments | GQL.IUpdatePostOnMutationArguments,
      ctx: Context
    ) => {
      try {
        const userId = ctx.req.userId;

        const post = await postRepo.findOne({
          authorId: userId,
          id: _args.id,
        });

        if (!post) {
          return 'Post not found.';
        }

        return true;
      } catch (error) {
        return error;
      }
    }
  );
}


export const middlewares: PermissionMiddleware = {
  Query: {
    post: authMiddleware(),
    posts: authMiddleware(),
  },
  Mutation: {
    createPost: authMiddleware(),
    deletePost: and(authMiddleware(), isPostOwner()),
    updatePost: and(authMiddleware(), isPostOwner()),
  },
};
