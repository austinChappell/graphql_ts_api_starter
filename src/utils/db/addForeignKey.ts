type ForeignKeyAction = 'CASCADE' | 'RESTRICT';

interface ForeignKeyOptions {
  columnName: string;
  deleteAction?: ForeignKeyAction;
  isInt?: boolean;
  isNullable?: boolean;
  referenceColumn?: string;
  tableName: string;
  updateAction?: ForeignKeyAction;
}

export function addForeignKey(
  t,
  {
    columnName,
    deleteAction = 'RESTRICT',
    isInt = false,
    isNullable = false,
    referenceColumn = 'id',
    tableName,
    updateAction = 'CASCADE',
  }: ForeignKeyOptions
) {
  if (isNullable) {
    if (isInt) {
      t.integer(columnName);
    } else {
      t.uuid(columnName);
    }
  } else {
    if (isInt) {
      t.integer(columnName).notNullable();
    } else {
      t.uuid(columnName).notNullable();
    }
  }
  t.foreign(columnName)
    .references(referenceColumn)
    .inTable(tableName)
    .onUpdate(updateAction)
    .onDelete(deleteAction);
}
