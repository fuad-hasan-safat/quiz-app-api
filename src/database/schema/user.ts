import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial } from 'drizzle-orm/mysql-core';
// declaring enum in database
export const users = mysqlTable('users', {
  id: serial("id").primaryKey(),
  name: varchar('name', { length: 256 }),
}, (users) => ({
  nameIndex: uniqueIndex('name_idx').on(users.name),
}));