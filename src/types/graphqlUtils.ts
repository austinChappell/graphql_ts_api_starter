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

  // Post
  post: Resolver;
  posts: Resolver;

  // User
  user: Resolver;
  users: Resolver;
}

export interface Mutations {
  // Auth
  signIn: Resolver<GQL.ISignInOnMutationArguments>;
  signOut: Resolver;
  signUp: Resolver<GQL.ISignUpOnMutationArguments>;
  updateSelf: Resolver<GQL.IUpdateSelfOnMutationArguments>;

  // Post
  createPost: Resolver<GQL.ICreatePostOnMutationArguments>;
  deletePost: Resolver<GQL.IDeletePostOnMutationArguments>;
  updatePost: Resolver<GQL.IUpdatePostOnMutationArguments>;
}
