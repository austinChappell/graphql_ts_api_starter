import isEqual from 'lodash.isequal';

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

  const sortedSkillIds = skillIds.sort((a, b) => a > b ? 1 : -1);

  const userSkills = await userSkillRepo.findWhere({ skillId: skillIds });

  const skillIdsByUserId: {
    [key: string]: string[];
  } = {};

  const userIds: string[] = [];

  userSkills.data.forEach(({
    skillId,
    userId,
  }) => {
    if (skillIdsByUserId[userId]) {
      skillIdsByUserId[userId].push(skillId)
    } else {
      skillIdsByUserId[userId] = [skillId]
    }

    const sortedIds = skillIdsByUserId[userId].sort((a, b) => a > b ? 1 : -1)

    if (isEqual(sortedIds, sortedSkillIds)) {
      userIds.push(userId);
    }
  });

  return userIds;
}

export const queries: Partial<Queries> = {
  users: async (_parent, args) => {
    const userIds = await getUserIdsFromSkillIds(args.where?.skillIds);

    const where: {
      [key: string]: any;
    } = {
      ...args.where?.workTypeId && { workTypeId: args.where.workTypeId },
      ...userIds && { id: userIds },
    };

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
