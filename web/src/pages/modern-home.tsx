import { useState } from 'react';

export default function ModernHome() {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setTestResult('API opérationnelle !');
      } else {
        setTestResult('Erreur API.');
      }
    } catch {
      setTestResult('Erreur réseau.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
      <div className="bg-white/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-text-glow">
          RAGFlow
        </h1>
        <p className="text-lg text-gray-700 font-medium text-center max-w-xl animate-fade-in-up">
          Plateforme RAG moderne, rapide et colorée. API par défaut : même domaine que le frontend.
        </p>
        <div className="flex gap-6 mt-4">
          <button
            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-lg hover:scale-105 hover:from-blue-500 hover:to-green-400 transition-all duration-300 animate-bounce"
            onClick={() => alert('Enregistré !')}
          >
            Enregistrer
          </button>
          <button
            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg hover:scale-105 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 animate-bounce"
            onClick={handleTest}
            disabled={loading}
          >
            {loading ? 'Test en cours...' : 'Tester'}
          </button>
        </div>
        {testResult && (
          <div className="mt-4 text-lg font-semibold text-blue-700 animate-fade-in">
            {testResult}
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in-up { animation: fade-in-up 1.4s cubic-bezier(.4,0,.2,1) both; }
        @keyframes text-glow {
          0%,100% { text-shadow: 0 0 16px #fff, 0 0 32px #a78bfa; }
          50% { text-shadow: 0 0 32px #f472b6, 0 0 64px #60a5fa; }
        }
        .animate-text-glow { animation: text-glow 2.5s ease-in-out infinite alternate; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce { animation: bounce 1.2s infinite; }
      `}</style>
    </div>
  );
}
