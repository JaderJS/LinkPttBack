import Fastify from "fastify"
import FastifyIO from "fastify-socket.io"
import cors from '@fastify/cors'
import { Server } from "socket.io"
import { socketEvents } from "./socket"
import { userRoutes } from "./routes/user.route"
import { storagesRoutes } from "./routes/storages.routes"

export const app = Fastify({ logger: false })

app.register(FastifyIO, {
    cors:
        { origin: "*" }
})
app.register(cors, { origin: "*" })
app.register(userRoutes, { prefix: "api/users" })
app.register(storagesRoutes, { prefix: "api/storages" })

app.get(`/`, async (req, res) => {
    res.send({ msg: "Running" })
})

app.ready().then(() => {
    socketEvents(app.io)
})

const boot = () => {
    app.listen({ port: 8888, host: "0.0.0.0" }).then(() => {
        console.log(`🔥 Running `)
    })
}

boot()

declare module "fastify" {
    interface FastifyInstance {
        io: Server<{ hello: string }>;
    }
}