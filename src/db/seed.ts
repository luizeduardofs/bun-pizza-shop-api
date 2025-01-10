/* eslint-disable drizzle/enforce-delete-with-where */

import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { db } from './connection'
import { restaurants, users } from './schema'

/**
 * Reset data base
 */
await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('🫢 Database reset!'))

/**
 * Create customers
 */
await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalk.green('😊 Created customers!'))

/**
 * Create manager
 */
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({ id: users.id })

console.log(chalk.green('😊 Created manager!'))

/**
 * Create restaurante
 */
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  },
])

console.log(chalk.green('🤩 Database seeded successfully!'))

process.exit()
