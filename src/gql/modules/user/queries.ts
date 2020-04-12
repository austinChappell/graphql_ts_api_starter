import UserRepo from '../../../repository/userRepo';
import { Queries } from 'types/graphqlUtils';

const userRepo = new UserRepo();

export const queries: Partial<Queries> = {
  users: async (_parent, args) => {
    const users = await userRepo.findWhere({}, args.queryParams);

    return users;
  },

  user: async (_parent, args) => {
    const user = await userRepo.getById(args.id);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  },
};
