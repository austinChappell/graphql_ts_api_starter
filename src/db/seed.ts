// External Dependencies
import faker from 'faker';

// Internal Dependencies
import { db } from 'config/db.config';
import { seedData } from './seedHelpers';
import CompanyRepo from '../repository/companyRepo';
import UserRepo from '../repository/userRepo';
import SkillRepo from 'repository/skillRepo';
import UserSkillRepo from 'repository/userSkillRepo';
import IndustryRepo from 'repository/industryRepo';
import CompanyIndustryRepo from 'repository/companyIndustryRepo';
import CompanySkillRepo from 'repository/companySkillRepo';
import ResumeAttachmentRepo from 'repository/resumeAttachmentRepo';

// Local Variables
const companyRepo = new CompanyRepo();
const companyIndustryRepo = new CompanyIndustryRepo();
const companySkillRepo = new CompanySkillRepo();
const industryRepo = new IndustryRepo();
const resumeAttachmentRepo = new ResumeAttachmentRepo();
const skillRepo = new SkillRepo();
const userSkillsRepo = new UserSkillRepo();
const userRepo = new UserRepo();

const numOfJobs = 200;
const numOfUsers = 200;

const defaultSeedUserIds = [
  'fef348eb-b4c7-421a-8597-475f42e3a625',
  'fc197ebc-3ff1-4abc-99c2-14c936b26448',
  'fb74f0f9-0166-43fc-8875-8bb414eb5508',
  '4eaa15e0-8308-498c-a4d5-a626c069e037',
  '6de87825-b76a-419a-883b-779529261e28',
];

const getRandomUser = (user: Partial<DB.User>): Partial<DB.User> => ({
  dateAvailable: new Date().toISOString(),
  jobTitle: 'Developer',
  keySkills: 'Some skills',
  linkedInUrl: 'https://www.google.com',
  location: 'Dallas, TX',
  password: 'password123',
  phoneNumber: '1234567890',
  workTypeId: Math.ceil(Math.random() * 3),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  ...user,
});

const randomUsers = new Array(numOfUsers).fill(true).map(() => getRandomUser({}));

const getRandomCompany = (company: Partial<DB.Company>): Partial<DB.Company> => ({
  contactEmail: faker.internet.email(),
  jobDescription: 'We need a dev',
  link: 'https://www.google.com',
  name: 'Awesome Company',
  ...company,
});

const companies = new Array(numOfJobs).fill(true).map(() => getRandomCompany({}));

const users: Partial<DB.User>[] = [
  getRandomUser({
    email: 'jimsmith@gmail.com',
    firstName: 'Jim',
    id: defaultSeedUserIds[0],
    lastName: 'Smith',
  }),
  getRandomUser({
    email: 'janesmith@gmail.com',
    firstName: 'Jane',
    id: defaultSeedUserIds[1],
    lastName: 'Smith',
  }),
  getRandomUser({
    email: 'johnsmith@gmail.com',
    firstName: 'John',
    id: defaultSeedUserIds[2],
    lastName: 'Smith',
  }),
  getRandomUser({
    email: 'jillsmith@gmail.com',
    firstName: 'Jill',
    id: defaultSeedUserIds[3],
    lastName: 'Smith',
  }),
  getRandomUser({
    email: 'jacksmith@gmail.com',
    firstName: 'Jack',
    id: defaultSeedUserIds[4],
    lastName: 'Smith',
  }),
  ...randomUsers,
];

const getCompanyIndustries = async (): Promise<Partial<DB.CompanyIndustry>[]> => {
  const dbCompanies = await companyRepo.getAll();
  const industries = await industryRepo.getAll();

  return dbCompanies.map(company => ({
    companyId: company.id,
    industryId: industries[Math.floor(Math.random() * industries.length)].id,
  }));
}

const getCompanySkills = async (): Promise<Partial<DB.UserSkill>[]> => {
  const dbCompanies = await companyRepo.getAll();
  const skills = await skillRepo.getAll();

  return dbCompanies.map(company => ({
    companyId: company.id,
    skillId: skills[Math.floor(Math.random() * skills.length)].id,
  }));
}

const getUserResumes = async (): Promise<Partial<DB.ResumeAttachment>[]> => {
  const dbUsers = await userRepo.getAll();

  return dbUsers.map(user => ({
    label: 'My Resume',
    url: 'https://www.google.com',
    userId: user.id,
  }));
}

const getUserSkills = async (): Promise<Partial<DB.UserSkill>[]> => {
  const dbUsers = await userRepo.getAll();
  const skills = await skillRepo.getAll();

  return dbUsers.map(user => ({
    skillId: skills[Math.floor(Math.random() * skills.length)].id,
    userId: user.id,
  }));
}

const runSeed = async () => {
  await seedData(userRepo, users);
  await seedData(companyRepo, companies);

  const companyIndustries = await getCompanyIndustries();
  const companySkills = await getCompanySkills();
  const userResumes = await getUserResumes();
  const userSkills = await getUserSkills();

  await seedData(companyIndustryRepo, companyIndustries);
  await seedData(companySkillRepo, companySkills);
  await seedData(resumeAttachmentRepo, userResumes);
  await seedData(userSkillsRepo, userSkills);
};

const populateDB = async () => {
  await runSeed();
  db.destroy();
};

populateDB();
