import { useEffect, useRef, useState } from 'react';

export default function HeroParallax() {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const shapesRef = useRef<HTMLDivElement>(null);
    const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        // Create particles
        const particlesContainer = document.getElementById('particles-container');
        if (particlesContainer && particlesContainer.children.length === 0) {
            const count = window.innerWidth > 768 ? 35 : 15;
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 4}s`;
                particle.style.animationDuration = `${2 + Math.random() * 4}s`;
                const size = 2 + Math.random() * 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particlesContainer.appendChild(particle);
            }
        }

        // Scroll parallax
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    const hero = heroRef.current;
                    if (!hero) return;
                    const heroHeight = hero.offsetHeight;
                    if (scrollY > heroHeight) { ticking = false; return; }

                    // Move layers at different speeds
                    const layers = hero.querySelectorAll<HTMLElement>('.parallax-layer[data-speed]');
                    layers.forEach(layer => {
                        const speed = parseFloat(layer.dataset.speed || '0');
                        layer.style.transform = `translate3d(0, ${-(scrollY * speed)}px, 0)`;
                    });

                    // Fade content
                    if (contentRef.current) {
                        const opacity = 1 - (scrollY / (heroHeight * 0.6));
                        const translateY = scrollY * 0.3;
                        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
                        contentRef.current.style.opacity = `${Math.max(0, opacity)}`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        // Mouse parallax on shapes
        const handleMouseMove = (e: MouseEvent) => {
            const hero = heroRef.current;
            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const shapes = shapesRef.current?.querySelectorAll<HTMLElement>('.shape');
            shapes?.forEach((shape, index) => {
                const depth = (index + 1) * 10;
                shape.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        heroRef.current?.addEventListener('mousemove', handleMouseMove);

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
            {/* Parallax Background Layers */}
            <div className="parallax-layer parallax-bg" data-speed="0.2"></div>
            <div className="parallax-layer parallax-gradient" data-speed="0.1"></div>
            <div className="parallax-layer parallax-grid" data-speed="0.15"></div>
            <div className="parallax-layer parallax-shapes" data-speed="0.5" ref={shapesRef}>
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
                <div className="shape shape-6"></div>
                <div className="shape shape-7"></div>
            </div>
            <div className="parallax-layer parallax-particles" data-speed="0.6" id="particles-container"></div>

            {/* Hero Content */}
            <div className="hero-content-wrapper" ref={contentRef}>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Jasa Perancangan Website Premium
                        </div>
                        <h1 className="hero-title">
                            <span className="title-line">Kami Merancang</span>
                            <span className="title-line title-highlight">Website Masa Depan</span>
                            <span className="title-line">untuk Bisnis Anda</span>
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

                    {/* Stats */}
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
                <div className="scroll-line"></div>
                <span>Scroll</span>
            </div>
        </section>
    );
}
