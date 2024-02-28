import { relations } from "drizzle-orm";
import { bigint, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { z } from "zod";
import { db } from "../db";

export const storages = pgTable("storages", {
    id: serial("id").primaryKey(),
    filePath: text("file_path").notNull(),
    blob: text("blob"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    createdBy: text("created_by").notNull(),
})

export const userToStorages = relations(users, ({ many }) => ({
    storages: many(storages)
}))

export const storageToUser = relations(storages, ({ one }) => ({
    author: one(users, {
        fields: [storages.createdBy],
        references: [users.cuid]
    })
}))

