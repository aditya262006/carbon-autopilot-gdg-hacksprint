import { pgTable, text, timestamp, boolean, serial, numeric, integer } from 'drizzle-orm/pg-core'

// ===== Better Auth Tables =====
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// ===== Application Tables =====
export const carbonEntries = pgTable('carbon_entries', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  category: text('category').notNull(),
  value: numeric('value').notNull(),
  unit: text('unit').notNull().default('kg'),
  source: text('source'),
  notes: text('notes'),
  date: timestamp('date').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const userStats = pgTable('user_stats', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  totalEmissions: numeric('totalEmissions').notNull().default('0'),
  weeklyEmissions: numeric('weeklyEmissions').notNull().default('0'),
  monthlyEmissions: numeric('monthlyEmissions').notNull().default('0'),
  dailyStreak: integer('dailyStreak').notNull().default(0),
  longestStreak: integer('longestStreak').notNull().default(0),
  rank: integer('rank'),
  points: integer('points').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  achievement: text('achievement').notNull(),
  description: text('description'),
  unlockedAt: timestamp('unlockedAt').notNull().defaultNow(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const challenges = pgTable('challenges', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  target: numeric('target').notNull(),
  unit: text('unit').notNull().default('kg'),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  reward: integer('reward').notNull().default(100),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const recommendations = pgTable('recommendations', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  impact: integer('impact').notNull(),
  difficulty: text('difficulty').notNull(),
  category: text('category').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
