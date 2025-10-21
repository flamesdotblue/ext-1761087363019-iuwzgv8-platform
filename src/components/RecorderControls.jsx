import { Globe, Mic, Square } from 'lucide-react';

export default function RecorderControls({ isListening, language, languages, onStart, onStop, onLanguageChange }) {
  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <Globe className="size-4 text-white/70" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-white text-sm outline-none"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-neutral-900">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <span className={`text-xs rounded-full px-2 py-1 border ${isListening ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-white/10 bg-white/5 text-white/60'}`}>
            {isListening ? 'Gravando...' : 'Pronto'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!isListening ? (
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 font-medium transition-colors"
            >
              <Mic className="size-4" /> Iniciar
            </button>
          ) : (
            <button
              onClick={onStop}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 hover:bg-red-400 text-black px-4 py-2 font-medium transition-colors"
            >
              <Square className="size-4" /> Parar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
