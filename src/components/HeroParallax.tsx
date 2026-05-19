import { useEffect, useRef, useState } from 'react';

export default function HeroParallax() {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // === STARS ===
        const starsContainer = document.getElementById('stars-container');
        if (starsContainer && starsContainer.children.length === 0) {
            const count = window.innerWidth > 768 ? 60 : 30;
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 60}%`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                star.style.animationDuration = `${2 + Math.random() * 3}s`;
                const size = 1 + Math.random() * 2;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                starsContainer.appendChild(star);
            }
        }

        // === SCROLL PARALLAX ===
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    const hero = heroRef.current;
                    if (!hero) return;
                    const heroHeight = hero.offsetHeight;
                    if (scrollY > heroHeight * 1.5) { ticking = false; return; }

                    const progress = Math.min(scrollY / heroHeight, 1);
                    setScrollProgress(progress);

                    // Multi-layer parallax
                    const layers = hero.querySelectorAll<HTMLElement>('.parallax-layer[data-speed]');
                    layers.forEach(layer => {
                        const speed = parseFloat(layer.dataset.speed || '0');
                        layer.style.transform = `translate3d(0, ${-(scrollY * speed)}px, 0)`;
                    });

                    // Apple-style content fade
                    if (contentRef.current) {
                        const opacity = 1 - (progress * 1.5);
                        const scale = 1 - (progress * 0.08);
                        const translateY = scrollY * 0.35;
                        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${Math.max(0.92, scale)})`;
                        contentRef.current.style.opacity = `${Math.max(0, opacity)}`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        // === MOUSE PARALLAX ===
        const handleMouseMove = (e: MouseEvent) => {
            const hero = heroRef.current;
            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Move mountains slightly
            const mountains = hero.querySelectorAll<HTMLElement>('.mountain-layer');
            mountains.forEach((m, i) => {
                const depth = (i + 1) * 5;
                m.style.transform = `translate(${x * depth}px, ${y * depth * 0.5}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        heroRef.current?.addEventListener('mousemove', handleMouseMove);

        // Text reveal
        setTimeout(() => {
            const lines = document.querySelectorAll<HTMLElement>('.title-line');
            lines.forEach((line, i) => {
                setTimeout(() => line.classList.add('revealed'), i * 200);
            });
        }, 500);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Counter animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        const targets = { projects: 50, clients: 40, years: 3 };
                        const duration = 2000;
                        const start = performance.now();
                        const animate = (now: number) => {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            setCounters({
                                projects: Math.floor(targets.projects * eased),
                                clients: Math.floor(targets.clients * eased),
                                years: Math.floor(targets.years * eased),
                            });
                            if (progress < 1) requestAnimationFrame(animate);
                        };
                        requestAnimationFrame(animate);
                    }
                });
            },
            { threshold: 0.5 }
        );
        const statsEl = document.getElementById('hero-stats');
        if (statsEl) observer.observe(statsEl);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section className="hero-parallax" id="beranda" ref={heroRef}>
            {/* Sky gradient */}
            <div className="parallax-layer sky-layer" data-speed="0.05"></div>

            {/* Stars */}
            <div className="parallax-layer stars-layer" data-speed="0.08" id="stars-container"></div>

            {/* Aurora Borealis */}
            <div className="parallax-layer aurora-layer" data-speed="0.06">
                <div className="aurora">
                    <div className="aurora-band aurora-band-1"></div>
                    <div className="aurora-band aurora-band-2"></div>
                    <div className="aurora-band aurora-band-3"></div>
                    <div className="aurora-band aurora-band-4"></div>
                </div>
                <div className="aurora-shimmer"></div>
            </div>

            {/* Moon */}
            <div className="parallax-layer moon-layer" data-speed="0.12">
                <div className="moon"></div>
            </div>

            {/* Mountains back */}
            <div className="parallax-layer mountains-back" data-speed="0.15">
                <div className="mountain-layer mountain-far"></div>
            </div>

            {/* Mountains mid */}
            <div className="parallax-layer mountains-mid" data-speed="0.25">
                <div className="mountain-layer mountain-mid"></div>
            </div>

            {/* Lighthouse + beam */}
            <div className="parallax-layer lighthouse-layer" data-speed="0.3">
                <div className="lighthouse">
                    <div className="lighthouse-tower"></div>
                    <div className="lighthouse-top"></div>
                    <div className="lighthouse-light"></div>
                    <div className="lighthouse-beam"></div>
                    <div className="lighthouse-beam beam-2"></div>
                </div>
            </div>

            {/* Mountains front */}
            <div className="parallax-layer mountains-front" data-speed="0.4">
                <div className="mountain-layer mountain-front"></div>
            </div>

            {/* Fog/mist */}
            <div className="parallax-layer fog-layer" data-speed="0.1"></div>

            {/* Content */}
            <div className="hero-content-wrapper" ref={contentRef}>
                <div className="container">
                    <div className="hero-content hero-content-center">
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            BARAVORAGE — Website Designer
                        </div>
                        <h1 className="hero-title">
                            <span className="title-line title-reveal">Wujudkan Website</span>
                            <span className="title-line title-reveal title-highlight">Impian Bisnis Anda</span>
                            <span className="title-line title-reveal">Mulai Hari Ini</span>
                        </h1>
                        <p className="hero-description">
                            Buat kehadiran digital yang powerful. BARAVORAGE merancang website profesional yang mengubah pengunjung menjadi pelanggan — cepat, modern, dan hasil nyata.
                        </p>
                        <div className="hero-buttons">
                            <a href="/harga" className="btn btn-primary">
                                <span>Lihat Paket & Harga</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                            <a href="https://wa.me/6281556702393?text=Halo BARAVORAGE, saya ingin konsultasi pembuatan website" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Konsultasi Gratis</a>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="container">
                    <div className="hero-stats" id="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number-wrap">
                                <span className="stat-number">{counters.projects}</span>
                                <span className="stat-suffix">+</span>
                            </div>
                            <span className="stat-label">Project Selesai</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number-wrap">
                                <span className="stat-number">{counters.clients}</span>
                                <span className="stat-suffix">+</span>
                            </div>
                            <span className="stat-label">Klien Puas</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number-wrap">
                                <span className="stat-number">{counters.years}</span>
                                <span className="stat-suffix">+</span>
                            </div>
                            <span className="stat-label">Tahun Pengalaman</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
                <span>Scroll Down</span>
            </div>

            {/* Progress bar */}
            <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }}></div>
        </section>
    );
}
