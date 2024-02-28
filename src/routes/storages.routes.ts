import { FastifyInstance } from "fastify"
import { db } from "../database/db"
import { desc } from "drizzle-orm"

export const storagesRoutes = async (server: FastifyInstance) => {

    server.get(`/`, async (req, res) => {
        const storages_ = await db.query.storages.findMany({ limit: 5, orderBy: (fields, { desc }) => [desc(fields.createdAt)], })
        res.send({ data: storages_ })
    })

    server.post(`/`, async (req, res) => {

        const users = await db.query.users.findMany({
            with: {
                storages: true
            }
        })
        res.send({ "msg": "User router config OK", data: users })
    })

}