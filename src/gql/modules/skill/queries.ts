import { Queries } from 'types/graphqlUtils';
import SkillRepo from 'repository/skillRepo';

const skillRepo = new SkillRepo();

export const queries: Partial<Queries> = {
  skills: (_parent, args) => {
    return skillRepo.getAll();
  },
};
