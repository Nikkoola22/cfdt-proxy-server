import React, { useState } from 'react';

export default function SimplePythonChatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Bonjour, je suis le chatbot RAGFlow Python. Posez-moi une question !" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, session_id: null })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: 'bot', text: data.answer || data.detail || 'Erreur de réponse.' }
      ]);
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: 'bot', text: "Erreur lors de l'appel au backend." }
      ]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
      <div className="h-64 overflow-y-auto mb-4 border p-2 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'bot' ? 'text-blue-700' : 'text-gray-900'}>
            <b>{msg.role === 'bot' ? 'Bot' : 'Vous'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2 text-black bg-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Votre question..."
          disabled={loading}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >Envoyer</button>
      </div>
    </div>
  );
}
