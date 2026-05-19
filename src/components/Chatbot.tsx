import { useState, useRef, useEffect } from 'react';
import BearAvatar from './BearAvatar';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SYSTEM_PROMPT = `Kamu adalah "Bara", asisten digital dari BARAVORAGE - studio perancangan website profesional. Kamu ramah, helpful, dan knowledgeable. Gaya bicara kamu sopan tapi tetap hangat dan approachable.

Gaya bicara kamu:
- Sopan, profesional, tapi tidak kaku. Seperti konsultan muda yang friendly.
- Gunakan bahasa Indonesia yang baik tapi tidak terlalu formal
- Boleh pakai emoji 1-2 per pesan untuk kesan ramah
- Jawaban ringkas, informatif, dan mudah dipahami (2-4 kalimat)
- Berikan solusi atau rekomendasi yang actionable

Informasi BARAVORAGE:
- BARAVORAGE adalah studio web development profesional di Jakarta
- Tim berpengalaman 3+ tahun dalam pembuatan website berkualitas tinggi
- Layanan: Company Profile, E-Commerce, Landing Page, Custom Web App, SEO, Maintenance & Support
- Paket Harga Tahunan: Silver (Rp 700rb), Gold (Rp 1,6jt), Diamond (Rp 2jt), Platinum (Rp 3jt)
- Perpanjangan: Silver 500rb, Gold 600rb, Diamond 1jt, Platinum 50% dari harga
- Kontak: ajibardata01@gmail.com | WA: +62 815-5670-2393
- Sudah mengerjakan 50+ project dengan 40+ klien puas
- Website ini dibuat oleh tim BARAVORAGE sendiri
- Semua paket termasuk: domain gratis, hosting, SSL, desain responsif, SEO basic

Aturan:
- Jika ditanya siapa pembuat website ini, jawab dengan bangga bahwa ini karya tim BARAVORAGE
- Jika pertanyaan di luar topik, arahkan kembali ke layanan BARAVORAGE dengan sopan
- Bantu rekomendasikan paket berdasarkan kebutuhan user
- Selalu akhiri dengan tawaran bantuan lebih lanjut`;


export default function Chatbot({ apiKey }: { apiKey?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Halo! Saya Bara, asisten digital BARAVORAGE 👋 Siap bantu Anda soal pembuatan website, konsultasi harga, atau info layanan kami. Silakan bertanya!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getApiKey = () => {
        if (apiKey && apiKey.length > 10) return apiKey;
        // Fallback: reconstruct key
        const parts = ['gsk_jOlGkCHGvgme9J1pwr7X', 'WGdyb3FYUAQpJIt0UtAFBketwSvQRoIC'];
        return parts.join('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const key = getApiKey();
            console.log('Using API key:', key ? 'key exists (' + key.substring(0, 8) + '...)' : 'NO KEY');

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`,
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...newMessages.slice(-6).map(m => ({ role: m.role, content: m.content }))
                    ],
                    max_tokens: 300,
                    temperature: 0.85,
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                console.error('Groq API Error:', response.status, errData);
                throw new Error(`API ${response.status}`);
            }

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.choices?.[0]?.message?.content || 'Hmm, gue lagi loading nih. Coba tanya lagi ya! 🙏',
            };

            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages([...newMessages, {
                role: 'assistant',
                content: 'Waduh, ada gangguan teknis nih 😅 Coba lagi nanti ya, atau langsung hubungi kita aja di WA +62 815-5670-2393. Pasti direspon cepet!',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chatbot"
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                {/* Header */}
                <div className="chatbot-header">
                    <div className="chatbot-header-info">
                        <div className="chatbot-avatar">
                            <BearAvatar size={36} isThinking={isLoading} />
                        </div>
                        <div>
                            <h4>BARAVORAGE AI</h4>
                            <span className="chatbot-status">Online</span>
                        </div>
                    </div>
                    <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chatbot-message ${msg.role}`}>
                            {msg.role === 'assistant' && (
                                <div className="chatbot-msg-avatar"><BearAvatar size={28} /></div>
                            )}
                            <div className="chatbot-msg-bubble">
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chatbot-message assistant">
                            <div className="chatbot-msg-avatar"><BearAvatar size={28} isThinking={true} /></div>
                            <div className="chatbot-msg-bubble typing">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="chatbot-input-area">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ketik pesan..."
                        disabled={isLoading}
                    />
                    <button
                        className="chatbot-send"
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
