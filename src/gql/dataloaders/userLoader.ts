// External Dependencies
import DataLoader from 'dataloader';
import { default as sort } from 'dataloader-sort';

// Internal Dependencies
import UserRepo from 'repository/userRepo';

// Local Variables
const userRepo = new UserRepo();

export const userLoader = new DataLoader(async (keys: string[]) => {
  const users = await userRepo.findManyBy('id', keys);
  return sort(keys, users);
});
