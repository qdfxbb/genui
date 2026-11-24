import { BlockDefinition } from "../ui/ui";

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
