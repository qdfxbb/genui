import { z } from 'zod';

// ========================================================================= //
//                                 SCHEMAS                                   //
// ========================================================================= //
// 这份 schema 是前端四个组件 props 的镜像：
// 只暴露「内容」和「有限枚举」，不暴露 className / 颜色 / 尺寸等视觉细节。

const TextBlockSchema = z.object({
  type: z.literal('text'),
  text: z.string().min(1).max(2000),
  tone: z.enum(['default', 'muted']).default('default'),
});

const CardFieldSchema = z.object({
  label: z.string().min(1).max(30),
  value: z.string().min(1).max(120),
});

const CardBlockSchema = z.object({
  type: z.literal('card'),
  title: z.string().min(1).max(80),
  description: z.string().max(300).optional(),
  fields: z.array(CardFieldSchema).min(1).max(6).optional(),
});

const ListItemSchema = z.object({
  title: z.string().min(1).max(120),
  subtitle: z.string().max(200).optional(),
});

const ListBlockSchema = z.object({
  type: z.literal('list'),
  title: z.string().max(80).optional(),
  ordered: z.boolean().default(false),
  items: z.array(ListItemSchema).min(1).max(10),
});

const TableBlockSchema = z.object({
  type: z.literal('table'),
  title: z.string().max(80).optional(),
  columns: z.array(z.string().min(1).max(30)).min(2).max(6),
  rows: z.array(z.array(z.string().max(120))).min(1).max(20),
});

// NOTE: discriminatedUnion 只接受 ZodObject，
// 所以行列对齐这类跨字段校验不能写成 .refine()，见 normalizeBlock。
export const UiBlockSchema = z.discriminatedUnion('type', [
  TextBlockSchema,
  CardBlockSchema,
  ListBlockSchema,
  TableBlockSchema,
]);

export const UiMessageSchema = z.object({
  version: z.literal(1),
  blocks: z.array(UiBlockSchema).min(1).max(12),
});

// ========================================================================= //
//                                   TYPES                                   //
// ========================================================================= //

export type TextBlock = z.infer<typeof TextBlockSchema>;
export type CardBlock = z.infer<typeof CardBlockSchema>;
export type ListBlock = z.infer<typeof ListBlockSchema>;
export type TableBlock = z.infer<typeof TableBlockSchema>;

export type UiBlock = z.infer<typeof UiBlockSchema>;
export type UiMessage = z.infer<typeof UiMessageSchema>;

// ========================================================================= //
//                                 FUNCTIONS                                 //
// ========================================================================= //

/**
 * strict 模式下「可选字段」必须回传空字符串。
 * 这里把空串归一成 undefined，前端就能直接 `title && ...` 判断。
 * 同时补掉表格行列不齐的情况——补空单元格，而不是整块丢弃。
 */
function normalizeBlock(block: UiBlock): UiBlock | null {
  switch (block.type) {
    case 'text': {
      const text = block.text.trim();
      return text ? { ...block, text } : null;
    }

    case 'card': {
      const fields = block.fields?.filter(
        (f) => f.label.trim() && f.value.trim(),
      );
      return {
        ...block,
        description: block.description?.trim() || undefined,
        fields: fields?.length ? fields : undefined,
      };
    }

    case 'list': {
      return {
        ...block,
        title: block.title?.trim() || undefined,
        items: block.items.map((item) => ({
          ...item,
          subtitle: item.subtitle?.trim() || undefined,
        })),
      };
    }

    case 'table': {
      const columns = block.columns.map((col) => col.trim());
      const rows = block.rows.map((row) =>
        Array.from({ length: columns.length }, (_, i) => (row[i] ?? '').trim()),
      );
      return {
        ...block,
        title: block.title?.trim() || undefined,
        columns,
        rows,
      };
    }
  }
}

/**
 * 校验 + 归一化模型输出。失败返回 null，由调用方决定重试或降级。
 */
export function parseUiMessage(raw: unknown): UiMessage | null {
  const parsed = UiMessageSchema.safeParse(raw);
  if (!parsed.success) return null;

  const blocks = parsed.data.blocks
    .map(normalizeBlock)
    .filter((block): block is UiBlock => block !== null);

  if (blocks.length === 0) return null;
  return { version: 1, blocks };
}
