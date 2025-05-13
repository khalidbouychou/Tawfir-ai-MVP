import { pgTable, text, serial, integer, boolean, date, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// User profile table for storing questionnaire results
export const userProfiles = pgTable("user_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  riskProfile: text("risk_profile").notNull(),
  investmentHorizon: text("investment_horizon").notNull(),
  mainObjective: text("main_objective").notNull(),
  esgSensitivity: text("esg_sensitivity").notNull(),
  compatibilityScore: integer("compatibility_score").notNull(),
  answers: json("answers").notNull()
});

export const insertUserProfileSchema = createInsertSchema(userProfiles);

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Validate questionnaire answers
export const userAnswersSchema = z.object({
  age: z.string().optional(),
  gender: z.string().optional(),
  familyStatus: z.string().optional(),
  livingArea: z.string().optional(),
  educationLevel: z.string().optional(),
  savingFrequency: z.string().optional(),
  investmentHorizon: z.number().optional(),
  financialGoals: z.array(z.string()).optional(),
  monthlyIncome: z.string().optional(),
  monthlyExpenses: z.string().optional(),
  debtRatio: z.string().optional(),
  riskTolerance: z.string().optional(),
  investmentExperience: z.string().optional(),
  decisionBehavior: z.string().optional(),
  marketReaction: z.string().optional(),
  environmentalPreference: z.number().optional(),
  socialPreference: z.number().optional(),
  governancePreference: z.number().optional()
});

export type UserAnswers = z.infer<typeof userAnswersSchema>;

// Investment products table
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  riskLevel: text("risk_level").notNull(),
  expectedReturn: text("expected_return").notNull(),
  minInvestment: integer("min_investment").notNull()
});

export const insertProductSchema = createInsertSchema(products);

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Product allocation schema for investments
export const productAllocationSchema = z.object({
  productId: z.string(),
  percentage: z.number().min(0).max(100),
  amount: z.number().min(0)
});

export type ProductAllocation = z.infer<typeof productAllocationSchema>;

// Investments table
export const investments = pgTable("investments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  amount: integer("amount").notNull(),
  date: timestamp("date").notNull(),
  status: text("status").notNull(),
  allocations: json("allocations").notNull()
});

export const insertInvestmentSchema = createInsertSchema(investments).extend({
  allocations: z.array(productAllocationSchema)
});

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;
