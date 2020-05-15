// External Dependencies
import fetch from 'node-fetch';
import { green } from 'colors/safe';

// Internal Dependencies
import AirtableIdRepo from 'repository/airtableIdRepo';
import CompanyIndustryRepo from 'repository/companyIndustryRepo';
import CompanySkillRepo from 'repository/companySkillRepo';
import CompanyRepo from 'repository/companyRepo';
import IndustryRepo from 'repository/industryRepo';
import ResumeAttachmentRepo from 'repository/resumeAttachmentRepo';
import SkillRepo from 'repository/skillRepo';
import UserRepo from 'repository/userRepo';
import UserSkillRepo from 'repository/userSkillRepo';
import WorkTypeRepo from 'repository/workTypeRepo';

// Local Typings
interface JobSeekersResponse {
  offset?: string;
  records: JobSeekerRecord[];
}

interface JobSeekerRecord {
  id: string;
  fields: JobSeekerFields;
  createdTime: Date;
}

interface JobSeekerFields {
  "First Name": string;
  "Last Name": string;
  "Job Title": string;
  "Skills Category": string[];
  "Key Skills"?: string;
  Location?: string;
  "LinkedIn / Porfolio URL"?: string;
  "Date Available"?: Date;
  "Type of Work (Contract or Full-Time)": string[];
  "Phone Number"?: string;
  Email: string;
  "Resume Attachment"?: ResumeAttachment[];
  "Today's Date"?: Date;
}

interface ResumeAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails?: Thumbnails;
}

interface Thumbnails {
  small: Full;
  large: Full;
  full?: Full;
}

interface Full {
  url: string;
  width: number;
  height: number;
}

interface CompaniesResponse {
  offset?: string;
  records: CompanyRecord[];
}

interface CompanyRecord {
  id: string;
  fields: CompanyFields;
  createdTime: Date;
}

interface CompanyFields {
  Company?: string;
  "Job Title / Position"?: string;
  "Job Link URL"?: string;
  Industry?: string[];
  "Skills Required"?: string[];
  Contact?: string;
}

// Local Variables
const url = 'https://api.airtable.com/v0/appRMwOvNA88OYcdi';

const { AIRTABLE_API_KEY } = process.env;

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
};

export async function airTableRequest<T>({
  body = {},
  endpoint,
  method = 'GET',
}: {
  body?: { [key: string]: any };
  readonly endpoint: string;
  method?: 'GET' | 'POST';
}): Promise<T> {
  try {
    const response = await fetch(
      `${url}${endpoint}`,
      {
        body: method !== 'GET'
          ? JSON.stringify(body)
          : undefined,
        headers,
        method,
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

async function seedUsers() {
  const airtableIdRepo = new AirtableIdRepo();
  const resumeAttachmentRepo = new ResumeAttachmentRepo();
  const skillRepo = new SkillRepo();
  const userRepo = new UserRepo();
  const userSkillRepo = new UserSkillRepo();
  const workTypeRepo = new WorkTypeRepo();

  const dbSkills = await skillRepo.getAll();
  const dbWorkTypes = await workTypeRepo.getAll();

  function getWorkTypeIdFromFields(fields: JobSeekerFields) {
    const userWorkTypes = fields["Type of Work (Contract or Full-Time)"];
    const workType = userWorkTypes[0].split('-').join(' ');
    const matchingWorkType = dbWorkTypes.find(type => workType === type.label);

    return matchingWorkType.id;
  }

  async function createUserFromAirtableUser(record: JobSeekerRecord) {
    const { fields } = record;

    const userPayload = {
      dateAvailable: fields["Date Available"]
        ? new Date(fields["Date Available"]).toISOString()
        : null,
      email: fields.Email.trim().toLowerCase(),
      firstName: fields["First Name"],
      jobTitle: fields["Job Title"],
      keySkills: fields["Key Skills"],
      lastName: fields["Last Name"],
      linkedInUrl: fields["LinkedIn / Porfolio URL"],
      location: fields.Location,
      password: 'covid_sucks',
      phoneNumber: fields["Phone Number"],
      workTypeId: getWorkTypeIdFromFields(fields),
    };

    const existingUser = await userRepo.findOne({ email: userPayload.email });

    const user = existingUser
      ? await userRepo.updateById(existingUser.id, userPayload)
      : await userRepo.create(userPayload);

    await airtableIdRepo.create({ airtableId: record.id });

    const userSkills = fields["Skills Category"] ?? [];

    for (const skill of userSkills) {
      const s = dbSkills.find(({ label }) => skill === label);
      if (s) {
        const payload = {
          skillId: s.id,
          userId: user.id,
        }

        const existingSkill = await userSkillRepo.findOne(payload);

        if (!existingSkill) {
          await userSkillRepo.create(payload);
        }
      }
    }

    const userResumeAttachments = fields["Resume Attachment"] || [];

    for (const attachment of userResumeAttachments) {
      const payload = {
        label: attachment.filename,
        url: attachment.url,
        userId: user.id,
      };

      const existingAttachment = await resumeAttachmentRepo.findOne({
        label: payload.label,
        userId: user.id,
      });

      if (!existingAttachment) {
        await resumeAttachmentRepo.create({
          label: attachment.filename,
          url: attachment.url,
          userId: user.id,
        });
      }
    }
  }

  let offset;

  async function seedUserBatch(offsetId?: string) {
    do {
      const queryParams: { [key: string]: any; } = { pageSize: 12 };

      if (offsetId) {
        queryParams.offset = offsetId;
      }

      try {
        const qs = Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&');

        const data = await airTableRequest<JobSeekersResponse>({
          endpoint: `/Job%20Seekers?${qs}`,
        });

        const { records } = data;

        for (const airtableUser of records) {
          const existingRecord = await airtableIdRepo.findOne({
            airtableId: airtableUser.id,
          });

          if (!existingRecord) {
            console.log('inserting user into db...');
            await createUserFromAirtableUser(airtableUser);
          }
        }

        offset = data.offset;

        if (offset) {
          console.log('getting more users...');
          await seedUserBatch(offset);
        } else {
          console.log('finished seeding users');
        }
      } catch (error) {
        throw error;
      }
    } while (!!offset)
  }

  await seedUserBatch()
}

async function seedCompanies() {
  const airtableIdRepo = new AirtableIdRepo();
  const companyIndustryRepo = new CompanyIndustryRepo();
  const companySkillRepo = new CompanySkillRepo();
  const companyRepo = new CompanyRepo();
  const industryRepo = new IndustryRepo();
  const skillRepo = new SkillRepo();

  const dbIndustries = await industryRepo.getAll();
  const dbSkills = await skillRepo.getAll();

  async function createCompanyFromAirtableCompany(record: CompanyRecord) {
    const company = await companyRepo.create({
      contactEmail: record.fields.Contact || 'N/A',
      name: record.fields.Company || 'N/A',
      link: record.fields["Job Link URL"] || 'N/A',
      jobDescription: record.fields["Job Title / Position"] || 'N/A',
    });

    await airtableIdRepo.create({ airtableId: record.id });

    const companyIndustries = record.fields.Industry ?? [];
    const companySkills = record.fields["Skills Required"] ?? [];

    for (const industry of companyIndustries) {
      const i = dbIndustries.find(({ label }) => industry === label);
      if (i) {
        await companyIndustryRepo.create({
          companyId: company.id,
          industryId: i.id,
        });
      }
    }

    for (const skill of companySkills) {
      const s = dbSkills.find(({ label }) => skill === label);
      if (s) {
        await companySkillRepo.create({
          companyId: company.id,
          skillId: s.id,
        });
      }
    }
  }

  let offset;

  async function seedCompanyBatch(offsetId?: string) {
    do {
      const queryParams: { [key: string]: any; } = { pageSize: 12 };

      if (offsetId) {
        queryParams.offset = offsetId;
      }

      try {
        const qs = Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&');

        const data = await airTableRequest<CompaniesResponse>({
          endpoint: `/Companies%20Hiring?${qs}`,
        });

        const { records } = data;

        for (const airtableCompany of records) {
          const existingRecord = await airtableIdRepo.findOne({
            airtableId: airtableCompany.id,
          });

          if (!existingRecord) {
            console.log('inserting company into db...');
            await createCompanyFromAirtableCompany(airtableCompany);
          }
        }

        offset = data.offset;

        if (offset) {
          console.log('getting more companies...')
          await seedCompanyBatch(offset);
        } else {
          console.log('finished seeding companies');
        }
      } catch (error) {
        throw error;
      }
    } while (!!offset)
  }

  await seedCompanyBatch();
}

export async function dumpAirtableData() {
  console.log(green('start seed users'));
  await seedUsers();
  console.log(green('end seed users'));
  console.log(green('start seed companies'));
  await seedCompanies();
  console.log(green('end seed companies'));
}
