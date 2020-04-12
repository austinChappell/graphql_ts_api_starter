// Internal Dependencies
import {
  authMiddleware,
  PermissionMiddleware,
} from 'utils/middlewares';

export const middlewares: PermissionMiddleware = {
  Query: {
    post: authMiddleware(),
    posts: authMiddleware(),
  },
  Mutation: {},
};
