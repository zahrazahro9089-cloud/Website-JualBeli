import { useRef } from 'react';

const projects = [
  {
    name: "Toko Fashion Online",
    category: "E-Commerce",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    mockup: "ecommerce"
  },
  {
    name: "PT. Maju Bersama",
    category: "Company Profile",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    mockup: "company"
  },
  {
    name: "Resto Nusantara",
    category: "Landing Page",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    mockup: "restaurant"
  },
  {
    name: "Sistem Manajemen",
    category: "Web Application",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    mockup: "dashboard"
  },
  {
    name: "EduTech Indonesia",
    category: "Learning Platform",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    mockup: "education"
  },
  {
    name: "Klinik Sehat",
    category: "Booking System",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    mockup: "healthcare"
  },
];

function MockupContent({ type }: { type: string }) {
  switch (type) {
    case "ecommerce":
      return <EcommerceMockup />;
    case "company":
      return <CompanyMockup />;
    case "restaurant":
      return <RestaurantMockup />;
    case "dashboard":
      return <DashboardMockup />;
    case "education":
      return <EducationMockup />;
    case "healthcare":
      return <HealthcareMockup />;
    default:
      return null;
  }
}

function EcommerceMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      <div className="mockup-nav" style={{ background: '#667eea', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '9px' }}>FashionStore</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }}></div>
          <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }}></div>
          <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }}></div>
        </div>
      </div>
      <div style={{ padding: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', textAlign: 'center', color: '#fff' }}>
        <p style={{ fontSize: '7px', opacity: 0.8 }}>NEW COLLECTION</p>
        <h2 style={{ fontSize: '11px', margin: '4px 0' }}>Summer Fashion 2026</h2>
        <div style={{ width: '40px', height: '14px', background: '#fff', borderRadius: '3px', margin: '6px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '6px', color: '#667eea', fontWeight: 600 }}>Shop Now</span>
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>Produk Terlaris</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {['#f8e6ff', '#e6f0ff', '#fff3e6', '#e6ffe6'].map((bg, i) => (
            <div key={i} style={{ background: bg, borderRadius: '4px', padding: '8px', textAlign: 'center' }}>
              <div style={{ width: '24px', height: '24px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', margin: '0 auto 4px' }}></div>
              <p style={{ fontSize: '6px', color: '#333' }}>Product {i + 1}</p>
              <p style={{ fontSize: '6px', color: '#667eea', fontWeight: 600 }}>Rp 299K</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>Kategori</p>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {['Dress', 'Tops', 'Pants', 'Shoes', 'Bags'].map((cat) => (
            <span key={cat} style={{ fontSize: '5px', padding: '3px 6px', background: '#f3f0ff', borderRadius: '8px', color: '#667eea' }}>{cat}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>Flash Sale</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ background: '#fef3f3', borderRadius: '4px', padding: '6px', textAlign: 'center' }}>
              <div style={{ width: '18px', height: '18px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', margin: '0 auto 3px' }}></div>
              <p style={{ fontSize: '5px', color: '#e74c3c', fontWeight: 600 }}>-50%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompanyMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      <div className="mockup-nav" style={{ background: '#1a1a2e', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '9px' }}>MajuBersama</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '16px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}></div>
          <div style={{ width: '16px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}></div>
        </div>
      </div>
      <div style={{ padding: '16px 12px', background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '10px', marginBottom: '4px' }}>Inovasi untuk Indonesia</h2>
        <p style={{ fontSize: '6px', opacity: 0.8 }}>Solusi teknologi terdepan sejak 2015</p>
      </div>
      <div style={{ padding: '12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, textAlign: 'center', marginBottom: '8px', color: '#333' }}>Tentang Kami</p>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '4px', padding: '6px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#f5576c' }}>200+</p>
            <p style={{ fontSize: '5px', color: '#666' }}>Klien</p>
          </div>
          <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '4px', padding: '6px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#f5576c' }}>8+</p>
            <p style={{ fontSize: '5px', color: '#666' }}>Tahun</p>
          </div>
          <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '4px', padding: '6px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, color: '#f5576c' }}>50+</p>
            <p style={{ fontSize: '5px', color: '#666' }}>Tim</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, textAlign: 'center', marginBottom: '6px', color: '#333' }}>Layanan</p>
        {['Konsultasi IT', 'Pengembangan Software', 'Cloud Solutions'].map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 0', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: '12px', height: '12px', background: '#fff0f5', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '6px', color: '#333' }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 12px', background: '#f9f9f9' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, textAlign: 'center', marginBottom: '6px', color: '#333' }}>Klien Kami</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: '20px', height: '20px', background: '#e0e0e0', borderRadius: '4px' }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RestaurantMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      <div className="mockup-nav" style={{ background: '#0c2340', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#4facfe', fontWeight: 700, fontSize: '9px' }}>Nusantara</span>
        <div style={{ width: '14px', height: '14px', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%' }}></div>
      </div>
      <div style={{ padding: '20px 12px', background: 'linear-gradient(135deg, #4facfe, #00f2fe)', textAlign: 'center', color: '#fff' }}>
        <p style={{ fontSize: '6px', opacity: 0.8, letterSpacing: '1px' }}>AUTHENTIC</p>
        <h2 style={{ fontSize: '11px', margin: '3px 0' }}>Cita Rasa Nusantara</h2>
        <p style={{ fontSize: '6px', opacity: 0.7 }}>Masakan tradisional Indonesia</p>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, textAlign: 'center', marginBottom: '6px', color: '#333' }}>Menu Favorit</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {['Rendang', 'Nasi Goreng', 'Sate Ayam', 'Gado-gado'].map((menu) => (
            <div key={menu} style={{ background: '#f7fcff', borderRadius: '4px', padding: '8px', textAlign: 'center', border: '1px solid #e8f4ff' }}>
              <div style={{ width: '22px', height: '22px', background: '#e0f3ff', borderRadius: '50%', margin: '0 auto 4px' }}></div>
              <p style={{ fontSize: '6px', color: '#333', fontWeight: 500 }}>{menu}</p>
              <p style={{ fontSize: '5px', color: '#4facfe' }}>Rp 45K</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 12px', background: '#0c2340', color: '#fff' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, textAlign: 'center', marginBottom: '4px' }}>Reservasi</p>
        <p style={{ fontSize: '5px', textAlign: 'center', opacity: 0.7 }}>Buka setiap hari: 10:00 - 22:00</p>
        <div style={{ width: '50px', height: '14px', background: '#4facfe', borderRadius: '3px', margin: '6px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '5px', color: '#fff', fontWeight: 600 }}>Pesan Meja</span>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="mockup-page" style={{ background: '#f4f7fa' }}>
      <div className="mockup-nav" style={{ background: '#1a2332', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#43e97b', fontWeight: 700, fontSize: '8px' }}>Dashboard</span>
        <div style={{ width: '14px', height: '14px', background: '#2d3a4a', borderRadius: '50%' }}></div>
      </div>
      <div style={{ display: 'flex', minHeight: '200px' }}>
        <div style={{ width: '30px', background: '#1a2332', padding: '8px 4px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: '12px', height: '12px', background: i === 1 ? '#43e97b' : '#2d3a4a', borderRadius: '3px' }}></div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', marginBottom: '8px' }}>
            {[{ label: 'Revenue', val: '$12.4K', color: '#43e97b' }, { label: 'Users', val: '1,234', color: '#4facfe' }, { label: 'Orders', val: '847', color: '#f5576c' }].map((item) => (
              <div key={item.label} style={{ background: '#fff', borderRadius: '4px', padding: '6px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '5px', color: '#999' }}>{item.label}</p>
                <p style={{ fontSize: '8px', fontWeight: 700, color: item.color }}>{item.val}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: '4px', padding: '8px', marginBottom: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '6px', fontWeight: 600, color: '#333', marginBottom: '6px' }}>Analytics</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
              {[40, 65, 50, 80, 60, 90, 70, 85].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(to top, #43e97b, #38f9d7)`, borderRadius: '2px' }}></div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: '4px', padding: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '6px', fontWeight: 600, color: '#333', marginBottom: '4px' }}>Recent Activity</p>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 0', borderBottom: '1px solid #f5f5f5' }}>
                <div style={{ width: '8px', height: '8px', background: '#e8fff0', borderRadius: '50%' }}></div>
                <div style={{ flex: 1, height: '3px', background: '#f0f0f0', borderRadius: '2px' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      <div className="mockup-nav" style={{ background: '#2d1b69', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fee140', fontWeight: 700, fontSize: '9px' }}>EduTech</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '16px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}></div>
          <div style={{ width: '16px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}></div>
        </div>
      </div>
      <div style={{ padding: '14px 12px', background: 'linear-gradient(135deg, #fa709a, #fee140)', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '10px', marginBottom: '3px' }}>Belajar Tanpa Batas</h2>
        <p style={{ fontSize: '6px', opacity: 0.9 }}>500+ kursus online berkualitas</p>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>Kursus Populer</p>
        {['Web Development', 'UI/UX Design', 'Data Science'].map((course, i) => (
          <div key={course} style={{ display: 'flex', gap: '6px', padding: '6px', background: '#fafafa', borderRadius: '4px', marginBottom: '4px', alignItems: 'center' }}>
            <div style={{ width: '24px', height: '18px', background: `hsl(${i * 40 + 340}, 80%, 90%)`, borderRadius: '3px' }}></div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '6px', fontWeight: 600, color: '#333' }}>{course}</p>
              <p style={{ fontSize: '5px', color: '#999' }}>12 Modul</p>
            </div>
            <span style={{ fontSize: '5px', color: '#fa709a', fontWeight: 600 }}>Free</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '10px 12px', background: '#fef9f0' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, textAlign: 'center', marginBottom: '6px', color: '#333' }}>Progress Belajar</p>
        <div style={{ background: '#fff', borderRadius: '4px', padding: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '5px', color: '#666' }}>React Mastery</span>
            <span style={{ fontSize: '5px', color: '#fa709a' }}>75%</span>
          </div>
          <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: '75%', background: 'linear-gradient(90deg, #fa709a, #fee140)', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthcareMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      <div className="mockup-nav" style={{ background: '#4a2c8a', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fbc2eb', fontWeight: 700, fontSize: '9px' }}>KlinikSehat</span>
        <div style={{ width: '14px', height: '14px', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%' }}></div>
      </div>
      <div style={{ padding: '14px 12px', background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '10px', marginBottom: '3px' }}>Kesehatan Anda Prioritas Kami</h2>
        <p style={{ fontSize: '6px', opacity: 0.9 }}>Booking dokter online 24/7</p>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>Spesialis</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
          {['Umum', 'Gigi', 'Anak', 'Mata', 'THT', 'Kulit'].map((spec) => (
            <div key={spec} style={{ background: '#faf5ff', borderRadius: '4px', padding: '6px', textAlign: 'center' }}>
              <div style={{ width: '14px', height: '14px', background: '#e8d5ff', borderRadius: '50%', margin: '0 auto 3px' }}></div>
              <p style={{ fontSize: '5px', color: '#4a2c8a' }}>{spec}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, marginBottom: '6px', color: '#333' }}>Jadwal Hari Ini</p>
        {['Dr. Sarah - 09:00', 'Dr. Andi - 11:00', 'Dr. Maya - 14:00'].map((doc) => (
          <div key={doc} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 6px', background: '#faf5ff', borderRadius: '3px', marginBottom: '3px' }}>
            <span style={{ fontSize: '5px', color: '#333' }}>{doc}</span>
            <span style={{ fontSize: '5px', padding: '2px 4px', background: '#a18cd1', color: '#fff', borderRadius: '2px' }}>Book</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPreview() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Portfolio</p>
          <h2 className="section-title">Project Terbaru Kami</h2>
        </div>
        <div className="portfolio-grid-new">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card fade-in">
              <div className="portfolio-preview-frame">
                <div className="preview-browser-bar">
                  <div className="browser-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="browser-url">{project.name.toLowerCase().replace(/ /g, '')}.id</div>
                </div>
                <div className="preview-scroll-container">
                  <MockupContent type={project.mockup} />
                </div>
              </div>
              <div className="portfolio-card-info">
                <h3>{project.name}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
