import { useEffect, useRef, useState } from 'react';

export default function AudioSpectrum() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);

    const startAudioCapture = async () => {
        if (isActive || isConnecting) return;
        setIsConnecting(true);

        try {
            // Request system audio via getDisplayMedia
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true, // Required by some browsers
                audio: true, // Capture system audio
            });

            streamRef.current = stream;

            // Check if audio track exists
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length === 0) {
                // Try getUserMedia as fallback (microphone)
                const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = micStream;
                setupAudioAnalyser(micStream);
            } else {
                // Stop video track (we only need audio)
                stream.getVideoTracks().forEach(track => track.stop());
                setupAudioAnalyser(stream);
            }

            setIsActive(true);
        } catch (error) {
            console.log('Audio capture cancelled or failed:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    const setupAudioAnalyser = (stream: MediaStream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.8;

        source.connect(analyser);
        analyserRef.current = analyser;

        // Start visualization
        visualize();

        // Handle stream end
        stream.getAudioTracks()[0].addEventListener('ended', () => {
            stopAudioCapture();
        });
    };

    const stopAudioCapture = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        analyserRef.current = null;
        setIsActive(false);

        // Clear canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const visualize = () => {
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;
        if (!canvas || !analyser) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            // Set canvas size to match display
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            ctx.clearRect(0, 0, rect.width, rect.height);

            const barWidth = rect.width / bufferLength;
            const maxBarHeight = rect.height;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * maxBarHeight;

                // Gradient color from accent to accent-light
                const hue = 260 + (i / bufferLength) * 30; // Purple range
                const lightness = 50 + (dataArray[i] / 255) * 20;
                const alpha = 0.6 + (dataArray[i] / 255) * 0.4;

                ctx.fillStyle = `hsla(${hue}, 70%, ${lightness}%, ${alpha})`;

                // Draw bars going downward from top
                const x = i * barWidth;
                ctx.fillRect(x, 0, barWidth - 1, barHeight);

                // Add glow effect for active bars
                if (dataArray[i] > 100) {
                    ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
                    ctx.shadowBlur = 4;
                    ctx.fillRect(x, 0, barWidth - 1, barHeight);
                    ctx.shadowBlur = 0;
                }
            }
        };

        draw();
    };

    useEffect(() => {
        return () => {
            stopAudioCapture();
        };
    }, []);

    return (
        <div className={`audio-spectrum-container ${isActive ? 'active' : ''}`}>
            <canvas ref={canvasRef} className="audio-spectrum-canvas" />
            <button
                className={`audio-spectrum-btn ${isActive ? 'active' : ''} ${isConnecting ? 'connecting' : ''}`}
                onClick={isActive ? stopAudioCapture : startAudioCapture}
                title={isActive ? 'Stop audio visualizer' : 'Start audio visualizer (capture system audio)'}
            >
                {isConnecting ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                ) : isActive ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                )}
            </button>
        </div>
    );
}
