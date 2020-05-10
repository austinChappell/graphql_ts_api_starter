import CompanyRepo from 'repository/companyRepo';
import { Queries } from 'types/graphqlUtils';

const companyRepo = new CompanyRepo();

export const queries: Partial<Queries> = {
  companies: async (_parent, args) => {
    const companies = await companyRepo.findWhere({}, args.queryParams);

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
