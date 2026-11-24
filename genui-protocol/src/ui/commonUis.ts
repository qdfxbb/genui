import { BlockDefinition } from "./ui";
import { registerUiBlock } from "./UiRegistry";

const TextBlock: BlockDefinition = {
    type: 'text',
    description: '文本块',
    children: false,    // 是否有子Block
    properties: {
        text: {
            type: 'string',
            required: true,
            description: '文本内容',
        }
    }
}

const CardBlock: BlockDefinition = {
    type: 'card',
    description: '卡片块',
    children: true,
    properties: {
        title: {
            type: 'string',
            required: true,
            description: '卡片标题',
        }
    }
}

const ListBlock: BlockDefinition = {
    type: 'list',
    description: '列表块',
    children: false,
    properties: {
        title: {
            type: 'string',
            required: true,
            description: '列表标题',
        },
        listItems: {
            type: 'array',
            required: true,
            description: '列表项文本',
            items: {
                type: 'string',
                required: true,
            }
        }
    }
}

const TableBlock: BlockDefinition = {
    type: 'table',
    description: '表格块',
    children: false,
    properties: {
        title: {
            type: 'string',
            required: true,
            description: '表格标题',
        },
        columns: {
            type: 'array',
            required: true,
            description: '表格列名',
            items: {
                type: 'string',
                required: true,
            }
        },
        rows: {
            type: 'array',
            required: true,
            description: '表格行数据',
            items: {
                type: 'array',
                required: true,
                items: {
                    type: 'string',
                    required: true,
                }
            }
        }
    }
}

export function registerCommonUiBlocks() {
    registerUiBlock(TextBlock);
    registerUiBlock(CardBlock);
    registerUiBlock(ListBlock);
    registerUiBlock(TableBlock);
}