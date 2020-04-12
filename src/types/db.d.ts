declare namespace DB {
  interface BaseTable<ID = string> {
    createdAt: Date;
    id: ID;
    updatedAt: Date;
  }

  interface Post extends BaseTable {
    authorId: string;
    body: string;
    title: string;
  }

  interface User extends BaseTable {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
}
