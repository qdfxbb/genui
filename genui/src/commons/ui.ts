import type { CardBlockProps } from "../ai/blocks/CardBlock";
import type { ListBlockProps } from "../ai/blocks/ListBlock";
import type { TableBlockProps } from "../ai/blocks/TableBlock";
import type { TextBlockProps } from "../ai/blocks/TextBlock";

export type Ui = {
    ui: UiMessage
}


export type TextBlock = { type: 'text' } & TextBlockProps;
export type CardBlock = { type: 'card' } & CardBlockProps;
export type ListBlock = { type: 'list' } & ListBlockProps;
export type TableBlock = { type: 'table' } & TableBlockProps;

export type UiBlock = TextBlock | CardBlock | ListBlock | TableBlock;

export type UiMessage = {
    version: 1
    blocks: UiBlock[]
}