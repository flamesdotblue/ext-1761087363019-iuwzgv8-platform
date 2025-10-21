import { useMemo } from 'react';
import { Copy, Download, Trash2 } from 'lucide-react';

export default function TranscriptPanel({ value, onCopy, onDownload, onClear, isListening }) {
  const wordCount = useMemo(() => (value ? value.trim().split(/\s+/).length : 0), [value]);

  return (
    <section className="mt-8 mb-16">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] backdrop-blur">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
          <div className="text-sm text-white/70">
            {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              <Copy className="size-4" /> Copiar
            </button>
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              <Download className="size-4" /> Baixar
            </button>
            <button
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              <Trash2 className="size-4" /> Limpar
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className={`min-h-[220px] rounded-xl border ${isListening ? 'border-emerald-400/30' : 'border-white/10'} bg-black/30 p-4 text-white/90 leading-relaxed whitespace-pre-wrap`}> 
            {value ? (
              value
            ) : (
              <span className="text-white/40">Comece a falar para ver a transcrição aqui...</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
