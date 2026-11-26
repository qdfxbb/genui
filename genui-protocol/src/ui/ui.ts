import { UiComponent } from "../render/render";

type PropertyDefinition = {
    type: string;
    required: boolean;
    description?: string;
} & (
    | {
        type: 'array';
        items: PropertyDefinition;
    }
    | {
        items?: never;
    }
)

export type BlockDefinition = {
    type: string;
    description: string;
    children: boolean;
    properties: Record<string, PropertyDefinition>;
}

// type BlockRegistry = {
//     definition: BlockDefinition;
// }

export const uiRegistry = {
    blocks: new Map<string, UiComponent<any>>,
    initialized: false,
}

// AI 响应 根节点
export type AiResponse = {
    type: "ai_response";
    children: UiNode[];
}

export type UiNode = {
    type: string;
    props: Record<string, any>;
    children?: UiNode[];
}

