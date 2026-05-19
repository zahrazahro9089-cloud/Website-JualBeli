import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const AUTO_RESPONSES: Record<string, string> = {
  halo: 'Halo! Selamat datang di BARAVORAGE. Ada yang bisa saya bantu?',
  hai: 'Hai! Selamat datang. Bagaimana saya bisa membantu Anda hari ini?',
  harga: 'Kami memiliki beberapa paket harga. Silakan scroll ke bagian Harga atau ketik "paket" untuk info lebih lanjut.',
  paket: 'Kami menyediakan paket Starter (Rp 1.5jt), Professional (Rp 3.5jt), dan Enterprise (custom). Mau tahu detail lebih lanjut?',
  layanan: 'Kami menyediakan jasa pembuatan website profesional, UI/UX Design, dan SEO Optimization.',
  kontak: 'Anda bisa menghubungi kami melalui email atau form kontak di bagian bawah website.',
  portfolio: 'Silakan lihat portfolio kami di bagian Portfolio website ini.',
  default: 'Terima kasih atas pertanyaannya! Tim kami akan segera membantu. Ketik "harga", "layanan", atau "kontak" untuk info cepat.',
};

function getResponse(message: string): string {
  const lower = message.toLowerCase().trim();
  for (const key of Object.keys(AUTO_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) {
      return AUTO_RESPONSES[key];
    }
  }
  return AUTO_RESPONSES.default;
}

// NCS-style Spectrum Visualizer Component
function SpectrumVisualizer({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barsRef = useRef<number[]>(Array(32).fill(0));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const bars = barsRef.current;
    const barCount = bars.length;
    const barWidth = width / barCount - 2;

    // Get frequency data if analyser exists
    if (analyserRef.current && isActive) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Map frequency data to our bars
      const step = Math.floor(dataArray.length / barCount);
      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * step] / 255;
        bars[i] = bars[i] * 0.7 + value * 0.3; // Smooth transition
      }
    } else if (isActive) {
      // Simulated spectrum when no audio source (demo mode)
      const time = Date.now() / 1000;
      for (let i = 0; i < barCount; i++) {
        const wave1 = Math.sin(time * 2 + i * 0.3) * 0.3;
        const wave2 = Math.sin(time * 3.5 + i * 0.5) * 0.2;
        const wave3 = Math.sin(time * 1.2 + i * 0.8) * 0.25;
        const base = 0.15 + Math.random() * 0.05;
        bars[i] = bars[i] * 0.85 + (base + wave1 + wave2 + wave3) * 0.15;
        bars[i] = Math.max(0.02, Math.min(1, bars[i]));
      }
    } else {
      // Fade out when inactive
      for (let i = 0; i < barCount; i++) {
        bars[i] *= 0.92;
      }
    }

    // Draw bars with NCS-style gradient
    for (let i = 0; i < barCount; i++) {
      const barHeight = bars[i] * height * 0.9;
      const x = i * (barWidth + 2);
      const y = height - barHeight;

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(x, height, x, y);
      gradient.addColorStop(0, '#6c5ce7');
      gradient.addColorStop(0.5, '#a29bfe');
      gradient.addColorStop(1, '#00cec9');

      ctx.fillStyle = gradient;
      ctx.shadowColor = '#6c5ce7';
      ctx.shadowBlur = isActive ? 8 : 0;

      // Rounded top bars
      const radius = barWidth / 2;
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, height);
      ctx.closePath();
      ctx.fill();
    }

    // Mirror reflection (subtle)
    ctx.globalAlpha = 0.15;
    ctx.scale(1, -1);
    ctx.translate(0, -height * 2);
    for (let i = 0; i < barCount; i++) {
      const barHeight = bars[i] * height * 0.3;
      const x = i * (barWidth + 2);
      const y = height - barHeight;

      const gradient = ctx.createLinearGradient(x, height, x, y);
      gradient.addColorStop(0, '#6c5ce7');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;

    animationRef.current = requestAnimationFrame(draw);
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    canvas.width = rect.width;
    canvas.height = rect.height;

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  // Handle audio context for microphone input (optional enhancement)
  useEffect(() => {
    if (isActive && !analyserRef.current) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.8;
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
      } catch (e) {
        // Fallback to simulated spectrum
        console.log('Audio API not available, using simulated spectrum');
      }
    }

    return () => {
      if (!isActive && audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
      }
    };
  }, [isActive]);

  return (
    <div className={`spectrum-container ${isActive ? 'active' : ''}`}>
      <canvas
        ref={canvasRef}
        className="spectrum-canvas"
        style={{ width: '100%', height: '60px' }}
      />
    </div>
  );
}

// Main Chatbot Component
export default function ChatbotWithSpectrum() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Halo! Selamat datang di BARAVORAGE. Ada yang bisa saya bantu?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [spectrumActive, setSpectrumActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Bot response with delay
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getResponse(userMsg.text),
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h4>BARAVORAGE Bot</h4>
              <span className="chatbot-status">Online</span>
            </div>
          </div>
          <button
            className={`spectrum-toggle ${spectrumActive ? 'active' : ''}`}
            onClick={() => setSpectrumActive(!spectrumActive)}
            title={spectrumActive ? 'Matikan Spectrum' : 'Nyalakan Spectrum'}
            aria-label="Toggle music spectrum"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="6" width="3" height="12" rx="1" />
              <rect x="6" y="3" width="3" height="18" rx="1" />
              <rect x="11" y="8" width="3" height="8" rx="1" />
              <rect x="16" y="4" width="3" height="16" rx="1" />
              <rect x="21" y="9" width="3" height="6" rx="1" />
            </svg>
          </button>
        </div>

        {/* Spectrum Visualizer */}
        <SpectrumVisualizer isActive={spectrumActive} />

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan..."
            className="chatbot-input"
          />
          <button onClick={sendMessage} className="chatbot-send" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
