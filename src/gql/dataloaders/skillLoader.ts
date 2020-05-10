// External Dependencies
import DataLoader from 'dataloader';
import { default as sort } from 'dataloader-sort';

// Internal Dependencies
import SkillRepo from 'repository/skillRepo';

// Local Variables
const skillRepo = new SkillRepo();

export const skillLoader = new DataLoader(async (keys: string[]) => {
  const skills = await skillRepo.findManyBy('id', keys);
  return sort(keys, skills);
});
