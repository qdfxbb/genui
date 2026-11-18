import type { Msg } from "../commons/type";


export async function sendChat(messages: Msg[]) {
    const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
    });
    if (resp.ok && resp.status === 200){
        const data = await resp.json();
        return data.message;
    } else {
        throw new Error(`${resp.status} Failed to send chat: ${resp.status} ${resp.statusText}`);
    }
}