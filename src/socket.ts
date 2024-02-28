import { Server, Socket } from 'socket.io'
import { createOneStorage } from './controllers/storage'

import { createClient } from '@supabase/supabase-js'
import { config } from '../config'
import { createId } from '@paralleldrive/cuid2'

const supabase = createClient(config.supaBase_url!, config.supaBase_key!)


const socketEvents = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`New connection: ${socket.id}`)

        socket.on('chatMessage', (message: { msg: string }) => {
            console.log(`Received message: ${message.msg.toUpperCase()}`)

            socket.emit('chatMessage', message.msg.toUpperCase() + "Jader")
        })

        socket.on('message', (data: Blob) => {
            const bucket = 'messages'

            supabase.storage.from(bucket).upload(createId(), data, { contentType: "audio/wav; codecs=opus", upsert: true }).then((resp) => {
                try {
                    const publicUrl = supabase.storage.from(bucket).getPublicUrl(resp.data?.path ?? "")
                    console.log(publicUrl)
                    createOneStorage({ createdBy: "x6xxxazyf37oly5vraxgac3a", filePath: publicUrl.data.publicUrl, blob: "" })
                } catch (error) {
                    console.error(error)
                }
            })


            io.emit('message', data)
        })
    })
}

export { socketEvents }