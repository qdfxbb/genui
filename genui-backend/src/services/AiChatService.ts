import OpenAI from 'openai';

import type { Msg } from '#src/entities/type.ts';
import { parseUiMessage, type UiMessage } from '#src/entities/ui.ts';
import { UI_JSON_SCHEMA } from '#src/entities/uiJsonSchema.ts';
import { UI_SYSTEM_PROMPT } from '#src/services/uiPrompt.ts';

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

/**
 * 把对话交给模型，返回一条可渲染的 UI 规格。
 *
 * 三步：发请求 → 取出 JSON 文本 → 校验成 UiMessage。
 * 校验不过就抛错，让接口直接返回 500，方便看到真实原因。
 */
export default async function chat(messages: Msg[]): Promise<UiMessage | null> {
  if (messages.length === 0) return null;

  const resp = await client.responses.create({
    model: 'deepseek-flash',
    instructions: UI_SYSTEM_PROMPT,
    input: messages,
    text: {
      format: {
        type: 'json_schema',
        name: 'ui_spec',
        strict: true,
        schema: UI_JSON_SCHEMA,
      },
    },
    max_output_tokens: 2048,
  });

  // output_text 就是模型输出的那段 JSON 字符串
  return parseUiMessage(JSON.parse(resp.output_text));
}
