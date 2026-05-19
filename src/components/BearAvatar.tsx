import { useEffect, useRef, useState } from 'react';

interface BearAvatarProps {
    size?: number;
    isThinking?: boolean;
}

export default function BearAvatar({ size = 36, isThinking = false }: BearAvatarProps) {
    const [blink, setBlink] = useState(false);
    const [look, setLook] = useState({ x: 0, y: 0 });
    const [expression, setExpression] = useState<'normal' | 'happy' | 'surprised'>('normal');
    const bearRef = useRef<SVGSVGElement>(null);

    // Random blinking
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 150);
        }, 2500 + Math.random() * 2000);

        return () => clearInterval(blinkInterval);
    }, []);

    // Mouse tracking - bear looks at cursor
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!bearRef.current) return;
            const rect = bearRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = (e.clientX - centerX) / 200;
            const dy = (e.clientY - centerY) / 200;
            setLook({
                x: Math.max(-3, Math.min(3, dx)),
                y: Math.max(-2, Math.min(2, dy))
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Expression changes
    useEffect(() => {
        if (isThinking) {
            setExpression('surprised');
        } else {
            setExpression('normal');
            // Randomly show happy face
            const happyInterval = setInterval(() => {
                setExpression('happy');
                setTimeout(() => setExpression('normal'), 1500);
            }, 8000 + Math.random() * 4000);
            return () => clearInterval(happyInterval);
        }
    }, [isThinking]);

    const eyeHeight = blink ? 0.5 : 4;
    const eyeRy = blink ? 0.3 : 2.5;
    const mouthPath = expression === 'happy'
        ? 'M 44 58 Q 50 64 56 58'
        : expression === 'surprised'
        ? 'M 47 58 Q 50 56 53 58 Q 50 62 47 58'
        : 'M 46 58 Q 50 61 54 58';

    return (
        <svg
            ref={bearRef}
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="bear-avatar"
            style={{ display: 'block' }}
        >
            {/* Ears */}
            <circle cx="28" cy="22" r="14" fill="#8B6914" />
            <circle cx="28" cy="22" r="8" fill="#D4A853" />
            <circle cx="72" cy="22" r="14" fill="#8B6914" />
            <circle cx="72" cy="22" r="8" fill="#D4A853" />

            {/* Head */}
            <ellipse cx="50" cy="52" rx="35" ry="38" fill="#C4892B" />

            {/* Face inner */}
            <ellipse cx="50" cy="56" rx="22" ry="20" fill="#E8C97A" />

            {/* Eyes */}
            <g style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: 'transform 0.15s ease-out' }}>
                {/* Left eye */}
                <ellipse cx="38" cy="45" rx="3" ry={eyeRy} fill="#1a1a1a" style={{ transition: 'ry 0.1s' }}>
                    {isThinking && <animateTransform attributeName="transform" type="rotate" values="0 38 45;5 38 45;-5 38 45;0 38 45" dur="2s" repeatCount="indefinite" />}
                </ellipse>
                {/* Eye shine */}
                {!blink && <circle cx="36.5" cy="43.5" r="1" fill="#fff" opacity="0.8" />}

                {/* Right eye */}
                <ellipse cx="62" cy="45" rx="3" ry={eyeRy} fill="#1a1a1a" style={{ transition: 'ry 0.1s' }}>
                    {isThinking && <animateTransform attributeName="transform" type="rotate" values="0 62 45;-5 62 45;5 62 45;0 62 45" dur="2s" repeatCount="indefinite" />}
                </ellipse>
                {/* Eye shine */}
                {!blink && <circle cx="60.5" cy="43.5" r="1" fill="#fff" opacity="0.8" />}
            </g>

            {/* Eyebrows */}
            {expression === 'surprised' && (
                <>
                    <line x1="34" y1="36" x2="42" y2="37" stroke="#6B4C11" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="58" y1="37" x2="66" y2="36" stroke="#6B4C11" strokeWidth="1.5" strokeLinecap="round" />
                </>
            )}

            {/* Nose */}
            <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#4A3000" />
            <ellipse cx="49" cy="52" rx="1.5" ry="1" fill="#7A5500" opacity="0.5" />

            {/* Mouth */}
            <path d={mouthPath} fill="none" stroke="#4A3000" strokeWidth="1.5" strokeLinecap="round" style={{ transition: 'd 0.3s' }} />

            {/* Blush */}
            {expression === 'happy' && (
                <>
                    <circle cx="30" cy="54" r="5" fill="#FF9999" opacity="0.3" />
                    <circle cx="70" cy="54" r="5" fill="#FF9999" opacity="0.3" />
                </>
            )}

            {/* Thinking animation */}
            {isThinking && (
                <g>
                    <circle cx="72" cy="28" r="2" fill="#aaa" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="28;24;28" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="78" cy="22" r="1.5" fill="#aaa" opacity="0.4">
                        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
                        <animate attributeName="cy" values="22;18;22" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                </g>
            )}
        </svg>
    );
}
