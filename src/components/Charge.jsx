export default function Charge({ poles, domains, settings, updateDomain, updateSetting }) {
  const total      = settings.period_days || 20
  const dispatched = domains.reduce((s,d) => s+(parseFloat(d.days)||0), 0)
  const diff       = dispatched - total
  const diffColor  = diff === 0 ? '#22c55e' : diff > 0 ? '#ef4444' : '#6b7a99'
  const diffStr    = diff === 0 ? '✓ équilibré' : diff > 0 ? `+${diff}j sur budget` : `${Math.abs(diff)}j disponibles`

  return (
    <div className="container">
      {/* Hero */}
      <div className="charge-hero">
        <div>
          <div style={{fontFamily:'Syne,sans-serif', fontSize:52, fontWeight:800, color:'#d4a843', lineHeight:1}}>{total}</div>
          <div style={{fontSize:11, color:'#c8d8f4', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:3}}>jours alloués</div>
        </div>
        <div style={{flex:1, maxWidth:280}}>
          <div style={{fontSize:11, color:'#c8d8f4', marginBottom:5}}>Durée de la période</div>
          <input
            type="range" min="10" max="22" step="1" value={total}
            style={{width:'100%', accentColor:'#d4a843'}}
            onChange={e => updateSetting('period_days', +e.target.value)}
          />
          <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:'#6b7a99', marginTop:3}}>
            <span>10j</span><span>22j</span>
          </div>
        </div>
        <div style={{fontFamily:'DM Mono,monospace', fontWeight:700, fontSize:14, color:diffColor, textAlign:'right'}}>
          {dispatched}j dispatché<br/>
          <span style={{fontSize:12}}>{diffStr}</span>
        </div>
      </div>

      {/* Bars par pôle */}
      <div className="card">
        {poles.map(pole => {
          const pDomains = domains.filter(d => d.pole_id === pole.id)
          if (!pDomains.length) return null
          return (
            <div key={pole.id}>
              <div className="pole-charge-title" style={{color:pole.color, borderBottomColor:pole.color+'44'}}>
                {pole.icon} {pole.name}
              </div>
              {pDomains.map(d => {
                const pct = Math.min(100, Math.round((d.days / total) * 100))
                return (
                  <div key={d.id} className="charge-row">
                    <div className="charge-label">{d.name}</div>
                    <div style={{flex:1, display:'flex', flexDirection:'column', gap:3}}>
                      <div className="charge-bar-bg">
                        <div className="charge-bar-fill" style={{width:`${pct}%`, background:d.color}}>
                          {d.days > 0 ? d.days+'j' : ''}
                        </div>
                      </div>
                      <input
                        type="range" min="0" max="12" step="0.5" value={d.days}
                        style={{accentColor:d.color, width:'100%'}}
                        onChange={e => updateDomain(d.id, { days: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="charge-val">{d.days}j <span style={{fontSize:10,color:'#6b7a99'}}>({pct}%)</span></div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
