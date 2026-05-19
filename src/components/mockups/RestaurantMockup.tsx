// Nasi Padang / Djamandoeloeresto - Classic brown
export default function RestaurantMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fdf8f0' }}>
      {/* Navbar - classic */}
      <div style={{ background: '#2c1810', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#d4a574', fontWeight: 700, fontSize: '9px', fontStyle: 'italic' }}>Nusantara</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Menu', 'Reservasi', 'Tentang'].map(m => (
            <span key={m} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '5px' }}>{m}</span>
          ))}
        </div>
      </div>
      {/* Hero - elegant */}
      <div style={{ padding: '16px 12px', background: 'linear-gradient(180deg, #3e2723, #4e342e)', color: '#fff', textAlign: 'center', position: 'relative' }}>
        <p style={{ fontSize: '5px', color: '#d4a574', letterSpacing: '2px', marginBottom: '3px' }}>SINCE 1970</p>
        <h2 style={{ fontSize: '11px', fontWeight: 700, fontStyle: 'italic', color: '#f5e6d3' }}>Cita Rasa Nusantara</h2>
        <p style={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.6)', marginTop: '3px' }}>Masakan Padang Autentik</p>
        <div style={{ width: '30px', height: '1px', background: '#d4a574', margin: '6px auto' }}></div>
      </div>
      {/* Menu section */}
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#3e2723', textAlign: 'center', marginBottom: '6px' }}>Menu Favorit</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
          {[{ name: 'Rendang Sapi', price: '35K' }, { name: 'Ayam Pop', price: '28K' }, { name: 'Gulai Otak', price: '30K' }, { name: 'Dendeng Balado', price: '32K' }].map(item => (
            <div key={item.name} style={{ background: '#fff', borderRadius: '4px', padding: '6px', border: '1px solid #e8ddd4', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', background: '#f5e6d3', borderRadius: '50%', flexShrink: 0 }}></div>
              <div>
                <p style={{ fontSize: '5.5px', color: '#3e2723', fontWeight: 500 }}>{item.name}</p>
                <p style={{ fontSize: '5px', color: '#8d6e63' }}>Rp {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Paket */}
      <div style={{ padding: '8px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#3e2723', textAlign: 'center', marginBottom: '5px' }}>Paket Nasi</p>
        <div style={{ background: '#3e2723', borderRadius: '6px', padding: '8px 10px', color: '#f5e6d3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: '6px', fontWeight: 600 }}>Paket Hemat</span>
            <span style={{ fontSize: '6px', color: '#d4a574' }}>Rp 25K</span>
          </div>
          <p style={{ fontSize: '5px', opacity: 0.7 }}>Nasi + 2 Lauk + Sayur + Es Teh</p>
        </div>
      </div>
      {/* Testimonial */}
      <div style={{ padding: '8px 12px' }}>
        <div style={{ background: '#fff8f0', border: '1px solid #e8ddd4', borderRadius: '4px', padding: '6px 8px', fontStyle: 'italic' }}>
          <p style={{ fontSize: '5px', color: '#5d4037' }}>"Rendangnya juara! Seperti masakan nenek."</p>
          <p style={{ fontSize: '4.5px', color: '#a1887f', marginTop: '2px' }}>- Budi, pelanggan tetap</p>
        </div>
      </div>
    </div>
  );
}
