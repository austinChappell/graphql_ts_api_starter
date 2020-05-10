import { Queries } from 'types/graphqlUtils';
import IndustryRepo from 'repository/industryRepo';

const industryRepo = new IndustryRepo();

export const queries: Partial<Queries> = {
  industries: (_parent, args) => {
    return industryRepo.getAll();
  },
};
