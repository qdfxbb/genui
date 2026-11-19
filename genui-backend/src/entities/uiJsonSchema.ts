/**
 * 交给模型的 JSON Schema（strict 模式）。
 * 约束：所有字段必须进 required、每个 object 必须 additionalProperties:false、
 * 不支持 minLength/maxItems 等关键字、判别字段用 enum 而非 const。
 */
export const UI_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['version', 'blocks'],
  properties: {
    version: { type: 'integer', enum: [1] },
    blocks: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            additionalProperties: false,
            required: ['type', 'text', 'tone'],
            properties: {
              type: { type: 'string', enum: ['text'] },
              text: { type: 'string' },
              tone: { type: 'string', enum: ['default', 'muted'] },
            },
          },
          {
            type: 'object',
            additionalProperties: false,
            required: ['type', 'title', 'description', 'fields'],
            properties: {
              type: { type: 'string', enum: ['card'] },
              title: { type: 'string' },
              description: { type: 'string' },
              fields: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['label', 'value'],
                  properties: {
                    label: { type: 'string' },
                    value: { type: 'string' },
                  },
                },
              },
            },
          },
          {
            type: 'object',
            additionalProperties: false,
            required: ['type', 'title', 'ordered', 'items'],
            properties: {
              type: { type: 'string', enum: ['list'] },
              title: { type: 'string' },
              ordered: { type: 'boolean' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  required: ['title', 'subtitle'],
                  properties: {
                    title: { type: 'string' },
                    subtitle: { type: 'string' },
                  },
                },
              },
            },
          },
          {
            type: 'object',
            additionalProperties: false,
            required: ['type', 'title', 'columns', 'rows'],
            properties: {
              type: { type: 'string', enum: ['table'] },
              title: { type: 'string' },
              columns: { type: 'array', items: { type: 'string' } },
              rows: {
                type: 'array',
                items: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        ],
      },
    },
  },
};
