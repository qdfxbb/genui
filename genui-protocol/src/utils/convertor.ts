import { AiResponse, BlockDefinition, UiNode, uiRegistry } from "../ui/ui";

function propertyType(type: BlockDefinition["properties"][string]): string {
    if (type.type === 'array') {
        return `${propertyType(type.items!)}[]`;
    }
    return type.type;
}

export function convertToPrompt(ui: BlockDefinition) {
    const lines = [
        `### ${ui.type}`,
        `用途：${ui.description}`,
        `子组件：${ui.children ? "允许，children 为 UiBlock[]，必填。" : "禁止。"} `,
        "属性：",
    ];

    for (const [key, value] of Object.entries(ui.properties)) {
        const description = value.description
            ? `。${value.description}`
            : "";
        lines.push(
            `- ${key}：${propertyType(value)}，${value.required ? "必填" : "可选"}${description}`,
        );
    }

    return lines.join("\n");
}

export function convertToJsonSchema(ui: BlockDefinition) {
    const schema: Record<string, any> = {
        type: 'object',
        properties: {},
        required: [],
        additionalProperties: false,
        description: ui.description,
    }
    schema.properties["type"] = {
        type: 'string',
        enum: [ui.type],
        description: "Block 类型",
    }
    schema.required.push("type");
    for(const [key, val] of Object.entries(ui.properties)) {
        if (val.required === true) {
            schema.required.push(key);
        }
        schema.properties[key] = {
            'type': val.type,
            'description': val.description,
        }
        let obj = val;
        let currentProperty = schema.properties[key];
        while (obj.type === 'array') {
            currentProperty.items = {
                'type': obj.items!.type,
                'description': obj.items!.description,
            }
            if (obj.items!.type !== 'array') {
                break;
            }
            obj = obj.items!;
            currentProperty = currentProperty.items;
        }
    }
    if (ui.children === true) {
        schema.properties["children"] = {
            type: 'array',
            items: {
                "$ref": "#/$defs/UiBlock"
            }
        }
        schema.required.push("children");
    }

    return schema;
}

// 将 AI 返回的 JSON 转换为 UiNode 树
export function parseAiOutputText(text: string) {
    try {
        const root: AiResponse = {
            type: "ai_response",
            children: [],
        }
        const raw = JSON.parse(text);
        if (raw.children instanceof Array === false) {
            throw new Error("children 不是数组");
        }
        const firstNodes = raw.children as any[];
        if (uiRegistry.initialized === false) {
            throw new Error("uiRegistry 未初始化");
        }
        firstNodes.map(node => {
            root.children.push(parseNode(node));
        })
        return root;

    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        throw new Error(`AI 响应转换失败：${message}`, { cause: error })
    }
    

}

function parseNode(ui: any) {
    if(uiRegistry.blocks.has(ui.type) === false) {
        throw new Error(`未知的 UiBlock 类型：${ui.type}`);
    }
    const blockDefinition = uiRegistry.blocks.get(ui.type)!.definition;
    
    const {type, children, ...rest} = ui;
    const childrenNodes: UiNode[] = [];
    if (children !== undefined) {
        if (children instanceof Array === false) {
            throw new Error(`UiBlock 类型 ${type} 的 children 不是数组`);
        }
        if (blockDefinition.children === false) {
            throw new Error(`UiBlock 类型 ${type} 不允许有子组件`);
        }
        children.map((child: any) => {
            childrenNodes.push(parseNode(child));
        })
    }
    const node: UiNode = {
        type: type,
        props: rest,
    }
    if (childrenNodes.length > 0) {
        node.children = childrenNodes;
    }
    return node;

}