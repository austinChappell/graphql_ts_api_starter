// Internal Dependencies
import { Mutations } from 'types/graphqlUtils';
import UserRepo from 'repository/userRepo';
import UserSkillRepo from 'repository/userSkillRepo';

// Local Variables
const userRepo = new UserRepo();
const userSkillRepo = new UserSkillRepo();

export const mutations: Partial<Mutations> = {
  createUser: async (_parent, args, ctx) => {
    const user = await userRepo.create({
      dateAvailable: args.input.dateAvailable,
      email: args.input.email.trim().toLowerCase(),
      firstName: args.input.firstName,
      jobTitle: args.input.jobTitle,
      keySkills: args.input.keySkills,
      lastName: args.input.lastName,
      linkedInUrl: args.input.linkedInUrl,
      location: args.input.location,
      password: 'password',
      phoneNumber: args.input.phoneNumber,
      workTypeId: Number(args.input.workTypeId),
    });

    await userSkillRepo.createMany(args.input.skillIds.map(skillId => ({
      skillId,
      userId: user.id,
    })));

    return user;
  },
};
