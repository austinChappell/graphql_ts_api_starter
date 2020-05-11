import { Context, Info } from './context';

export type Resolver<T = any> = (
  parent: any,
  args: T,
  context: Context,
  info: Info<T>
) => any;

export interface ResolverMap {
  [key: string]: Resolver;
}

export interface MappedResolvers {
  [key: string]: ResolverMap;
  Query?: ResolverMap;
  Mutation?: ResolverMap;
}

export interface Queries {
  // Auth
  self: Resolver;

  // Company
  company: Resolver;
  companies: Resolver<GQL.ICompaniesOnQueryArguments>;

  // Industry
  industries: Resolver;

  // Skill
  skills: Resolver;

  // User
  user: Resolver;
  users: Resolver<GQL.IUsersOnQueryArguments>;

  // WorkType
  workTypes: Resolver;
}

export interface Mutations {
  // Auth
  signIn: Resolver<GQL.ISignInOnMutationArguments>;
  signOut: Resolver;
  signUp: Resolver<GQL.ISignUpOnMutationArguments>;
  updateSelf: Resolver<GQL.IUpdateSelfOnMutationArguments>;

  // Company
  createCompany: Resolver<GQL.ICreateCompanyOnMutationArguments>;
  deleteCompany: Resolver<GQL.IDeleteCompanyOnMutationArguments>;
  updateCompany: Resolver<GQL.IUpdateCompanyOnMutationArguments>;

  // User
  createUser: Resolver<GQL.ICreateUserOnMutationArguments>;
}
