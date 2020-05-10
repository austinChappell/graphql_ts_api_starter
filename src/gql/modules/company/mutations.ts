// Internal Dependencies
import CompanyRepo from 'repository/companyRepo';

import { Mutations } from 'types/graphqlUtils';
import { Context } from 'types/context';

const companyRepo = new CompanyRepo();

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
  createCompany: (_parent, args, ctx) => companyRepo
    .create({
      ...args.input,
    }),

  deleteCompany: async (_parent, args, ctx) => {
    await verifyOwnership(args, ctx);

    return companyRepo.deleteById(args.id);
  },

  updateCompany: async (_parent, args, ctx) => {
    await verifyOwnership(args, ctx);

    return companyRepo.updateById(args.id, args.input);
  }
};
