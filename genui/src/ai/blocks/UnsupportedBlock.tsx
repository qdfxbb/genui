export default function UnsupportedBlock({ type }: { type?: string }) {
  return (
    <div className="rounded-card border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-400">
      暂不支持的块类型：{type ?? 'unknown'}
    </div>
  )
}