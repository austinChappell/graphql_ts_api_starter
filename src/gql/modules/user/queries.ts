import UserRepo from '../../../repository/userRepo';
import { Queries } from 'types/graphqlUtils';
import { db } from 'config/db.config';
import { TABLES } from 'constants/index';
import UserSkillRepo from 'repository/userSkillRepo';

const userRepo = new UserRepo();
const userSkillRepo = new UserSkillRepo();

const getUserIdsFromSkillIds = async (skillIds?: string[]): Promise<string[] | null> => {
  if (!skillIds) {
    return null;
  }

  const userSkills = await userSkillRepo.findWhere({ skillId: skillIds });

  return userSkills.data.map(({ userId }) => userId);
}

export const queries: Partial<Queries> = {
  users: async (_parent, args) => {
    const page = args.queryParams?.page || 1;
    const pageSizeParam = args.queryParams?.pageSize || 12;
    const pageSize = pageSizeParam > 100 ? 100 : pageSizeParam;

    const userIds = await getUserIdsFromSkillIds(args.where?.skillIds);

    const where: {
      [key: string]: any;
    } = {
      ...args.where?.workTypeId && { workTypeId: args.where.workTypeId },
      ...userIds && { id: userIds },
    };

    console.log({ userIds });

    const users = await userRepo.findWhere(where, args.queryParams);

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
