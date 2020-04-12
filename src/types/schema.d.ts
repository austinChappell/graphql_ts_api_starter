// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
self: IUser;
post: IPost;
posts: IPostAll;
user: IUser;
users: IUserAll;
}

interface IPostOnQueryArguments {
id: string;
}

interface IPostsOnQueryArguments {
queryParams?: IQueryParams | null;
}

interface IUserOnQueryArguments {
id: string;
}

interface IUsersOnQueryArguments {
queryParams?: IQueryParams | null;
}

interface IUser {
__typename: "User";
email: string;
firstName: string;
id: string;
lastName: string;
posts: Array<IPost>;
}

interface IPost {
__typename: "Post";
author: IUser;
body: string;
id: string;
title: string;
}

interface IQueryParams {
limit?: number | null;
orderBy?: string | null;
page?: number | null;
q?: string | null;
sort?: string | null;
}

interface IPostAll {
__typename: "PostAll";
data: Array<IPost> | null;
fullCount: number;
}

interface IUserAll {
__typename: "UserAll";
data: Array<IUser> | null;
fullCount: number;
}

interface IMutation {
__typename: "Mutation";
signIn: IUser;
signOut: boolean;
signUp: IUser;
updateSelf: IUser;
createPost: IPost;
deletePost: boolean;
updatePost: IPost;
}

interface ISignInOnMutationArguments {
input?: ISignInArgs | null;
}

interface ISignUpOnMutationArguments {
input: ISignUpArgs;
}

interface IUpdateSelfOnMutationArguments {
input: IUpdateSelfArgs;
}

interface ICreatePostOnMutationArguments {
input: ICreatePostInput;
}

interface IDeletePostOnMutationArguments {
id: string;
}

interface IUpdatePostOnMutationArguments {
id: string;
input: IUpdatePostInput;
}

interface ISignInArgs {
email: string;
password: string;
}

interface ISignUpArgs {
firstName: string;
lastName: string;
email: string;
password: string;
}

interface IUpdateSelfArgs {
firstName?: string | null;
lastName?: string | null;
email?: string | null;
password?: string | null;
}

interface ICreatePostInput {
body: string;
title: string;
}

interface IUpdatePostInput {
body?: string | null;
title?: string | null;
}
}

// tslint:enable
