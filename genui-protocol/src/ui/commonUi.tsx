import type { ReactNode } from 'react'

import { BlockDefinition } from './ui'
import { registerUiBlock } from './uiRegistry'

const TextBlock: BlockDefinition = {
  type: 'text',
  description: '文本块',
  children: false,
  properties: {
    text: {
      type: 'string',
      required: true,
      description: '文本内容',
    },
  },
}

const CardBlock: BlockDefinition = {
  type: 'card',
  description: '卡片块',
  children: true,
  properties: {
    title: {
      type: 'string',
      required: true,
      description: '卡片标题',
    },
  },
}

const ListBlock: BlockDefinition = {
  type: 'list',
  description: '列表块',
  children: false,
  properties: {
    title: {
      type: 'string',
      required: true,
      description: '列表标题',
    },
    listItems: {
      type: 'array',
      required: true,
      description: '列表项文本',
      items: {
        type: 'string',
        required: true,
      },
    },
  },
}

const TableBlock: BlockDefinition = {
  type: 'table',
  description: '表格块',
  children: false,
  properties: {
    title: {
      type: 'string',
      required: true,
      description: '表格标题',
    },
    columns: {
      type: 'array',
      required: true,
      description: '表格列名',
      items: {
        type: 'string',
        required: true,
      },
    },
    rows: {
      type: 'array',
      required: true,
      description: '表格行数据',
      items: {
        type: 'array',
        required: true,
        items: {
          type: 'string',
          required: true,
        },
      },
    },
  },
}

type TextComponentProps = {
  text: string
}

function TextComponent({ text }: TextComponentProps) {
  return (
    <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-700">
      {text}
    </p>
  )
}

type CardComponentProps = {
  title: string
  children?: ReactNode
}

function CardComponent({ title, children }: CardComponentProps) {
  return (
    <section className="card-surface p-4">
      <h3 className="break-words text-base font-semibold text-slate-900">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  )
}

type ListComponentProps = {
  title: string
  listItems: string[]
}

function ListComponent({ title, listItems }: ListComponentProps) {
  return (
    <section className="card-surface p-4">
      <h3 className="break-words text-base font-semibold text-slate-900">
        {title}
      </h3>
      <ul className="mt-2 flex flex-col divide-y divide-slate-200/80">
        {listItems.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
              •
            </span>
            <p className="break-words text-sm text-slate-800">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

type TableComponentProps = {
  title: string
  columns: string[]
  rows: string[][]
}

function TableComponent({
  title,
  columns,
  rows,
}: TableComponentProps) {
  return (
    <section className="card-surface overflow-hidden">
      <div className="border-b border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-800">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2 text-left text-xs font-medium text-slate-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-slate-200/70 odd:bg-white even:bg-slate-50"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="break-words px-4 py-2 align-top text-slate-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function registerCommonUiBlocks() {
  registerUiBlock(TextBlock, TextComponent)
  registerUiBlock(CardBlock, CardComponent)
  registerUiBlock(ListBlock, ListComponent)
  registerUiBlock(TableBlock, TableComponent)
}
