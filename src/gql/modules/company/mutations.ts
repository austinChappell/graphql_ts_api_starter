// Internal Dependencies
import CompanyRepo from 'repository/companyRepo';

import { Mutations } from 'types/graphqlUtils';
import { Context } from 'types/context';
import CompanyIndustryRepo from 'repository/companyIndustryRepo';
import CompanySkillRepo from 'repository/companySkillRepo';

const companyRepo = new CompanyRepo();
const companyIndustryRepo = new CompanyIndustryRepo();
const companySkillRepo = new CompanySkillRepo();

async function verifyOwnership(
  args: GQL.IDeleteCompanyOnMutationArguments | GQL.IUpdateCompanyOnMutationArguments,
  ctx: Context
) {
  const post = await companyRepo.findOne({
    id: args.id,
  });

  if (!post) {
    throw new Error('Post not found.');
  }
}

export const mutations: Partial<Mutations> = {
  createCompany: async (_parent, args, ctx) => {
    const company = await companyRepo
      .create({
        contactEmail: args.input.contactEmail,
        jobDescription: args.input.jobDescription,
        link: args.input.link,
        name: args.input.name,
      });

    await companyIndustryRepo.createMany(args.input.industryIds.map(industryId => ({
      companyId: company.id,
      industryId,
    })));

    await companySkillRepo.createMany(args.input.skillIds.map(skillId => ({
      companyId: company.id,
      skillId,
    })));

    return company;
  },

  deleteCompany: async (_parent, args, ctx) => {
    await verifyOwnership(args, ctx);

    return companyRepo.deleteById(args.id);
  },

  updateCompany: async (_parent, args, ctx) => {
    await verifyOwnership(args, ctx);

    return companyRepo.updateById(args.id, args.input);
  }
};
