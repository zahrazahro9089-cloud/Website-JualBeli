import { useEffect, useRef, useState } from 'react';

// Daftar musik yang bisa diputar
const MUSIC_TRACKS = [
    { name: 'Lo-Fi Chill', url: '/music/lofi-chill.mp3' },
    { name: 'Ambient', url: '/music/ambient.mp3' },
    { name: 'Electronic', url: '/music/electronic.mp3' },
];

export default function AudioSpectrum() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [showTrackList, setShowTrackList] = useState(false);

    const setupAudio = () => {
        if (audioContextRef.current) return; // Already setup

        const audio = audioRef.current;
        if (!audio) return;

        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audio);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.8;

        source.connect(analyser);
        analyser.connect(audioContext.destination); // Output to speakers

        audioContextRef.current = audioContext;
        sourceRef.current = source;
        analyserRef.current = analyser;
    };

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!audioContextRef.current) {
            setupAudio();
        }

        // Resume AudioContext if suspended (browser policy)
        if (audioContextRef.current?.state === 'suspended') {
            audioContextRef.current.resume();
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        } else {
            audio.play();
            setIsPlaying(true);
            visualize();
        }
    };

    const changeTrack = (index: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        setCurrentTrack(index);
        audio.src = MUSIC_TRACKS[index].url;
        setShowTrackList(false);

        if (isPlaying) {
            audio.play();
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

                // Gradient color from accent to accent-light (purple range)
                const hue = 260 + (i / bufferLength) * 30;
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
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            audioRef.current?.pause();
            audioContextRef.current?.close();
        };
    }, []);

    return (
        <div className={`audio-spectrum-container ${isPlaying ? 'active' : ''}`}>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src={MUSIC_TRACKS[currentTrack].url}
                loop
                preload="auto"
                onEnded={() => {
                    // Auto next track
                    const next = (currentTrack + 1) % MUSIC_TRACKS.length;
                    changeTrack(next);
                }}
            />

            <canvas ref={canvasRef} className="audio-spectrum-canvas" />

            {/* Controls */}
            <div className="audio-spectrum-controls">
                {/* Track name */}
                {isPlaying && (
                    <span className="audio-spectrum-track-name">
                        {MUSIC_TRACKS[currentTrack].name}
                    </span>
                )}

                {/* Track list dropdown */}
                {showTrackList && (
                    <div className="audio-spectrum-tracklist">
                        {MUSIC_TRACKS.map((track, i) => (
                            <button
                                key={i}
                                className={`audio-spectrum-track-item ${i === currentTrack ? 'active' : ''}`}
                                onClick={() => changeTrack(i)}
                            >
                                {track.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Track selector button */}
                <button
                    className="audio-spectrum-btn track-btn"
                    onClick={() => setShowTrackList(!showTrackList)}
                    title="Pilih musik"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                </button>

                {/* Play/Pause button */}
                <button
                    className={`audio-spectrum-btn play-btn ${isPlaying ? 'active' : ''}`}
                    onClick={togglePlay}
                    title={isPlaying ? 'Pause musik' : 'Play musik'}
                >
                    {isPlaying ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
