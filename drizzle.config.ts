import type { Config } from "drizzle-kit"
import { config } from "./config"

export default {
  schema: "./src/database/schemas/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: config.db_url,
  }
} satisfies Config
