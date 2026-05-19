// Maternaldisaster / 3Second style - Dark Brown / Black & White / Streetwear
export default function DistroMockup() {
  return (
    <div className="mockup-page" style={{ background: '#1a1a1a' }}>
      {/* Navbar - minimal dark */}
      <div style={{ background: '#0d0d0d', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' }}>URBVN</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['NEW', 'KATALOG', 'SALE'].map(m => (
            <span key={m} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '4.5px', letterSpacing: '1px' }}>{m}</span>
          ))}
          <div style={{ width: '12px', height: '12px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '5px', color: '#fff' }}>0</span>
          </div>
        </div>
      </div>
      {/* Hero banner - streetwear vibe */}
      <div style={{ padding: '18px 12px', background: 'linear-gradient(135deg, #1a1a1a, #2d2016)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '5px', right: '8px', fontSize: '4px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>SS26</div>
        <p style={{ fontSize: '5px', color: '#8b7355', letterSpacing: '3px', marginBottom: '4px' }}>NEW DROP</p>
        <h2 style={{ fontSize: '12px', fontWeight: 900, color: '#fff', letterSpacing: '3px', textTransform: 'uppercase' }}>STREET<br/>CULTURE</h2>
        <p style={{ fontSize: '5px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Limited Edition Collection</p>
        <div style={{ marginTop: '8px', display: 'inline-block', border: '1px solid #fff', padding: '3px 10px' }}>
          <span style={{ fontSize: '5px', color: '#fff', letterSpacing: '1px' }}>SHOP NOW</span>
        </div>
      </div>
      {/* Category tabs */}
      <div style={{ display: 'flex', padding: '6px 12px', gap: '3px', borderBottom: '1px solid #2a2a2a' }}>
        {['All', 'T-Shirt', 'Hoodie', 'Jacket', 'Pants', 'Acc'].map((tab, i) => (
          <span key={tab} style={{ fontSize: '4.5px', padding: '3px 6px', background: i === 0 ? '#fff' : 'transparent', color: i === 0 ? '#000' : 'rgba(255,255,255,0.5)', borderRadius: '2px', letterSpacing: '0.5px' }}>{tab}</span>
        ))}
      </div>
      {/* Product grid - catalog style */}
      <div style={{ padding: '8px 10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {[
            { name: 'Oversized Tee "Rebel"', price: '189.000', tag: 'NEW' },
            { name: 'Hoodie "Midnight"', price: '349.000', tag: 'HOT' },
            { name: 'Cargo Pants "Utility"', price: '289.000', tag: null },
            { name: 'Coach Jacket "Urban"', price: '459.000', tag: 'LIMITED' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#222', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '40px', background: `linear-gradient(135deg, hsl(${30 + i*10}, ${10 + i*5}%, ${15 + i*3}%), #1a1a1a)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '20px', height: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px' }}></div>
              </div>
              {item.tag && (
                <div style={{ position: 'absolute', top: '3px', left: '3px', background: item.tag === 'LIMITED' ? '#8b7355' : item.tag === 'HOT' ? '#c0392b' : '#fff', padding: '1px 4px', borderRadius: '1px' }}>
                  <span style={{ fontSize: '3.5px', color: item.tag === 'NEW' ? '#000' : '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>{item.tag}</span>
                </div>
              )}
              <div style={{ padding: '5px 6px' }}>
                <p style={{ fontSize: '5px', color: '#ccc', fontWeight: 500, marginBottom: '2px' }}>{item.name}</p>
                <p style={{ fontSize: '5.5px', color: '#8b7355', fontWeight: 700 }}>Rp {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Size guide */}
      <div style={{ margin: '6px 10px', background: '#2a2a2a', borderRadius: '3px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '5.5px', color: '#fff', fontWeight: 600 }}>Size Guide</p>
          <p style={{ fontSize: '4px', color: 'rgba(255,255,255,0.5)' }}>Temukan ukuran yang tepat</p>
        </div>
        <div style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '2px 5px', borderRadius: '2px' }}>
          <span style={{ fontSize: '4px', color: '#fff' }}>LIHAT</span>
        </div>
      </div>
      {/* Lookbook */}
      <div style={{ padding: '8px 10px' }}>
        <p style={{ fontSize: '6px', color: '#8b7355', letterSpacing: '2px', marginBottom: '5px', textTransform: 'uppercase' }}>Lookbook</p>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: '35px', background: `linear-gradient(180deg, hsl(${25+i*5}, 15%, ${12+i*3}%), #111)`, borderRadius: '3px' }}></div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid #2a2a2a', textAlign: 'center' }}>
        <p style={{ fontSize: '7px', color: '#8b7355', fontWeight: 800, letterSpacing: '3px' }}>URBVN</p>
        <p style={{ fontSize: '4px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>2026 — Wear Your Identity</p>
      </div>
    </div>
  );
}
