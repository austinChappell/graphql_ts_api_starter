# GraphQL Typescript Node API Starter

## Setup

### Install Postgres

Instructions can be found here: https://www.postgresql.org/download/macosx/
Postico is also a great GUI to interact with data

### Clone Repo

```
git clone [some_repo]
cd [some_dir]
```

### Install Dependencies

```
yarn
```

### Setup environment variables

See `example.env`, duplicate the file, and save as `.env`. Update variables as needed. Do not change DB_URL or TEST_DB_URL.

### Create, Migrate, and Seed Database

Be sure Postgres is running. 

And then either.

```
yarn db:setup
```

or

```
yarn db:create
yarn db:migrate
yarn db:seed
```

### Start app

```
yarn dev
```

#### Rollback migration

Roll back one migration.

```
yarn db:rollback
```

#### Drop Database

Drop the database/

```
yarn db:drop
```

#### Reset Database

Drop db, create db, run migrations, seed db.

```
yarn db:reset
```

#### View GraphQL Docs
```
yarn docs:server
```

then in a new tab

```
yarn docs
```

#### Test the API

```
yarn test
```
