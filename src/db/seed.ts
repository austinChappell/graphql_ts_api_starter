// Internal Dependencies
import { db } from 'config/db.config';
import { seedData } from './seedHelpers';
import UserRepo from '../repository/userRepo';

// Local Variables
const userRepo = new UserRepo();

const defaultSeedUserIds = [
  'fef348eb-b4c7-421a-8597-475f42e3a625',
  'fc197ebc-3ff1-4abc-99c2-14c936b26448',
  'fb74f0f9-0166-43fc-8875-8bb414eb5508',
  '4eaa15e0-8308-498c-a4d5-a626c069e037',
  '6de87825-b76a-419a-883b-779529261e28',
];

const users: Partial<DB.User>[] = [
  {
    email: 'jimsmith@gmail.com',
    firstName: 'Jim',
    id: defaultSeedUserIds[0],
    lastName: 'Smith',
    password: 'password123',
  },
  {
    email: 'janesmith@gmail.com',
    firstName: 'Jane',
    id: defaultSeedUserIds[1],
    lastName: 'Smith',
    password: 'password123',
  },
  {
    email: 'johnsmith@gmail.com',
    firstName: 'John',
    id: defaultSeedUserIds[2],
    lastName: 'Smith',
    password: 'password123',
  },
  {
    email: 'jillsmith@gmail.com',
    firstName: 'Jill',
    id: defaultSeedUserIds[3],
    lastName: 'Smith',
    password: 'password123',
  },
  {
    email: 'jacksmith@gmail.com',
    firstName: 'Jack',
    id: defaultSeedUserIds[4],
    lastName: 'Smith',
    password: 'password123',
  },
];

const runSeed = async () => {
  await seedData(userRepo, users);
};

const populateDB = async () => {
  await runSeed();
  db.destroy();
};

populateDB();
