declare namespace DB {
  interface BaseTable<ID = string> {
    createdAt: Date;
    id: ID;
    updatedAt: Date;
  }

  interface User extends BaseTable {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
}
