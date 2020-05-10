// External Dependencies
import DataLoader from 'dataloader';
import { default as sort } from 'dataloader-sort';

// Internal Dependencies
import IndustryRepo from 'repository/industryRepo';

// Local Variables
const industryRepo = new IndustryRepo();

export const industryLoader = new DataLoader(async (keys: string[]) => {
  const industries = await industryRepo.findManyBy('id', keys);
  return sort(keys, industries);
});
