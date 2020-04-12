import { Context, Info } from './context';

export type Resolver<T = any, R = any> = (
  parent: any,
  args: T,
  context: Context,
  info: Info<T>
) => R;

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

  // User
  user: Resolver<any>;
  users: Resolver;
}

export interface Mutations {
  // Auth
  signIn: Resolver<GQL.ISignInOnMutationArguments>;
  signOut: Resolver;
  signUp: Resolver<GQL.ISignUpOnMutationArguments>;
  updateSelf: Resolver<GQL.IUpdateSelfOnMutationArguments>;
}
