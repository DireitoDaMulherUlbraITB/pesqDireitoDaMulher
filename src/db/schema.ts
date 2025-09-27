import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Access Tokens
export const groupAccessTokensTable = pgTable("group_access_tokens", {
  //Cliente
  id: uuid("id").primaryKey(),
  group_name: text("group_name").notNull(),
  subproject_name: text("subproject_name").notNull(),
  token: text("token").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const questionsTable = pgTable("questions", {
  //Cliente
  id: uuid("id").primaryKey(),
  questionNumber: text("question_number").notNull(),
  questionSection: integer("question_section"),
  questionText: text("question_text").notNull(),
  type: text("type").notNull(),
  groupId: uuid("group_id").references(() => groupAccessTokensTable.id),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const studentsTable = pgTable("students", {
  //Cliente
  id: uuid("id").primaryKey(),
  gender: text("gender").notNull(),
  age: text("age").notNull(),
  course: text("course").notNull(),
  period: integer("period").notNull(),
  profession: text("profession").notNull(),
  responseStatus: text("response_status"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const studentSessionsTable = pgTable("student_sessions", {
  //Cliente
  id: uuid("id").primaryKey(),
  studentId: uuid("student_id").references(() => studentsTable.id).notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const answersTable = pgTable("answers", {
  //Cliente
  id: uuid("id").primaryKey(),
  answerText: text("answer_text").notNull(),
  studentId: uuid("student_id").references(() => studentsTable.id).notNull(),
  questionId: uuid("question_id").references(() => questionsTable.id).notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});