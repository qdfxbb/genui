export type ListBlockProps = {
    title?: string;
    ordered?: boolean;
    items: {title: string; subtitle?: string}[];
}

export default function ListBlock({
  title,
  ordered = false,
  items,
}: ListBlockProps) {
  const List = ordered ? 'ol' : 'ul'

  return (
    <section className="card-surface p-4">
      {title && (
        <h3 className="break-words text-base font-semibold text-slate-900">
          {title}
        </h3>
      )}

      <List
        className={`flex flex-col divide-y divide-slate-200/80 ${title ? 'mt-2' : ''}`}
      >
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
              {ordered ? i + 1 : '•'}
            </span>

            <div className="min-w-0">
              <p className="break-words text-sm font-medium text-slate-800">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="mt-0.5 break-words text-xs text-slate-500">
                  {item.subtitle}
                </p>
              )}
            </div>
          </li>
        ))}
      </List>
    </section>
  )
}