// External Dependencies
import { rule } from 'graphql-shield';

// Internal Dependencies
import UserRepo from '../../../repository/userRepo';
import { PermissionMiddleware } from 'utils/middlewares';

// Local Variables
const userRepo = new UserRepo();

function validateSignUp() {
  return rule({ cache: 'contextual' })(
    async (
      _parent,
      args: any,
    ) => {
      try {
        const existingUser = await userRepo.findOne({
          email: args.input.email.trim().toLowerCase(),
        });

        if (existingUser) {
          return 'A user already exists with this email.';
        }

        return true;
      } catch (error) {
        return error;
      }
    }
  );
}

export const middlewares: PermissionMiddleware = {
  Mutation: {
    signUp: validateSignUp(),
  },
};
