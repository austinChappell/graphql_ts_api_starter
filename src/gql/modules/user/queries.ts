import UserRepo from '../../../repository/userRepo';
import { Queries } from 'types/graphqlUtils';

const userRepo = new UserRepo();

export const queries: Partial<Queries> = {
  users: async (_parent, args, ctx) => {
    const users = await userRepo.findWhere({}, args.queryParams);

    console.log('users: ', users)

    return users;
  },

  usersByIds: async (_parent, args, ctx) => {
    const users = await userRepo.getManyById(args.ids);

    return users;
  },

  user: async (_parent, args, ctx) => {
    const user = await userRepo.getById(args.id);

    return user;
  },
};
