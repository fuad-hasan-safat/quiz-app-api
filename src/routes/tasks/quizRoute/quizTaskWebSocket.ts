import Elysia, { t } from "elysia";
import { treaty } from "@elysiajs/eden";
import cors from "@elysiajs/cors";

const qwizTaskWebSocket = new Elysia()
    .use(cors())
    .ws("/chat", {
        body: t.String(),
        response: t.String(),
        message(ws, message) {
            ws.send(message);

            console.log('message',message)
        },
    })
    .listen(3001)

const api = treaty<typeof qwizTaskWebSocket>("localhost:3001");

const chat = api.chat.subscribe();

chat.subscribe((message) => {
    console.log("got", message);
});

chat.on("open", () => {
    chat.send("hello from client");
});


export default qwizTaskWebSocket;
