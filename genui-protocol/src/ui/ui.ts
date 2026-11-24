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

type BlockRegistry = {
    definition: BlockDefinition;
}

export const uiRegistry = {
    blocks: new Map<string, BlockRegistry>,
    initialized: false,
}
