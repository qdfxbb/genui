import { useState } from "react";
import type { Msg } from "../commons/type";
import { sendChat } from "../api/chat";

export default function Chat() {

    const [thinking, setThinking] = useState(false);

    const [messages, setMessages] = useState<Msg[]>([]);

    const [input, setInput] = useState('');

    async function send() {
        setThinking(true);
        const sendHistory = [...messages, { role: 'user', content: input} as Msg];

        setMessages(sendHistory);
        setInput('');

        try {
            const reply = await sendChat(sendHistory);
            setMessages([...sendHistory, { role: 'assistant', content: reply} as Msg])
        } catch (err) {
            setMessages([...sendHistory, { role: 'assistant', content: `出错了：${(err as Error).message}` }]);
        } finally {
            setThinking(false);
        }
    }


    return (
        <div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => send()} disabled={thinking}>{thinking ? '发送中...' : '发送'}</button>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <span>{msg.role}:</span>
                            <span>{msg.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}