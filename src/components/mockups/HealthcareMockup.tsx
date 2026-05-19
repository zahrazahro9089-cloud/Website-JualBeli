// Halodoc / Apotek style - Biru muda
export default function HealthcareMockup() {
  return (
    <div className="mockup-page" style={{ background: '#f0f9ff' }}>
      {/* Navbar */}
      <div style={{ background: '#0891b2', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '9px' }}>KlinikSehat</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '14px', height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
          <div style={{ width: '14px', height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
        </div>
      </div>
      {/* Hero */}
      <div style={{ padding: '12px', background: 'linear-gradient(135deg, #0891b2, #67e8f9)', color: '#fff' }}>
        <h2 style={{ fontSize: '10px', fontWeight: 700, marginBottom: '3px' }}>Konsultasi Dokter Online</h2>
        <p style={{ fontSize: '5.5px', opacity: 0.9 }}>Chat dokter 24/7, pesan obat, cek lab</p>
        <div style={{ background: '#fff', borderRadius: '4px', padding: '5px 8px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', border: '1px solid #0891b2', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '5px', color: '#999' }}>Cari dokter, spesialis, atau obat...</span>
        </div>
      </div>
      {/* Quick actions */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', textAlign: 'center' }}>
          {[{ icon: '💬', name: 'Chat Dokter' }, { icon: '💊', name: 'Toko Obat' }, { icon: '🏥', name: 'RS Terdekat' }, { icon: '🩺', name: 'Cek Lab' }].map(item => (
            <div key={item.name} style={{ background: '#fff', borderRadius: '6px', padding: '6px 3px', border: '1px solid #e0f7fa' }}>
              <span style={{ fontSize: '10px' }}>{item.icon}</span>
              <p style={{ fontSize: '4.5px', color: '#0891b2', marginTop: '2px', fontWeight: 500 }}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Dokter tersedia */}
      <div style={{ padding: '8px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#0c4a6e', marginBottom: '6px' }}>Dokter Tersedia</p>
        {[{ name: 'dr. Sarah, Sp.PD', spec: 'Penyakit Dalam', price: '50.000', online: true }, { name: 'dr. Andi, Sp.A', spec: 'Anak', price: '75.000', online: true }, { name: 'drg. Maya', spec: 'Gigi', price: '45.000', online: false }].map((doc, i) => (
          <div key={doc.name} style={{ display: 'flex', gap: '6px', padding: '6px', background: '#fff', borderRadius: '6px', marginBottom: '4px', alignItems: 'center', border: '1px solid #e0f7fa' }}>
            <div style={{ width: '22px', height: '22px', background: `hsl(${180 + i*15}, 50%, 90%)`, borderRadius: '50%', position: 'relative' }}>
              {doc.online && <div style={{ width: '5px', height: '5px', background: '#4ade80', borderRadius: '50%', position: 'absolute', bottom: 0, right: 0, border: '1px solid #fff' }}></div>}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '5.5px', fontWeight: 600, color: '#0c4a6e' }}>{doc.name}</p>
              <p style={{ fontSize: '4.5px', color: '#64748b' }}>{doc.spec}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '5px', color: '#0891b2', fontWeight: 600 }}>Rp {doc.price}</p>
              <div style={{ background: '#0891b2', borderRadius: '2px', padding: '1.5px 4px', marginTop: '2px' }}>
                <span style={{ fontSize: '4px', color: '#fff' }}>Chat</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Promo */}
      <div style={{ margin: '6px 12px', background: 'linear-gradient(90deg, #ecfeff, #cffafe)', borderRadius: '4px', padding: '6px 8px', border: '1px solid #a5f3fc' }}>
        <p style={{ fontSize: '5.5px', fontWeight: 600, color: '#0891b2' }}>Gratis Konsultasi Pertama!</p>
        <p style={{ fontSize: '4.5px', color: '#64748b' }}>Gunakan kode: SEHAT2026</p>
      </div>
    </div>
  );
}
