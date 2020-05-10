import { MappedResolvers } from 'types/graphqlUtils';
import { queries } from './queries';
import { workTypeLoader } from 'gql/dataloaders/workTypeLoader';
import ResumeAttachmentRepo from 'repository/resumeAttachmentRepo';
import UserSkillRepo from 'repository/userSkillRepo';
import { skillLoader } from 'gql/dataloaders/skillLoader';

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  User: {
    email: (user: DB.User) => user.email,
    id: (user: DB.User) => user.id,
    firstName: (user: DB.User) => user.firstName,
    lastName: (user: DB.User) => user.lastName,
    resumeAttachments: async (user: DB.User) => {
      const resumeAttachmentRepo = new ResumeAttachmentRepo();

      const resumeData = await resumeAttachmentRepo.findWhere({
        userId: user.id,
      });

      return resumeData.data;
    },
    skills: async (user: DB.User) => {
      const userSkillRepo = new UserSkillRepo();

      const userSkills = await userSkillRepo
        .findWhere({ userId: user.id });

      const skills = skillLoader
        .loadMany(userSkills.data
          .map(({ skillId }) => skillId)
        );

      return skills;
    },
    workType: (user: DB.User) => workTypeLoader.load(user.workTypeId),
  },
};
