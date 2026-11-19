import type { UiMessage } from '../commons/ui'

export const mockUi: UiMessage = {
  version: 1,
  blocks: [
    { type: 'text', text: '根据你的预算，我筛出了两个方案：' },
    {
      type: 'card',
      title: '方案 A · 轻量版',
      description: '适合小规模起步，后期可平滑扩展。',
      fields: [
        { label: '价格', value: '￥1,200' },
        { label: '交付周期', value: '7 天' },
        { label: '包含服务', value: '部署 + 基础培训' },
      ],
    },
    {
      type: 'list',
      title: '注意事项',
      ordered: true,
      items: [
        { title: '需提前 3 天预约', subtitle: '周末档期紧张' },
        { title: '首年免费维护' },
      ],
    },
    {
      type: 'table',
      title: '参数对比',
      columns: ['项目', '方案 A', '方案 B'],
      rows: [
        ['价格', '￥1,200', '￥3,600'],
        ['周期', '7 天', '21 天'],
      ],
    },
  ],
}