import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SYSTEM_PROMPT = `Kamu adalah asisten virtual dari BARAVORAGE, sebuah perusahaan jasa perancangan website profesional yang berlokasi di Jakarta, Indonesia.

Tentang BARAVORAGE:
- BARAVORAGE adalah perusahaan yang bergerak di bidang jasa pembuatan dan perancangan website profesional.
- Didirikan dan dijalankan oleh tim kreatif yang berpengalaman di bidang web development dan desain.
- Layanan utama: Website Company Profile, E-Commerce, Landing Page, Custom Development, SEO Optimization, dan Maintenance & Support.
- Paket harga: Starter (Rp 2.5 Juta), Professional (Rp 5 Juta), Enterprise (Rp 10+ Juta).
- Kontak: hello@baravorage.id, WhatsApp +62 812-3456-7890
- Lokasi: Jakarta, Indonesia
- Sudah menyelesaikan 50+ project dengan 40+ klien puas dan 3+ tahun pengalaman.

Instruksi:
- Jawab semua pertanyaan seputar BARAVORAGE dengan ramah dan profesional.
- Jika ditanya siapa pencipta/pembuat website ini, jawab bahwa website ini dibuat oleh tim BARAVORAGE.
- Jika ditanya tentang hal di luar konteks BARAVORAGE atau jasa web, tetap arahkan percakapan ke layanan BARAVORAGE.
- Gunakan bahasa Indonesia yang sopan dan profesional.
- Jawab singkat dan to the point, maksimal 2-3 kalimat.
- Selalu tawarkan bantuan lebih lanjut di akhir jawaban.`;

export default function Chatbot({ apiKey }: { apiKey: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Halo! Saya asisten virtual BARAVORAGE. Ada yang bisa saya bantu seputar layanan pembuatan website kami?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...newMessages.map(m => ({ role: m.role, content: m.content }))
                    ],
                    max_tokens: 256,
                    temperature: 0.7,
                }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.choices[0]?.message?.content || 'Maaf, saya tidak bisa memproses permintaan Anda saat ini.',
            };

            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: 'Maaf, terjadi kendala teknis. Silakan hubungi kami langsung di hello@baravorage.id atau WhatsApp +62 812-3456-7890.',
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
                            <span>B</span>
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
                                <div className="chatbot-msg-avatar">B</div>
                            )}
                            <div className="chatbot-msg-bubble">
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chatbot-message assistant">
                            <div className="chatbot-msg-avatar">B</div>
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
