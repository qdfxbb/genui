export type TableBlockProps = {
    title?: string;
    columns: string[];
    rows: string[][];
}

export default function TableBlock({ title, columns, rows }: TableBlockProps) {
  return (
    <section className="card-surface overflow-hidden">
      {title && (
        <div className="border-b border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-800">
          {title}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2 text-left text-xs font-medium text-slate-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, r) => (
              <tr
                key={r}
                className="border-t border-slate-200/70 odd:bg-white even:bg-slate-50"
              >
                {row.map((cell, c) => (
                  <td
                    key={c}
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