import { useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import RecorderControls from './components/RecorderControls';
import TranscriptPanel from './components/TranscriptPanel';
import Footer from './components/Footer';

const languages = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'pt-PT', label: 'Português (Portugal)' },
  { code: 'es-ES', label: 'Español (España)' },
  { code: 'es-MX', label: 'Español (México)' },
  { code: 'fr-FR', label: 'Français (France)' },
  { code: 'de-DE', label: 'Deutsch (Deutschland)' },
  { code: 'it-IT', label: 'Italiano' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'ko-KR', label: '한국어' },
  { code: 'zh-CN', label: '中文（简体）' },
  { code: 'zh-TW', label: '中文（繁體）' },
  { code: 'ru-RU', label: 'Русский' },
  { code: 'ar-SA', label: 'العربية' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'tr-TR', label: 'Türkçe' },
  { code: 'nl-NL', label: 'Nederlands' },
  { code: 'sv-SE', label: 'Svenska' },
];

export default function App() {
  const [supported, setSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef(null);

  const RecognitionClass = useMemo(() => {
    const w = typeof window !== 'undefined' ? window : {};
    return w.SpeechRecognition || w.webkitSpeechRecognition || null;
  }, []);

  useEffect(() => {
    if (!RecognitionClass) {
      setSupported(false);
      return;
    }
    setSupported(true);
  }, [RecognitionClass]);

  const startListening = () => {
    if (!RecognitionClass || isListening) return;
    try {
      const recognition = new RecognitionClass();
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interim = '';
        let finals = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          const txt = res[0].transcript;
          if (res.isFinal) {
            finals += txt + ' ';
          } else {
            interim += txt + ' ';
          }
        }
        if (finals) {
          setFinalTranscript((prev) => (prev ? prev + (prev.endsWith('\n') ? '' : ' ') + finals.trim() : finals.trim()));
        }
        setInterimTranscript(interim.trim());
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch (e) {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript('');
  };

  const handleClear = () => {
    setFinalTranscript('');
    setInterimTranscript('');
  };

  const handleCopy = async () => {
    const text = [finalTranscript, interimTranscript].filter(Boolean).join(' ');
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      // Optionally could show toast
    } catch (_) {}
  };

  const handleDownload = () => {
    const text = [finalTranscript, interimTranscript].filter(Boolean).join(' ').trim();
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `transcript-${language}-${ts}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fullTranscript = [finalTranscript, interimTranscript].filter(Boolean).join(' ').trim();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-950 via-neutral-950 to-black text-white">
      <Hero />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
        {!supported && (
          <div className="mt-6 mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            Seu navegador não suporta a API de reconhecimento de voz. Use o Google Chrome no desktop ou um navegador compatível com o Web Speech API.
          </div>
        )}
        <RecorderControls
          isListening={isListening}
          language={language}
          languages={languages}
          onStart={startListening}
          onStop={stopListening}
          onLanguageChange={setLanguage}
        />

        <TranscriptPanel
          value={fullTranscript}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onClear={handleClear}
          isListening={isListening}
        />
      </main>

      <Footer />
    </div>
  );
}
