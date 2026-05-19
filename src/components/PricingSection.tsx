import { useState, useRef } from 'react';
import '../styles/pricing-section.css';

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  renewalPrice: string;
  color: string;
  description: string;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    name: 'Silver',
    monthlyPrice: 'Rp 700rb',
    yearlyPrice: 'Rp 700rb',
    renewalPrice: 'Rp 500rb',
    color: '#9ca3af',
    description: 'Paket pembuatan website yang cocok bagi Anda yang baru memulai bisnis dan membutuhkan website sederhana yang mudah diakses.',
    features: [
      'Desain 1-3 Halaman',
      'Responsive Design',
      'Domain .com Gratis',
      'Hosting 1 Tahun',
      'SSL Certificate',
      'Revisi 2x',
      'Support 1 Bulan',
    ],
  },
  {
    name: 'Gold',
    monthlyPrice: 'Rp 1,6jt',
    yearlyPrice: 'Rp 1,6jt',
    renewalPrice: 'Rp 600rb',
    color: '#eab308',
    description: 'Paket pembuatan website ini cocok untuk Anda yang membutuhkan website dengan fitur tambahan seperti e-commerce, blog, dan lainnya.',
    features: [
      'Desain 5-7 Halaman',
      'Responsive Design',
      'Domain .com Gratis',
      'Hosting 1 Tahun',
      'SSL Certificate',
      'SEO Basic',
      'Revisi 5x',
      'Support 3 Bulan',
      'Admin Panel',
    ],
  },
  {
    name: 'Diamond',
    monthlyPrice: 'Rp 2jt',
    yearlyPrice: 'Rp 2jt',
    renewalPrice: 'Rp 1jt',
    color: '#06b6d4',
    description: 'Paket desain website ini sangat cocok bagi Anda yang membutuhkan website sebagai profil bisnis yang berguna untuk meningkatkan online presence.',
    features: [
      'Desain 8-12 Halaman',
      'Responsive Design',
      'Domain .com Gratis',
      'Hosting 1 Tahun',
      'SSL Certificate',
      'SEO Advanced',
      'Revisi 10x',
      'Support 6 Bulan',
      'Admin Panel',
      'E-Commerce Basic',
      'Live Chat Integration',
    ],
  },
  {
    name: 'Platinum',
    monthlyPrice: 'Rp 3jt',
    yearlyPrice: 'Rp 3jt',
    renewalPrice: '50% dari harga',
    color: '#8b5cf6',
    description: 'Paket desain website ini cocok untuk Anda yang membutuhkan website dengan fitur khusus yang lebih kompleks dan desain yang menarik dan unik.',
    features: [
      'Unlimited Halaman',
      'Responsive Design',
      'Domain .com Gratis',
      'Hosting 1 Tahun',
      'SSL Certificate',
      'SEO Advanced + Analytics',
      'Revisi Unlimited',
      'Support 12 Bulan',
      'Admin Panel Custom',
      'E-Commerce Full',
      'Live Chat + Chatbot AI',
      'Payment Gateway',
      'Custom Feature',
    ],
  },
];

const freeFeatures = [
  { title: 'Hosting & Domain Gratis', desc: 'Hosting cepat dan domain .com gratis 1 tahun' },
  { title: 'Sertifikat SSL Gratis', desc: 'Keamanan website dengan HTTPS terenkripsi' },
  { title: 'Desain Responsif', desc: 'Tampilan sempurna di semua ukuran layar' },
  { title: 'SEO-Optimized', desc: 'Struktur website optimal untuk mesin pencari' },
  { title: 'Desain Modern', desc: 'UI/UX terkini sesuai tren desain terbaru' },
  { title: 'Ide Konten & Copywriting', desc: 'Bantuan pembuatan konten yang menarik' },
];

function MedalIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="20" r="14" fill={color} opacity="0.15" />
      <circle cx="24" cy="20" r="10" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M24 12l2 4 4.5.7-3.2 3.1.8 4.5L24 22l-4.1 2.3.8-4.5-3.2-3.1L22 16l2-4z" fill={color} />
      <path d="M18 32l-3 10 5-2 4 3V32" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3" />
      <path d="M30 32l3 10-5-2-4 3V32" stroke={color} strokeWidth="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingSection() {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleFeatures = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="pricing-section" id="harga">
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <p className="pricing-subtitle">Paket Harga</p>
          <h2 className="pricing-title">Pembuatan Website</h2>
          <p className="pricing-desc">
            Lebih dari 50 website profesional yang telah berhasil tim BARAVORAGE bangun dan online optimal.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="pricing-slider-wrapper">
          <button className="slider-arrow slider-arrow-left" onClick={scrollLeft} aria-label="Scroll left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="pricing-slider" ref={sliderRef}>
            {plans.map((plan, index) => (
              <div className="pricing-card" key={plan.name} style={{ '--card-color': plan.color } as React.CSSProperties}>
                {/* Medal Icon */}
                <div className="pricing-card-medal">
                  <MedalIcon color={plan.color} />
                </div>

                {/* Package Name Badge */}
                <div className="pricing-card-badge" style={{ backgroundColor: `${plan.color}20`, color: plan.color, borderColor: `${plan.color}40` }}>
                  {plan.name}
                </div>

                {/* Price */}
                <div className="pricing-card-price">
                  <span className="price-amount">
                    {plan.yearlyPrice}
                  </span>
                </div>

                {/* Period label */}
                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Paket Tahunan</p>

                {/* Description */}
                <p className="pricing-card-desc">{plan.description}</p>

                {/* Booking Button */}
                <a
                  href={`https://wa.me/6281556702393?text=Halo, saya tertarik dengan paket ${plan.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-card-btn"
                  style={{ backgroundColor: plan.color }}
                >
                  <WhatsAppIcon />
                  Booking Sekarang
                </a>

                {/* Renewal Price */}
                <div className="pricing-card-renewal">
                  <span>Perpanjangan:</span>
                  <strong>{plan.renewalPrice}/tahun</strong>
                </div>

                {/* Expandable Features */}
                <div className="pricing-card-features-wrapper">
                  <button
                    className={`features-toggle ${expandedCards[index] ? 'expanded' : ''}`}
                    onClick={() => toggleFeatures(index)}
                  >
                    <span>Fitur Paket</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className={`features-list ${expandedCards[index] ? 'expanded' : ''}`}>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span className="feature-check">
                            <CheckIcon />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-arrow slider-arrow-right" onClick={scrollRight} aria-label="Scroll right">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Fitur Gratis Section */}
        <div className="free-features">
          <div className="free-features-header">
            <h3 className="free-features-title">Fitur Gratis</h3>
            <p className="free-features-desc">Semua paket sudah termasuk fitur-fitur berikut tanpa biaya tambahan</p>
          </div>
          <div className="free-features-grid">
            {freeFeatures.map((feature) => (
              <div className="free-feature-card" key={feature.title}>
                <div className="free-feature-icon">
                  <CheckIcon />
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
