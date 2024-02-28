import { FastifyInstance } from "fastify"
import { db } from "../database/db"

export const userRoutes = async (server: FastifyInstance) => {
    server.get(`/`, async (req, res) => {
        const users = await db.query.users.findMany({
            with: {
                storages: true
            }
        })
        // res.send({ "msg": "User router config OK"})
        res.send({ "msg": "User router config OK", data: users })
    })

}