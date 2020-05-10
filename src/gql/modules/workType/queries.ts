import { Queries } from 'types/graphqlUtils';
import WorkTypeRepo from 'repository/workTypeRepo';

const workTypeRepo = new WorkTypeRepo();

export const queries: Partial<Queries> = {
  workTypes: (_parent, args) => {
    return workTypeRepo.getAll();
  },
};
