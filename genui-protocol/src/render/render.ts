import { BlockDefinition, UiNode } from "../ui/ui";

export type UiComponent<P = Record<string, any>> = {
    definition: BlockDefinition;
    component: React.ComponentType<P>;
}