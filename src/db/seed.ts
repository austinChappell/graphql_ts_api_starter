// External Dependencies
import faker from 'faker';

// Internal Dependencies
import { db } from 'config/db.config';
import { seedData } from './seedHelpers';
import CompanyRepo from '../repository/companyRepo';
import UserRepo from '../repository/userRepo';
import { WorkType } from 'constants/index';

// Local Variables
const companyRepo = new CompanyRepo();
const userRepo = new UserRepo();

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
  workTypeId: WorkType.FullTime,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  ...user,
});

const getRandomCompany = (company: Partial<DB.Company>): Partial<DB.Company> => ({
  contactEmail: 'example@company.com',
  jobDescription: 'We need a dev',
  link: 'https://www.google.com',
  name: 'Awesome Company',
  ...company,
});

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
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
  getRandomUser({}),
];

const companies: Partial<DB.Company>[] = [
  getRandomCompany({}),
  getRandomCompany({}),
  getRandomCompany({}),
  getRandomCompany({}),
  getRandomCompany({}),
];

const runSeed = async () => {
  await seedData(userRepo, users);
  await seedData(companyRepo, companies);
};

const populateDB = async () => {
  await runSeed();
  db.destroy();
};

populateDB();
