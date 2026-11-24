import { BlockDefinition, uiRegistry } from "./ui";


export function registerUiBlock(blockDefinition: BlockDefinition) {
    if (uiRegistry.initialized) {
        throw new Error('UiBlock 注册已初始化，无法再注册新类型');
    }

    if (uiRegistry.blocks.has(blockDefinition.type)) {
        throw new Error(`UiBlock 类型重复注册：${blockDefinition.type}`);
    }

    uiRegistry.blocks.set(blockDefinition.type, { definition: blockDefinition });
}