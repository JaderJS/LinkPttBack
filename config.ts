import 'dotenv/config'



export const config = {
    db_url: process.env.DB_URL || "",
    supaBase_url: process.env.SUPABASE_URL,
    supaBase_key: process.env.SUPABASE_KEY
}

console.log(config)