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

    // Mouse tracking - panda looks at cursor
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
            const happyInterval = setInterval(() => {
                setExpression('happy');
                setTimeout(() => setExpression('normal'), 1500);
            }, 8000 + Math.random() * 4000);
            return () => clearInterval(happyInterval);
        }
    }, [isThinking]);

    const eyeHeight = blink ? 0.5 : 5;
    const eyeRy = blink ? 0.3 : 3;
    const mouthPath = expression === 'happy'
        ? 'M 44 62 Q 50 68 56 62'
        : expression === 'surprised'
        ? 'M 47 62 Q 50 60 53 62 Q 50 66 47 62'
        : 'M 46 62 Q 50 65 54 62';

    return (
        <svg
            ref={bearRef}
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="bear-avatar"
            style={{ display: 'block' }}
        >
            {/* Ears - black */}
            <circle cx="26" cy="20" r="15" fill="#1a1a1a" />
            <circle cx="26" cy="20" r="9" fill="#333" />
            <circle cx="74" cy="20" r="15" fill="#1a1a1a" />
            <circle cx="74" cy="20" r="9" fill="#333" />

            {/* Head - white */}
            <ellipse cx="50" cy="52" rx="36" ry="38" fill="#ffffff" />
            <ellipse cx="50" cy="52" rx="36" ry="38" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />

            {/* Eye patches - black */}
            <ellipse cx="36" cy="44" rx="12" ry="10" fill="#1a1a1a" transform="rotate(-5 36 44)" />
            <ellipse cx="64" cy="44" rx="12" ry="10" fill="#1a1a1a" transform="rotate(5 64 44)" />

            {/* Eyes - white pupils inside black patches */}
            <g style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: 'transform 0.15s ease-out' }}>
                {/* Left eye */}
                <ellipse cx="36" cy="44" rx="4" ry={eyeRy} fill="#ffffff" style={{ transition: 'ry 0.1s' }}>
                    {isThinking && <animateTransform attributeName="transform" type="rotate" values="0 36 44;5 36 44;-5 36 44;0 36 44" dur="2s" repeatCount="indefinite" />}
                </ellipse>
                {!blink && <circle cx="35" cy="43" r="1.5" fill="#fff" opacity="0.6" />}

                {/* Right eye */}
                <ellipse cx="64" cy="44" rx="4" ry={eyeRy} fill="#ffffff" style={{ transition: 'ry 0.1s' }}>
                    {isThinking && <animateTransform attributeName="transform" type="rotate" values="0 64 44;-5 64 44;5 64 44;0 64 44" dur="2s" repeatCount="indefinite" />}
                </ellipse>
                {!blink && <circle cx="63" cy="43" r="1.5" fill="#fff" opacity="0.6" />}
            </g>

            {/* Eyebrows when surprised */}
            {expression === 'surprised' && (
                <>
                    <line x1="30" y1="32" x2="42" y2="33" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                    <line x1="58" y1="33" x2="70" y2="32" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                </>
            )}

            {/* Nose - black oval */}
            <ellipse cx="50" cy="55" rx="6" ry="4" fill="#1a1a1a" />
            {/* Nose shine */}
            <ellipse cx="48" cy="54" rx="2" ry="1.2" fill="#444" opacity="0.5" />

            {/* Mouth */}
            <path d={mouthPath} fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" style={{ transition: 'd 0.3s' }} />

            {/* Blush when happy */}
            {expression === 'happy' && (
                <>
                    <circle cx="28" cy="56" r="5" fill="#ffb3b3" opacity="0.4" />
                    <circle cx="72" cy="56" r="5" fill="#ffb3b3" opacity="0.4" />
                </>
            )}

            {/* Thinking bubbles */}
            {isThinking && (
                <g>
                    <circle cx="76" cy="26" r="2.5" fill="#ccc" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values="26;22;26" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="82" cy="18" r="1.8" fill="#ccc" opacity="0.4">
                        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
                        <animate attributeName="cy" values="18;14;18" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                </g>
            )}
        </svg>
    );
}
