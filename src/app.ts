import "dotenv/config"
import { addKeyword, createBot, createFlow, createProvider, MemoryDB } from "@bot-whatsapp/bot"
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"

const flowBienvenida = addKeyword('hola').addAnswer('Buenas!! bienvenido')

const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage(process.env.FNUMBER, message, {
            
        })
        res.end('esto es el proveedor de polka')
    }))
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()