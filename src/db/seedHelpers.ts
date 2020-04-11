import {
  cyan,
  yellow,
} from 'colors/safe';

export const seedData = async (model, data) => {
  // eslint-disable-next-line no-restricted-syntax
  console.log(`${cyan(`Seeding ${model.tableName}`)}`);
  // using a for loop to allow for async
  for (let i = 0; i < data.length; i += 1) {
    if (i % 25 === 0 && i !== 0) {
      // eslint-disable-next-line no-restricted-syntax
      console.log(`${yellow(`${i}`)} of ${yellow(`${data.length}`)} ${model.tableName}`);
    }
    // eslint-disable-next-line no-await-in-loop
    await model.create(data[i], defaultSeedUserIds[1]);
  }
};

// using a for loop to allow for async
export const updateData = async (model, data) => {
  // eslint-disable-next-line no-restricted-syntax
  console.log(`${cyan(`Updating ${model.tableName}`)}`);
  for (let i = 0; i < data.length; i += 1) {
    const { id } = data[i];
    await model.updateById(id, data[i]); // eslint-disable-line no-await-in-loop
  }
};

// using a for loop to allow for async
export const updateOrCreateData = async (model, data) => {
  // eslint-disable-next-line no-restricted-syntax
  console.log(`Updating or creating ${model.tableName}`);
  for (let i = 0; i < data.length; i += 1) {
    const { new: newItem, old: oldItem } = data[i];
    await model.updateOrCreate(newItem, oldItem); // eslint-disable-line no-await-in-loop
  }
};

// using a for loop to allow for async
export const reduceToOne = async (model, data) => {
  // eslint-disable-next-line no-restricted-syntax
  console.log(`Updating or creating ${model.tableName}`);
  for (let i = 0; i < data.length; i += 1) {
    const { new: newItem, old: oldItem } = data[i];
    await model.updateAndReduceToOne(newItem, oldItem); // eslint-disable-line no-await-in-loop
  }
};

export const defaultSeedUserIds = [
  'fef348eb-b4c7-421a-8597-475f42e3a625',
  'fc197ebc-3ff1-4abc-99c2-14c936b26448',
  'fb74f0f9-0166-43fc-8875-8bb414eb5508',
  '4eaa15e0-8308-498c-a4d5-a626c069e037',
  '6de87825-b76a-419a-883b-779529261e28',
];

export const defaultSeedUserEmails = [
  'jimsmith@gmail.com',
  'janesmith@gmail.com',
  'johnsmith@gmail.com',
  'joesmith@gmail.com',
  'mikesmith@gmail.com',
];

export const seedOrgIds = [
  'cb41f857-fe6a-4809-ac0a-a626c069e037',
  'c80241ef-e44f-446a-9625-1161b2f282f7',
  '93d51f85-5a14-47b1-80ac-754324969e15',
  '4eaa15e0-8acd-4c2f-a25c-b9cf23583b13',
  '1fb283e6-3e39-498c-8d23-7f9193bb6dfb',
  'b318f573-fb42-41ee-b54a-9fcc1b7fd178',
  '83dc7910-6132-4aa7-a8fb-7dcbf93942b4',
  '1a2312fb-a697-482b-897c-68e61e111779',
  '712127af-04b3-4abe-bd9a-b9c36d1fc835',
  'eda2eec5-e0c4-420b-b6e4-5fb91d6d2973',
  'ae4451d8-549f-49fe-9975-046d803a22db',
  '6309b94a-3ad4-418b-9199-ce1c3894704c',
  '4ff466a5-9c2b-481e-9357-ea5166db80f7',
  '6d3f8488-217c-49a6-815e-5b261b879ea2',
  '4794959a-10cf-4fbf-adad-2348b2040a69',
  '87d6fa42-5be9-4d81-b3c5-31225eea3a90',
  '92bb0702-f0ef-452d-ab15-0df0802c7382',
  '0d7b1815-aade-4251-854c-b6feb842bd30',
  '917fd389-4fce-490b-8440-076800eeb37f',
  '4246d489-8da0-4060-a44d-73951853f02c',
  '295b202f-ed25-49ac-b76c-db0d5f818005',
  '9c7d80b0-8771-41de-b684-e345539a6636',
  '2636dc57-0329-46bf-9aad-23d633df805a',
  '8c64a703-6268-4afa-856a-cb2e65ae5bb9',
  '745f5095-2928-4375-8c63-76ec60a25e46',
];

export const seedSuperOrgIds = [
  '5713eaaa-eecf-48b7-a90e-34c066cf0dd1',
  '77ff20c5-f695-42d2-a4d5-fd223d1787ee',
  '79443f19-0bed-4da2-bcf9-e3b427fdb32e',
];

export const seedMusicInventoryCategoryIds = [
  '8ec8bd07-ca17-43aa-8bd5-c932463b40db',
  '6e603bbb-8308-4913-84d2-2baa99e56e12',
];

export const defaultSeedGroupIds = [
  '40307454-f294-4f1c-9671-d25647becfa3',
  '75f5d475-cc4d-4ca0-9ebe-4b5ba7e37994',
  'f40ec7ee-fccd-4858-b3b4-1354b31ceee4',
];
