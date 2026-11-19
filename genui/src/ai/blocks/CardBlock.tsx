
export type CardBlockProps = {
    title: string;
    description?: string;
    fields?: {label: string, value: string}[];
}

export default function CardBlock({ title, description, fields }: CardBlockProps) {
  return (
    <section className="card-surface p-4">
      <h3 className="break-words text-base font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-1 break-words text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      )}

      {!!fields?.length && (
        <dl className="mt-3 flex flex-col gap-2 border-t border-slate-200/80 pt-3">
          {fields.map((field, i) => (
            <div
              key={`${field.label}-${i}`}
              className="flex items-baseline justify-between gap-4"
            >
              <dt className="shrink-0 text-xs text-slate-400">{field.label}</dt>
              <dd className="min-w-0 break-words text-right text-sm font-medium text-slate-800">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}