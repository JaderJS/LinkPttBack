import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { config } from '../../config'

const migrationClient = postgres(config.db_url, { max: 1 })

const seed = async () => {
    console.log(`Starting migrate...`)
    await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" })
    console.log(`Finished migration`)
    process.exit(0)
}

seed().catch(console.error)
