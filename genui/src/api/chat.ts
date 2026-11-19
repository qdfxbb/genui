import type { Msg } from "../commons/type";
import type { Ui } from "../commons/ui";


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
        if (!data?.ui) throw new Error('返回格式不对');
        return (data as Ui).ui;
    } else {
        throw new Error(`${resp.status} Failed to send chat: ${resp.status} ${resp.statusText}`);
    }
}