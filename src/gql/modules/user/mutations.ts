// Internal Dependencies
import UserRepo from '../../../repository/userRepo';

import { Mutations } from 'types/graphqlUtils';

const userRepo = new UserRepo();

export const mutations: Partial<Mutations> = {
  createUser: async (_parent, args, ctx) => {
    try {
      const user = await userRepo.create(args.input);

      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (_parent, args, ctx) => {
    const user = await userRepo.updateById(args.id, args.input);

    return user;
  },
};
