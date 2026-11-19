import { useState } from "react";
import type { Msg } from "../commons/type";
import { sendChat } from "../api/chat";
import { UiMessageRenderer } from "./blocks/BlockRenderer";

export default function Chat() {

    const [thinking, setThinking] = useState(false);

    const [messages, setMessages] = useState<Msg[]>([]);

    const [input, setInput] = useState('');

    const [error, setError] = useState<boolean>(false);

    async function send() {
        if (!input.trim() || thinking) {
            return;
        }
        setThinking(true);
        let history = messages.slice();
        if (error) {
            // setMessages(prev => prev.slice(0, -1));
            history = messages.slice(0, -1);
            setError(false);
        }
        const sendHistory = [...history, { role: 'user', content: input} as Msg];

        setMessages(sendHistory);
        setInput('');

        try {
            const ui = await sendChat(sendHistory);
            setMessages([...sendHistory, { role: 'assistant', content: JSON.stringify(ui)} as Msg])
        } catch (err) {
            alert(err instanceof Error ? err.message : String(err));
            setError(true);
        } finally {
            setThinking(false);
        }
    }


    return (
        <div>
            <input type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !thinking) {
                        e.preventDefault();
                        send();
                    }
                }
            }
            />
            <button onClick={() => send()} disabled={thinking}>{thinking ? '发送中...' : '发送'}</button>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <span>{msg.role}:</span>
                            {
                                msg.role === 'user' ?
                                <span>{msg.content}</span> :
                                <UiMessageRenderer ui={JSON.parse(msg.content)}/>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}