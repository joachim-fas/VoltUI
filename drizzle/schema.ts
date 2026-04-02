import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * GitHub Personal Access Tokens für Theme Agent
 * Tokens werden gehasht gespeichert (SHA-256) – nie im Klartext
 */
export const githubTokens = mysqlTable("github_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key zu users.id
  tokenHash: varchar("tokenHash", { length: 64 }).notNull(), // SHA-256 Hash
  maskedToken: varchar("maskedToken", { length: 32 }).notNull(), // z.B. "ghp_****...****1234"
  label: varchar("label", { length: 128 }), // Optional: "Mein GitHub Token"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GithubToken = typeof githubTokens.$inferSelect;
export type InsertGithubToken = typeof githubTokens.$inferInsert;