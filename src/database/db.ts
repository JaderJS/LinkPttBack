import postgres from "postgres"
import { drizzle } from 'drizzle-orm/postgres-js'
import { config } from "../../config"
import * as users from './schemas/user'
import * as storages from './schemas/storage'

const queryClient = postgres(config.db_url)

export const db = drizzle(queryClient, { schema: { ...users, ...storages } })