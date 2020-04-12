import UserRepo from '../../../repository/userRepo';
import { Queries } from 'types/graphqlUtils';
import { getUserIdFromCtx } from 'utils/middlewares';

const userRepo = new UserRepo();

export const queries: Partial<Queries> = {
  self: async (_parent, _args, ctx) => {
    try {
      const userId = getUserIdFromCtx(ctx);

      const user = await userRepo.getById(userId);

      return user;
    } catch (error) {
      throw error;
    }
  },
};
