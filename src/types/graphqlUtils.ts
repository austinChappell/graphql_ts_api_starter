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
  // User Queries
  user: Resolver;
  users: Resolver;
  usersByIds: Resolver;
}

export interface Mutations {
  // User Mutations
  createUser: Resolver;
  updateUser: Resolver;
}
