import { db } from "../database/db"
import { storages } from "../database/schemas/storage"

export const createOneStorage = async (storage: typeof storages.$inferInsert) => {
    return db.insert(storages).values(storage)
}