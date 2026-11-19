import type { UiBlock, UiMessage } from '../../commons/ui'
import CardBlock from './CardBlock'
import ListBlock from './ListBlock'
import TableBlock from './TableBlock'
import TextBlock from './TextBlock'
import UnsupportedBlock from './UnsupportedBlock'

export function BlockRenderer({ block }: { block: UiBlock }) {
  switch (block.type) {
    case 'text':
      return <TextBlock text={block.text} tone={block.tone} />
    case 'card':
      return (
        <CardBlock
          title={block.title}
          description={block.description}
          fields={block.fields}
        />
      )
    case 'list':
      return (
        <ListBlock
          title={block.title}
          ordered={block.ordered}
          items={block.items}
        />
      )
    case 'table':
      return (
        <TableBlock title={block.title} columns={block.columns} rows={block.rows} />
      )
    default: {
      // TS 认为这里不可达，但运行时仍可能收到旧后端返回的未知类型
      const unknown = block as { type?: string }
      return <UnsupportedBlock type={unknown.type} />
    }
  }
}

export function UiMessageRenderer({ ui }: { ui: UiMessage }) {
  if (!ui.blocks.length) return null

  return (
    <div className="flex w-full flex-col gap-3">
      {ui.blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  )
}