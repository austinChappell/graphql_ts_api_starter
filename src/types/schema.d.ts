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
company: ICompany;
companies: ICompanyAll;
industries: Array<IIndustry>;
skills: Array<ISkill>;
user: IUser;
users: IUserAll;
workTypes: Array<IWorkType>;
}

interface ICompanyOnQueryArguments {
id: string;
}

interface ICompaniesOnQueryArguments {
queryParams?: IQueryParams | null;
where?: ICompanyWhere | null;
}

interface IUserOnQueryArguments {
id: string;
}

interface IUsersOnQueryArguments {
queryParams?: IQueryParams | null;
where?: IUserWhere | null;
}

interface IUser {
__typename: "User";
dateAvailable: string;
email: string;
firstName: string;
id: string;
jobTitle: string;
keySkills: string;
lastName: string;
linkedInUrl: string;
location: string;
phoneNumber: string;
resumeAttachments: Array<IResumeAttachment>;
skills: Array<ISkill>;
workType: IWorkType;
}

interface IResumeAttachment {
__typename: "ResumeAttachment";
id: string;
label: string;
url: string;
}

interface ISkill {
__typename: "Skill";
id: string;
label: string;
}

interface IWorkType {
__typename: "WorkType";
id: string;
label: string;
}

interface ICompany {
__typename: "Company";
contactEmail: string;
id: string;
industries: Array<IIndustry>;
jobDescription: string;
link: string;
name: string;
skills: Array<ISkill>;
}

interface IIndustry {
__typename: "Industry";
id: string;
label: string;
}

interface IQueryParams {
orderBy?: string | null;
page: number;
pageSize: number;
q?: string | null;
sort?: string | null;
}

interface ICompanyWhere {
industryIds?: Array<string> | null;
skillIds?: Array<string> | null;
}

interface ICompanyAll {
__typename: "CompanyAll";
data: Array<ICompany> | null;
fullCount: number;
}

interface IUserWhere {
skillIds?: Array<string> | null;
workTypeId?: string | null;
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
createCompany: ICompany;
deleteCompany: boolean;
updateCompany: ICompany;
createUser: IUser;
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

interface ICreateCompanyOnMutationArguments {
input: ICreateCompanyInput;
}

interface IDeleteCompanyOnMutationArguments {
id: string;
}

interface IUpdateCompanyOnMutationArguments {
id: string;
input: IUpdateCompanyInput;
}

interface ICreateUserOnMutationArguments {
input?: ICreateUserInput | null;
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

interface ICreateCompanyInput {
contactEmail: string;
jobDescription: string;
industryIds: Array<string>;
link: string;
name: string;
skillIds: Array<string>;
}

interface IUpdateCompanyInput {
contactEmail?: string | null;
jobDescription?: string | null;
industryIds?: Array<string> | null;
link?: string | null;
name?: string | null;
skillIds?: Array<string> | null;
}

interface ICreateUserInput {
dateAvailable: string;
email: string;
firstName: string;
jobTitle: string;
keySkills: string;
lastName: string;
linkedInUrl: string;
location: string;
phoneNumber: string;
resumeAttachments: Array<IResumeAttachmentInput>;
skillIds: Array<string>;
workTypeId: string;
}

interface IResumeAttachmentInput {
label: string;
url: string;
}
}

// tslint:enable
