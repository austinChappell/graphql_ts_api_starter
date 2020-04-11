// Internal Dependencies
import UserRepo from '../../../repository/userRepo';
import { PermissionMiddleware } from 'utils';

// Local Variables
const userRepo = new UserRepo();

export const middlewares: PermissionMiddleware = {
  Query: {},
  Mutation: {},
};
