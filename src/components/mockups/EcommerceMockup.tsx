// Shopee/Alibaba style - Orange & Red
export default function EcommerceMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      {/* Navbar - Shopee style orange */}
      <div style={{ background: 'linear-gradient(90deg, #ee4d2d, #ff6633)', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '10px' }}>ShopMart</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}></div>
          <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }}></div>
        </div>
      </div>
      {/* Search bar */}
      <div style={{ padding: '8px 12px', background: '#ee4d2d' }}>
        <div style={{ background: '#fff', borderRadius: '4px', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', border: '1px solid #999', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '6px', color: '#999' }}>Cari produk di ShopMart</span>
        </div>
      </div>
      {/* Banner */}
      <div style={{ margin: '8px 12px', background: 'linear-gradient(135deg, #ff6633, #ee4d2d)', borderRadius: '6px', padding: '12px', color: '#fff', textAlign: 'center' }}>
        <p style={{ fontSize: '6px', opacity: 0.8 }}>FLASH SALE</p>
        <p style={{ fontSize: '11px', fontWeight: 700 }}>Diskon s.d 90%</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '4px' }}>
          <span style={{ background: '#fff', color: '#ee4d2d', fontSize: '7px', fontWeight: 700, padding: '2px 4px', borderRadius: '2px' }}>08</span>
          <span style={{ color: '#fff', fontSize: '7px' }}>:</span>
          <span style={{ background: '#fff', color: '#ee4d2d', fontSize: '7px', fontWeight: 700, padding: '2px 4px', borderRadius: '2px' }}>45</span>
          <span style={{ color: '#fff', fontSize: '7px' }}>:</span>
          <span style={{ background: '#fff', color: '#ee4d2d', fontSize: '7px', fontWeight: 700, padding: '2px 4px', borderRadius: '2px' }}>12</span>
        </div>
      </div>
      {/* Category icons */}
      <div style={{ padding: '8px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center' }}>
          {['Fashion', 'Elektronik', 'Rumah', 'Kecantikan', 'Olahraga'].map((cat, i) => (
            <div key={cat}>
              <div style={{ width: '18px', height: '18px', background: `hsl(${i*30+10}, 90%, 95%)`, borderRadius: '50%', margin: '0 auto 2px', border: '1px solid #fee' }}></div>
              <span style={{ fontSize: '4.5px', color: '#333' }}>{cat}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Product grid */}
      <div style={{ padding: '6px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#ee4d2d', marginBottom: '6px' }}>Rekomendasi</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {[{ name: 'Kaos Premium', price: '89.000', disc: '45%' }, { name: 'Sepatu Sport', price: '299.000', disc: '30%' }, { name: 'Tas Ransel', price: '159.000', disc: '50%' }, { name: 'Jam Tangan', price: '199.000', disc: '25%' }].map((item, i) => (
            <div key={i} style={{ border: '1px solid #f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '28px', background: `hsl(${i*25}, 20%, 95%)` }}></div>
              <div style={{ padding: '4px 5px' }}>
                <p style={{ fontSize: '5.5px', color: '#333', marginBottom: '2px' }}>{item.name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '6px', color: '#ee4d2d', fontWeight: 700 }}>Rp {item.price}</span>
                  <span style={{ fontSize: '5px', background: '#fff0ed', color: '#ee4d2d', padding: '1px 3px', borderRadius: '2px' }}>-{item.disc}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                  <div style={{ width: '100%', height: '3px', background: '#f0f0f0', borderRadius: '2px' }}>
                    <div style={{ width: `${60 + i * 10}%`, height: '100%', background: '#ee4d2d', borderRadius: '2px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
