'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Send, Bot, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get company name from URL params
    const company = searchParams.get('company') || 'tu empresa';
    setCompanyName(company);

    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: `¡Hola! Soy el agente de servicio al cliente de ${company}. ¿En qué puedo ayudarte hoy?`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "El equipo de AIGents está trabajando para dejar listo tu Agente de Servicio al Cliente especializado. ¡Muy pronto tendrás respuestas inteligentes y personalizadas para tu empresa!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/30 border-b border-gray-700 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href="/config">
              <Button
                variant="outline"
                className="bg-gradient-to-r from-[#8c26d5] via-[#E8A5F9] to-[#f6e6c3] text-black font-bold text-lg px-6 h-12 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 hover:from-[#8c26d5] hover:to-[#f9ebc9] flex items-center justify-center hover:shadow-[0_0_20px_#F55AFC] border-none"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Configuración
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 
                className="text-4xl font-bold bg-gradient-to-r from-[#C75AF6] via-[#F55AFC] to-[#C75AF6] bg-clip-text text-transparent mb-2"
                style={{
                  textShadow: '0 0 20px rgba(199, 90, 246, 0.5), 0 0 40px rgba(245, 90, 252, 0.3)'
                }}
              >
                Agente de {companyName}
              </h1>
              <p className="text-lg text-[#f6e6c3] font-medium">
                El mejor servicio al cliente. <span className="text-[#E8A5F9]">Con AIGents.</span>
              </p>
            </div>

            <div className="w-[200px]"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-12">
          <div className="container mx-auto max-w-4xl space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-[#C75AF6] to-[#F55AFC]'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex-1 max-w-3xl ${
                  message.sender === 'user' ? 'flex justify-end' : ''
                }`}>
                  <div className={`rounded-full px-6 py-4 ${
                    message.sender === 'user'
                      ? 'bg-yellow-200 text-gray-800'
                      : 'bg-pink-200 text-gray-800'
                  }`}>
                    <p className="text-base leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user'
                        ? 'text-gray-800'
                        : 'text-gray-800'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 max-w-3xl">
                  <div className="bg-pink-200 rounded-full px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#F55AFC] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#F55AFC] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#F55AFC] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-gray-700 text-sm">Escribiendo...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-black/30 p-6">
        <div className="container mx-auto max-w-4xl">
            {/* Cambiado a "items-end" para alinear el botón abajo */}
            <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
                <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje aquí..."
                disabled={isTyping}
                className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#f6e6c3] focus:ring-[#f6e6c3]/20 text-lg pr-14 resize-none" // Se quitó h-14 para que crezca solo y se añadió resize-none
                />
            </div>
            <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="h-14 w-14 bg-gradient-to-r from-[#C75AF6] to-[#F55AFC] hover:from-[#C75AF6]/80 hover:to-[#F55AFC]/80 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <Send className="h-5 w-5 text-white" />
            </Button>
            </div>
        </div>
        </div>
      </div>
    </main>
  );
} 