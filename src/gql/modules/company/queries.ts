import isEqual from 'lodash.isequal';

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

  const sortedIndustryIds = industryIds.sort((a, b) => a > b ? 1 : -1);

  const companyIndustries = await companyIndustryRepo.findWhere({ industryId: industryIds });

  const industryIdsByCompanyId: {
    [key: string]: string[];
  } = {};

  const companyIds: string[] = [];

  companyIndustries.data.forEach(({
    companyId,
    industryId,
  }) => {
    if (industryIdsByCompanyId[companyId]) {
      industryIdsByCompanyId[companyId].push(industryId)
    } else {
      industryIdsByCompanyId[companyId] = [industryId]
    }

    const sortedIds = industryIdsByCompanyId[companyId].sort((a, b) => a > b ? 1 : -1)

    if (isEqual(sortedIds, sortedIndustryIds)) {
      companyIds.push(companyId);
    }
  });

  return companyIds;
}

const getCompanyIdsFromSkillIds = async (skillIds?: string[]): Promise<string[] | null> => {
  if (!skillIds) {
    return null;
  }

  const sortedSkillIds = skillIds.sort((a, b) => a > b ? 1 : -1);

  const companySkills = await companySkillRepo.findWhere({ skillId: skillIds });

  const skillIdsByCompanyId: {
    [key: string]: string[];
  } = {};

  const companyIds: string[] = [];

  companySkills.data.forEach(({
    companyId,
    skillId,
  }) => {
    if (skillIdsByCompanyId[companyId]) {
      skillIdsByCompanyId[companyId].push(skillId)
    } else {
      skillIdsByCompanyId[companyId] = [skillId]
    }

    const sortedIds = skillIdsByCompanyId[companyId].sort((a, b) => a > b ? 1 : -1)

    if (isEqual(sortedIds, sortedSkillIds)) {
      companyIds.push(companyId);
    }
  });

  return companyIds;
}

export const queries: Partial<Queries> = {
  companies: async (_parent, args) => {
    const companyIdsFromSkills = await getCompanyIdsFromSkillIds(args.where?.skillIds);
    const companyIdsFromIndustries = await getCompanyIdsFromIndustryIds(args.where?.industryIds);

    let companyIds: string[] = null;

    if (companyIdsFromIndustries && companyIdsFromSkills) {
      companyIds = [];

      companyIdsFromIndustries.forEach(id => {
        if (companyIdsFromSkills.includes(id)) {
          companyIds.push(id);
        }
      })
    } else if (!companyIdsFromIndustries && companyIdsFromSkills) {
      companyIds = [...companyIdsFromSkills];
    } else if (!companyIdsFromSkills && companyIdsFromIndustries) {
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
