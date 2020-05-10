declare namespace DB {
  interface BaseTable<ID = string> {
    createdAt: Date;
    id: ID;
    updatedAt: Date;
  }

  interface Company extends BaseTable {
    contactEmail: string;
    jobDescription: string;
    link: string;
    name: string;
  }

  interface CompanyIndustry extends BaseTable {
    companyId: string;
    industryId: string;
  }

  interface CompanySkill extends BaseTable {
    companyId: string;
    skillId: string;
  }

  interface Industry extends BaseTable {
    label: string;
  }

  interface ResumeAttachment extends BaseTable {
    label: string;
    url: string;
    userId: string;
  }

  interface Skill extends BaseTable {
    label: string;
  }

  interface UserSkill extends BaseTable {
    skillId: string;
    userId: string;
  }

  interface User extends BaseTable {
    dateAvailable: string;
    email: string;
    firstName: string;
    jobTitle: string;
    keySkills: string;
    lastName: string;
    linkedInUrl: string;
    location: string;
    password: string;
    phoneNumber: string;
    workTypeId: number;
  }

  interface WorkType extends BaseTable<number> {
    label: string;
  }
}
