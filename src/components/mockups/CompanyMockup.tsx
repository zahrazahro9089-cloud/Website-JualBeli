// Toko Bangunan / Jual Beli Kambing - Coklat tanah & Hijau
export default function CompanyMockup() {
  return (
    <div className="mockup-page" style={{ background: '#faf8f5' }}>
      {/* Navbar */}
      <div style={{ background: '#3d2b1f', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#c8a96e', fontWeight: 700, fontSize: '9px' }}>MajuBersama</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Beranda', 'Produk', 'Kontak'].map(m => (
            <span key={m} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '5px' }}>{m}</span>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div style={{ padding: '14px 12px', background: 'linear-gradient(135deg, #5d4037, #33691e)', color: '#fff', textAlign: 'center' }}>
        <p style={{ fontSize: '6px', color: '#a5d6a7', letterSpacing: '1px' }}>TERPERCAYA SEJAK 2015</p>
        <h2 style={{ fontSize: '10px', margin: '3px 0' }}>Material Bangunan & Ternak</h2>
        <p style={{ fontSize: '5.5px', opacity: 0.8 }}>Supplier terlengkap untuk kebutuhan Anda</p>
      </div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '4px', padding: '10px 12px' }}>
        {[{ val: '500+', label: 'Produk' }, { val: '1000+', label: 'Pelanggan' }, { val: '10+', label: 'Tahun' }].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#f1ebe4', borderRadius: '4px', padding: '6px', textAlign: 'center', border: '1px solid #e0d5c5' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, color: '#5d4037' }}>{s.val}</p>
            <p style={{ fontSize: '5px', color: '#8d6e63' }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* Products */}
      <div style={{ padding: '8px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#3d2b1f', marginBottom: '6px' }}>Kategori Produk</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
          {[{ name: 'Semen & Bata', color: '#efebe9' }, { name: 'Kayu & Triplek', color: '#f1f8e9' }, { name: 'Kambing Aqiqah', color: '#e8f5e9' }, { name: 'Pakan Ternak', color: '#fff8e1' }].map(item => (
            <div key={item.name} style={{ background: item.color, borderRadius: '4px', padding: '8px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ width: '20px', height: '20px', background: 'rgba(93,64,55,0.1)', borderRadius: '4px', margin: '0 auto 4px' }}></div>
              <p style={{ fontSize: '5.5px', color: '#5d4037', fontWeight: 500 }}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Promo */}
      <div style={{ margin: '8px 12px', background: 'linear-gradient(90deg, #33691e, #558b2f)', borderRadius: '4px', padding: '8px 10px', color: '#fff' }}>
        <p style={{ fontSize: '6px', fontWeight: 600 }}>Promo Kambing Aqiqah</p>
        <p style={{ fontSize: '5px', opacity: 0.8 }}>Gratis ongkir + potong untuk wilayah Jabodetabek</p>
      </div>
      {/* Contact */}
      <div style={{ padding: '8px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#3d2b1f', marginBottom: '4px' }}>Hubungi Kami</p>
        {['WhatsApp: 0812-xxxx-xxxx', 'Lokasi: Tangerang, Banten'].map(c => (
          <p key={c} style={{ fontSize: '5px', color: '#6d4c41', marginBottom: '2px' }}>{c}</p>
        ))}
      </div>
    </div>
  );
}
