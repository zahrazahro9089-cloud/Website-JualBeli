import { useEffect, useRef, useState } from 'react';

export default function HeroParallax() {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // === PARTICLES ===
        const particlesContainer = document.getElementById('particles-container');
        if (particlesContainer && particlesContainer.children.length === 0) {
            const count = window.innerWidth > 768 ? 40 : 18;
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                particle.style.animationDuration = `${3 + Math.random() * 4}s`;
                const size = 2 + Math.random() * 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particlesContainer.appendChild(particle);
            }
        }

        // === SCROLL PARALLAX (Apple-style + Nature Parallax) ===
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

                    // Multi-layer nature parallax
                    const layers = hero.querySelectorAll<HTMLElement>('.parallax-layer[data-speed]');
                    layers.forEach(layer => {
                        const speed = parseFloat(layer.dataset.speed || '0');
                        layer.style.transform = `translate3d(0, ${-(scrollY * speed)}px, 0)`;
                    });

                    // Apple-style content fade + scale
                    if (contentRef.current) {
                        const opacity = 1 - (progress * 1.5);
                        const scale = 1 - (progress * 0.1);
                        const translateY = scrollY * 0.4;
                        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${Math.max(0.9, scale)})`;
                        contentRef.current.style.opacity = `${Math.max(0, opacity)}`;
                    }

                    // Text reveal lines
                    const titleLines = hero.querySelectorAll<HTMLElement>('.title-line');
                    titleLines.forEach((line, i) => {
                        const lineProgress = Math.max(0, Math.min(1, (scrollY - i * 30) / 100));
                        line.style.transform = `translate3d(0, ${lineProgress * -8}px, 0)`;
                        line.style.opacity = `${1 - lineProgress * 0.5}`;
                    });

                    ticking = false;
                });
                ticking = true;
            }
        };

        // === 3D TILT EFFECT ===
        const handleMouseMove = (e: MouseEvent) => {
            const hero = heroRef.current;
            const card = cardRef.current;
            if (!hero) return;

            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Tilt floating shapes
            const shapes = hero.querySelectorAll<HTMLElement>('.shape');
            shapes.forEach((shape, index) => {
                const depth = (index + 1) * 12;
                const rotateX = y * 5;
                const rotateY = -x * 5;
                shape.style.transform = `translate(${x * depth}px, ${y * depth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // 3D tilt on hero card/content
            if (card) {
                const tiltX = y * -8;
                const tiltY = x * 8;
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }
        };

        const handleMouseLeave = () => {
            if (cardRef.current) {
                cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
            const shapes = heroRef.current?.querySelectorAll<HTMLElement>('.shape');
            shapes?.forEach(shape => {
                shape.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg)';
            });
        };

        window.addEventListener('scroll', handleScroll);
        heroRef.current?.addEventListener('mousemove', handleMouseMove);
        heroRef.current?.addEventListener('mouseleave', handleMouseLeave);

        // Initial text reveal animation
        setTimeout(() => {
            const lines = document.querySelectorAll<HTMLElement>('.title-line');
            lines.forEach((line, i) => {
                setTimeout(() => {
                    line.classList.add('revealed');
                }, i * 200);
            });
        }, 300);

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
                        animateCounters();
                    }
                });
            },
            { threshold: 0.5 }
        );

        const statsEl = document.getElementById('hero-stats');
        if (statsEl) observer.observe(statsEl);
        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCounters = () => {
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
    };

    return (
        <section className="hero-parallax" id="beranda" ref={heroRef}>
            {/* === NATURE PARALLAX LAYERS === */}
            <div className="parallax-layer parallax-mountain-back" data-speed="0.1"></div>
            <div className="parallax-layer parallax-mountain-mid" data-speed="0.25"></div>
            <div className="parallax-layer parallax-overlay" data-speed="0.05"></div>
            <div className="parallax-layer parallax-grid-pattern" data-speed="0.15"></div>

            {/* Floating 3D Shapes */}
            <div className="parallax-layer parallax-shapes" data-speed="0.4">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
                <div className="shape shape-ring"></div>
            </div>

            {/* Particles */}
            <div className="parallax-layer parallax-particles" data-speed="0.5" id="particles-container"></div>

            {/* === HERO CONTENT with Apple-style fade === */}
            <div className="hero-content-wrapper" ref={contentRef}>
                <div className="container">
                    <div className="hero-content">
                        {/* Badge */}
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Jasa Perancangan Website Premium
                        </div>

                        {/* Text Reveal Title */}
                        <h1 className="hero-title">
                            <span className="title-line title-reveal">Kami Merancang</span>
                            <span className="title-line title-reveal title-highlight">Website Masa Depan</span>
                            <span className="title-line title-reveal">untuk Bisnis Anda</span>
                        </h1>

                        <p className="hero-description">
                            BARAVORAGE menghadirkan solusi digital yang memadukan estetika modern
                            dengan performa tinggi. Setiap pixel dirancang untuk memberikan pengalaman terbaik.
                        </p>

                        <div className="hero-buttons">
                            <a href="#portfolio" className="btn btn-primary">
                                <span>Lihat Portfolio</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                            <a href="#kontak" className="btn btn-outline">Hubungi Kami</a>
                        </div>
                    </div>

                    {/* 3D Tilt Card */}
                    <div className="hero-tilt-card" ref={cardRef}>
                        <div className="tilt-card-inner">
                            <div className="tilt-card-glow"></div>
                            <div className="tilt-card-content">
                                <div className="tilt-code-line"><span className="code-tag">&lt;div</span> <span className="code-attr">class</span>=<span className="code-val">"website"</span><span className="code-tag">&gt;</span></div>
                                <div className="tilt-code-line indent"><span className="code-tag">&lt;h1&gt;</span><span className="code-text">Your Brand</span><span className="code-tag">&lt;/h1&gt;</span></div>
                                <div className="tilt-code-line indent"><span className="code-tag">&lt;p&gt;</span><span className="code-text">Amazing Website</span><span className="code-tag">&lt;/p&gt;</span></div>
                                <div className="tilt-code-line"><span className="code-tag">&lt;/div&gt;</span></div>
                                <div className="tilt-card-cursor"></div>
                            </div>
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

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>

            {/* Apple-style scroll progress bar */}
            <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }}></div>
        </section>
    );
}
