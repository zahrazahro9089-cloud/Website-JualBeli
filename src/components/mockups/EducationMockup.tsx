// Ruangguru style - Biru & Putih
export default function EducationMockup() {
  return (
    <div className="mockup-page" style={{ background: '#fff' }}>
      {/* Navbar - blue */}
      <div style={{ background: '#1a73e8', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '9px' }}>EduTech</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ width: '14px', height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
          <div style={{ width: '14px', height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}></div>
        </div>
      </div>
      {/* Hero */}
      <div style={{ padding: '14px 12px', background: 'linear-gradient(135deg, #1a73e8, #4fc3f7)', color: '#fff' }}>
        <p style={{ fontSize: '6px', opacity: 0.9 }}>Platform Belajar #1 Indonesia</p>
        <h2 style={{ fontSize: '10px', fontWeight: 700, margin: '3px 0' }}>Belajar Kapan Saja,<br/>Dimana Saja</h2>
        <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
          <div style={{ background: '#fff', borderRadius: '3px', padding: '3px 6px' }}>
            <span style={{ fontSize: '5px', color: '#1a73e8', fontWeight: 600 }}>Mulai Gratis</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '3px', padding: '3px 6px' }}>
            <span style={{ fontSize: '5px', color: '#fff' }}>Lihat Kelas</span>
          </div>
        </div>
      </div>
      {/* Stats bar */}
      <div style={{ display: 'flex', background: '#f8fbff', padding: '8px 12px', gap: '8px', borderBottom: '1px solid #e3f2fd' }}>
        {[{ val: '10Jt+', label: 'Siswa' }, { val: '500+', label: 'Kursus' }, { val: '100+', label: 'Mentor' }].map(s => (
          <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontSize: '8px', fontWeight: 700, color: '#1a73e8' }}>{s.val}</p>
            <p style={{ fontSize: '4.5px', color: '#666' }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* Kelas Populer */}
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: '7px', fontWeight: 600, color: '#1a237e', marginBottom: '6px' }}>Kelas Populer</p>
        {[{ name: 'Matematika SMA', teacher: 'Pak Ridwan', rating: '4.9' }, { name: 'Bahasa Inggris', teacher: 'Ms. Sarah', rating: '4.8' }, { name: 'Fisika Dasar', teacher: 'Bu Ani', rating: '4.7' }].map((course, i) => (
          <div key={course.name} style={{ display: 'flex', gap: '6px', padding: '6px', background: i === 0 ? '#e3f2fd' : '#fff', borderRadius: '4px', marginBottom: '4px', alignItems: 'center', border: '1px solid #e3f2fd' }}>
            <div style={{ width: '22px', height: '22px', background: `hsl(${210 + i*15}, 80%, 90%)`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '7px' }}>{['📐', '🇬🇧', '⚡'][i]}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '6px', fontWeight: 600, color: '#1a237e' }}>{course.name}</p>
              <p style={{ fontSize: '4.5px', color: '#666' }}>{course.teacher}</p>
            </div>
            <span style={{ fontSize: '5px', color: '#f9a825', fontWeight: 600 }}>★ {course.rating}</span>
          </div>
        ))}
      </div>
      {/* Progress */}
      <div style={{ padding: '8px 12px', background: '#f8fbff' }}>
        <p style={{ fontSize: '6px', fontWeight: 600, color: '#1a237e', marginBottom: '5px' }}>Progress Belajarmu</p>
        <div style={{ background: '#fff', borderRadius: '4px', padding: '6px 8px', border: '1px solid #e3f2fd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
            <span style={{ fontSize: '5px', color: '#333' }}>Matematika Kelas 12</span>
            <span style={{ fontSize: '5px', color: '#1a73e8', fontWeight: 600 }}>78%</span>
          </div>
          <div style={{ height: '4px', background: '#e3f2fd', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, #1a73e8, #4fc3f7)', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
