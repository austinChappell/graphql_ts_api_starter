import { MappedResolvers } from 'types/graphqlUtils';
import { queries } from './queries';
import { mutations } from './mutations';
import CompanyIndustryRepo from 'repository/companyIndustryRepo';
import CompanySkillRepo from 'repository/companySkillRepo';
import { industryLoader } from 'gql/dataloaders/industryLoader';
import { skillLoader } from 'gql/dataloaders/skillLoader';

export const resolvers: MappedResolvers = {
  Query: { ...queries },

  Mutation: { ...mutations },

  Company: {
    industries: async (company: DB.Company) => {
      const companyIndustryRepo = new CompanyIndustryRepo();

      const companyIndustries = await companyIndustryRepo
        .findWhere({ companyId: company.id });

      const industries = industryLoader
        .loadMany(companyIndustries.data
          .map(({ industryId }) => industryId)
        );

      return industries;
    },

    skills: async (company: DB.Company) => {
      const companySkillRepo = new CompanySkillRepo();

      const companySkills = await companySkillRepo
        .findWhere({ companyId: company.id });

      const skills = skillLoader
        .loadMany(companySkills.data
          .map(({ skillId }) => skillId)
        );

      return skills;
    }
  }
};
