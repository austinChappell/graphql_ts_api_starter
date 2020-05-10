// External Dependencies
import DataLoader from 'dataloader';
import { default as sort } from 'dataloader-sort';

// Internal Dependencies
import WorkTypeRepo from 'repository/workTypeRepo';

// Local Variables
const workTypeRepo = new WorkTypeRepo();

export const workTypeLoader = new DataLoader(async (keys: number[]) => {
  const workTypes = await workTypeRepo.findManyBy('id', keys);
  return sort(keys, workTypes);
});
