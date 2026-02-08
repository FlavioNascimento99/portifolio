import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, X, Minimize2, Maximize2, Cpu } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageStream } from '../services/geminiService';

export const TerminalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Initializing J-BOT v1.0...\nSystem ready. Ask me about the developer.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsProcessing(true);

    // Create placeholder for model response
    setMessages(prev => [...prev, { role: 'model', text: '', isTyping: true }]);

    try {
      const stream = sendMessageStream(userMsg);
      let fullResponse = "";

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newHistory = [...prev];
          const lastMsg = newHistory[newHistory.length - 1];
          if (lastMsg.role === 'model') {
            lastMsg.text = fullResponse;
            lastMsg.isTyping = true;
          }
          return newHistory;
        });
      }
      
      // Finalize
      setMessages(prev => {
        const newHistory = [...prev];
        const lastMsg = newHistory[newHistory.length - 1];
        lastMsg.isTyping = false;
        return newHistory;
      });

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error: System malfunction." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-black text-neo-green border-4 border-white shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all p-4 rounded-none flex items-center gap-2"
      >
        <Terminal size={24} />
        <span className="font-mono font-bold hidden md:inline">J-BOT.exe</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] flex flex-col font-mono text-sm border-4 border-black shadow-neo-lg bg-black">
      {/* Terminal Header */}
      <div className="bg-neo-yellow border-b-4 border-black p-2 flex justify-between items-center select-none handle cursor-move">
        <div className="flex items-center gap-2 text-black font-bold">
          <Cpu size={18} />
          <span>J-BOT_TERMINAL</span>
        </div>
        <div className="flex gap-2">
          <button onClick={toggleChat} className="p-1 hover:bg-black hover:text-white border-2 border-black transition-colors">
            <Minimize2 size={16} />
          </button>
          <button onClick={toggleChat} className="p-1 hover:bg-neo-pink border-2 border-black transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-green-500 scrollbar-hide bg-black/95">
        {messages.map((msg, idx) => (
          <div key={idx} className={`${msg.role === 'user' ? 'text-neo-blue text-right' : 'text-neo-green text-left'}`}>
            <span className="opacity-50 text-xs mb-1 block">
              {msg.role === 'user' ? '> USER' : '> SYSTEM'}
            </span>
            <div className="whitespace-pre-wrap leading-relaxed break-words">
              {msg.text}
              {msg.isTyping && <span className="animate-pulse">_</span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="bg-gray-900 border-t-4 border-black p-2 flex gap-2">
        <span className="text-neo-green py-2 pl-2">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-transparent text-white font-mono outline-none border-none focus:ring-0 placeholder-gray-600"
          autoFocus
        />
        <button 
          type="submit" 
          disabled={isProcessing}
          className="bg-neo-green text-black border-2 border-neo-green px-3 hover:bg-white hover:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
