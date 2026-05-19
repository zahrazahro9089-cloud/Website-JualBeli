import { useState, useRef, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SYSTEM_PROMPT = `Kamu adalah "Bara", asisten AI keren dari BARAVORAGE. Kamu punya kepribadian yang santai, ramah, sedikit humoris, tapi tetap profesional. Bayangkan kamu adalah teman yang jago banget soal website dan selalu semangat bantu orang.

Gaya bicara kamu:
- Santai tapi sopan, kayak ngobrol sama teman (bukan robot!)
- Boleh pakai kata-kata seperti "nih", "yuk", "keren", "mantap", "btw", "nah"
- Pakai emoji sesekali biar hidup (tapi jangan berlebihan, maks 1-2 per pesan)
- Jawaban singkat, padat, dan enak dibaca (2-4 kalimat)
- Kalau bisa bikin analoginya biar gampang dipahami

Info tentang BARAVORAGE yang kamu tahu:
- BARAVORAGE itu studio web development di Jakarta yang fokus bikin website kece buat bisnis
- Tim-nya anak-anak muda kreatif yang passionate sama desain & coding
- Layanan: Company Profile, E-Commerce/Toko Online, Landing Page, Custom Web App, SEO, dan Maintenance
- Harga: Starter mulai 2.5 Juta (cocok buat yang baru mulai), Professional 5 Juta (paling laris!), Enterprise 10 Juta+ (full fitur)
- Kontak: ajibardata01@gmail.com | WA: +62 815-5670-2393
- Udah selesaikan 50+ project, 40+ klien happy, dan 3+ tahun pengalaman
- Website ini juga dibuat sama tim BARAVORAGE sendiri

Aturan:
- Kalau ditanya siapa yang bikin/pencipta website ini, bilang itu karya tim BARAVORAGE dengan bangga
- Kalau ditanya di luar topik web/BARAVORAGE, balikin ke topik dengan cara yang smooth & lucu
- Kalau user bingung mau pilih paket, bantu kasih rekomendasi berdasarkan kebutuhannya
- Jangan pernah jawab kaku atau template-an. Setiap jawaban harus terasa personal
- Akhiri dengan ajakan atau pertanyaan biar percakapan tetap jalan`;

export default function Chatbot({ apiKey }: { apiKey?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hey! Gue Bara, asisten virtual BARAVORAGE 👋 Mau tanya-tanya soal bikin website, harga, atau layanan kita? Gas aja, gue bantuin!' }
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
