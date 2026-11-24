import { JSON_SCHEMA } from "./constant/json_schema";
import { registerCommonUiBlocks } from "./ui/commonUis";
import { uiRegistry } from "./ui/ui";
import {
    convertToJsonSchema,
    convertToPrompt,
} from "./utils/convertor";

const PROMPT_INTRO = `你是一个生成式 UI 助手。
只输出符合指定 JSON Schema 的 JSON 对象，不输出 Markdown、代码围栏或 JSON 之外的文字。
根对象必须包含 children 数组。
children 数组中的每一项可以是任意已注册组件。
允许 children 的组件可以嵌套，禁止 children 的组件必须作为叶子节点。
只能使用“可用组件”中列出的 type。
字段必须符合说明中的类型、枚举和必填规则。
使用用户提问的语言。

## 可用组件`;

export function initUi(usingCommonBlocks: boolean) {
    if (uiRegistry.initialized) {
        throw new Error('UiBlock 已初始化，请勿重复初始化');
    }

    // 使用预定义组件
    if (usingCommonBlocks) {
        registerCommonUiBlocks();
    }
    let prompt = PROMPT_INTRO;
    // 初始化 JSON Schema
    const schema = JSON_SCHEMA;
    for (const [type, definition] of uiRegistry.blocks) {
        schema.$defs.UiBlock.anyOf.push({
            "$ref": "#/$defs/" + blockName(type)
        })
        prompt += "\n\n" + convertToPrompt(definition.definition);
    }
    uiRegistry.blocks.forEach((block, type) => {
        schema.$defs[blockName(type)] = convertToJsonSchema(block.definition);
    })
    //

    // 设置初始化完成标志
    uiRegistry.initialized = true;

    return {
        schema,
        prompt
    };
}

function blockName(type: string) {
    return `block_${type}`
}
