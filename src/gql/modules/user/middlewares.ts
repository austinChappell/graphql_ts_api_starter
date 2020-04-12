// Internal Dependencies
import {
  authMiddleware,
  PermissionMiddleware,
} from 'utils/middlewares';

export const middlewares: PermissionMiddleware = {
  Query: {
    user: authMiddleware(),
    users: authMiddleware(),
  },
  Mutation: {},
};
