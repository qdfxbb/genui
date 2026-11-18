import type { Msg } from "#src/entities/type.ts";
import OpenAI from "openai"; 

const client = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});

export default async function chat(messages: Msg[]) {
    const resp = await client.chat.completions.create({
        model: "deepseek-flash",
        messages: messages,
    })

    return resp.choices[0].message.content;
}