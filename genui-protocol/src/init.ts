import { JSON_SCHEMA } from "./constant/json_schema";
import { PROMPT_INTRO } from "./constant/prompt";
import { registerCommonUiBlocks } from "./ui/commonUi";
import { uiRegistry } from "./ui/ui";
import { registerUiBlock } from "./ui/uiRegistry";
import {
    convertToJsonSchema,
    convertToPrompt,
} from "./utils/convertor";

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
