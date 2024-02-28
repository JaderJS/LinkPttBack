import { pgTable, serial, text, varchar, uuid, pgEnum, timestamp } from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod"


export const userRoleEnum = pgEnum('user_role', ['user', 'admin'])

export const users = pgTable('users', {
    cuid: text('id')
        .$defaultFn(() => createId())
        .primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: userRoleEnum('role').default('user'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})


const createOneUser = z.object({
    name: z.string({ required_error: "Nome e requerido" }).min(5, { message: "O nome fornecido deve ter ao menos 5 caracteres" }),
    email: z.string({ required_error: "Email é requerido" }).email(),
    password: z.string({ required_error: "Senha é requerida" }).min(5, { message: "Sua senha deve ter ao menos 5 caracteres" })
})