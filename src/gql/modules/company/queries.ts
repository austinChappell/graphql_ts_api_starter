import CompanyRepo from 'repository/companyRepo';
import { Queries } from 'types/graphqlUtils';
import CompanySkillRepo from 'repository/companySkillRepo';
import CompanyIndustryRepo from 'repository/companyIndustryRepo';

const companyRepo = new CompanyRepo();
const companyIndustryRepo = new CompanyIndustryRepo();
const companySkillRepo = new CompanySkillRepo();

const getCompanyIdsFromIndustryIds = async (industryIds?: string[]): Promise<string[] | null> => {
  if (!industryIds) {
    return null;
  }

  const companyIndustries = await companyIndustryRepo.findWhere({ industryId: industryIds });

  return companyIndustries.data.map(({ companyId }) => companyId);
}

const getCompanyIdsFromSkillIds = async (skillIds?: string[]): Promise<string[] | null> => {
  if (!skillIds) {
    return null;
  }

  const companySkills = await companySkillRepo.findWhere({ skillId: skillIds });

  return companySkills.data.map(({ companyId }) => companyId);
}

export const queries: Partial<Queries> = {
  companies: async (_parent, args) => {
    const companyIdsFromSkills = await getCompanyIdsFromSkillIds(args.where?.skillIds);
    const companyIdsFromIndustries = await getCompanyIdsFromIndustryIds(args.where?.industryIds);

    let companyIds: string[];

    if (companyIdsFromIndustries && companyIdsFromSkills) {
      companyIds = [];

      companyIdsFromIndustries.forEach(id => {
        if (companyIdsFromSkills.includes(id)) {
          companyIds.push(id);
        }
      })
    } else if (!companyIdsFromIndustries) {
      companyIds = [...companyIdsFromSkills];
    } else if (!companyIdsFromSkills) {
      companyIds = [...companyIdsFromIndustries];
    }

    const where: {
      [key: string]: any;
    } = {
      ...companyIds && { id: companyIds },
    };

    const companies = await companyRepo.findWhere(where, args.queryParams);

    return companies;
  },

  company: async (_parent, args) => {
    const company = await companyRepo.getById(args.id);

    if (!company) {
      throw new Error('Company not found.');
    }

    return company;
  },
};
