import { Loader2 } from 'lucide-react'

export default function PageLoading({ label = 'Memuat halaman...' }: { label?: string }) {
  return <div role="status" aria-live="polite" aria-busy="true" className="mx-auto w-full max-w-5xl px-4 py-12 space-y-6">
    <div className="flex items-center gap-3 text-unipas-primary font-medium"><Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />{label}</div>
    {[0, 1, 2].map(item => <div key={item} className="rounded-xl border bg-white p-6 space-y-3 animate-pulse motion-reduce:animate-none"><div className="h-5 w-2/3 rounded bg-slate-200" /><div className="h-3 w-full rounded bg-slate-100" /><div className="h-3 w-4/5 rounded bg-slate-100" /></div>)}
  </div>
}
