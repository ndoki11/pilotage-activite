import { RAG, PHASES } from '../lib/constants'

export default function Synthese({ poles, domains, projects, incidents, cphs, settings }) {
  const total = settings.period_days || 20
  const decisions = projects.filter(p => p.decision && p.decision.trim())

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'1rem'}}>
        <button className="btn btn-ghost" onClick={() => window.print()}>🖨 Imprimer</button>
      </div>

      <div className="screenshot-area" id="screenshot-area">
        {/* Header */}
        <div className="synth-header">
          <div>
            <h2 className="synth-title">Bilan de Pilotage — Pôle Infrastructures & Architecture</h2>
            <p className="synth-sub">GA Smart Building · DDSI · N3 Responsable Technique : C. Arnault</p>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'DM Mono, monospace', fontSize:14, color:'#d4a843', fontWeight:700}}>{settings.period}</div>
            <div style={{fontSize:11, color:'#6b7a99'}}>Présenté par Étienne Garinet</div>
          </div>
        </div>

        {/* 3 pôles */}
        <div className="synth-section-title">Répartition de la charge — {total} jours·homme</div>
        <div className="synth-poles">
          {poles.map(pole => {
            const pDomains = domains.filter(d => d.pole_id === pole.id)
            const poleDays = pDomains.reduce((s, d) => s + (parseFloat(d.days) || 0), 0)
            const polePct  = Math.round(poleDays / total * 100)
            const pProjs   = projects.filter(p => pDomains.find(d => d.id === p.domain_id))
            const rc = { G: 0, O: 0, R: 0 }
            pDomains.forEach(d => rc[d.rag]++)
            return (
              <div key={pole.id} className="synth-pole-card" style={{borderTop:`3px solid ${pole.color}`}}>
                <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:6}}>
                  <span style={{fontSize:14}}>{pole.icon}</span>
                  <div style={{fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:11, color:'#1a2545'}}>{pole.name}</div>
                </div>
                <div style={{display:'flex', alignItems:'baseline', gap:4, marginBottom:3}}>
                  <span style={{fontFamily:'DM Mono, monospace', fontSize:26, fontWeight:700, color:pole.color}}>{poleDays}</span>
                  <span style={{fontSize:11, color:'#6b7a99'}}>j · {polePct}%</span>
                </div>
                <div className="progress-bar" style={{marginBottom:5}}>
                  <div className="progress-fill" style={{width:`${polePct}%`, background:pole.color}} />
                </div>
                <div style={{display:'flex', gap:6, fontSize:10}}>
                  {rc.G > 0 && <span style={{color:'#22c55e'}}>●{rc.G} ok</span>}
                  {rc.O > 0 && <span style={{color:'#f59e0b'}}>●{rc.O} attn</span>}
                  {rc.R > 0 && <span style={{color:'#ef4444'}}>●{rc.R} bloqué</span>}
                  <span style={{color:'#6b7a99', marginLeft:'auto'}}>{pProjs.length} projet{pProjs.length > 1 ? 's' : ''}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Domaines par pôle */}
        {poles.map(pole => {
          const pDomains = domains.filter(d => d.pole_id === pole.id)
          const pProjs   = projects.filter(p => pDomains.find(d => d.id === p.domain_id))
          const keyProjs = pProjs.filter(p => p.prio === 'H' || p.rag !== 'G' || p.decision)
          return (
            <div key={pole.id} style={{marginBottom:'1rem'}}>
              <div className="synth-pole-title" style={{color:pole.color, borderBottomColor:pole.color+'44'}}>
                {pole.icon} {pole.name}
              </div>
              <div className="synth-domains-grid" style={{gridTemplateColumns:`repeat(${Math.min(pDomains.length,4)},1fr)`}}>
                {pDomains.map(d => {
                  const rag = RAG[d.rag] || RAG.G
                  return (
                    <div key={d.id} className="synth-domain" style={{borderLeft:`3px solid ${rag.dot}`}}>
                      <div style={{fontWeight:600, fontSize:10, color:'#1a2545'}}>{d.name}</div>
                      <div style={{fontSize:9, color:'#6b7a99', fontStyle:'italic', marginTop:1}}>{d.comment || '—'}</div>
                      <div style={{fontFamily:'DM Mono, monospace', fontSize:9, color:d.color, marginTop:2}}>{d.days}j</div>
                    </div>
                  )
                })}
              </div>
              {keyProjs.length > 0 && (
                <div style={{display:'flex', flexDirection:'column', gap:2, marginTop:4}}>
                  {keyProjs.map(p => {
                    const ph = PHASES.find(ph => ph.pct === +p.pct) || PHASES[0]
                    const rag = RAG[p.rag] || RAG.G
                    return (
                      <div key={p.id} className="synth-proj-row">
                        <span style={{color:rag.dot}}>●</span>
                        <span style={{flex:1, fontWeight:500, color:'#1a2545', fontSize:9}}>{p.name}</span>
                        <span style={{fontSize:9, color:'#6b7a99', whiteSpace:'nowrap'}}>{ph.label} · {p.pct}%</span>
                        {p.decision && <span style={{color:'#f59e0b', fontStyle:'italic', fontSize:9, marginLeft:4}}>⚑ {p.decision}</span>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* CPH */}
        {cphs.length > 0 && (
          <div className="synth-cph-block">
            <div className="synth-cph-title">⚡ C'est pour hier — Interventions urgentes ({cphs.length})</div>
            {cphs.map(c => (
              <div key={c.id} className="synth-inc-row">
                <div className="synth-inc-dot" style={{background:'#d97706'}} />
                <strong style={{color:'#1a2545', minWidth:80, fontSize:10}}>{c.domain_id}</strong>
                <span style={{fontSize:10}}>{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Incidents + Décisions */}
        <div className="synth-bottom">
          <div>
            <div className="synth-section-title">Incidents & Blocages ({incidents.length})</div>
            {incidents.length === 0
              ? <span style={{fontSize:10, color:'#6b7a99'}}>Aucun incident</span>
              : incidents.map(i => (
                <div key={i.id} className="synth-inc-row">
                  <div className="synth-inc-dot" style={{background: i.type === 'blocked' ? '#ef4444' : '#f59e0b'}} />
                  <strong style={{color:'#1a2545', minWidth:80, fontSize:10}}>{i.domain_id}</strong>
                  <span style={{fontSize:10}}>{i.text}</span>
                </div>
              ))
            }
          </div>
          <div>
            <div className="synth-section-title">Décisions attendues ({decisions.length})</div>
            {decisions.length === 0
              ? <span style={{fontSize:10, color:'#6b7a99'}}>Aucune</span>
              : decisions.map(p => (
                <div key={p.id} className="synth-inc-row">
                  <div className="synth-inc-dot" style={{background:'#f59e0b'}} />
                  <strong style={{color:'#1a2545', minWidth:80, fontSize:10}}>{p.name.split('—')[0].trim()}</strong>
                  <span style={{fontSize:10}}>{p.decision}</span>
                </div>
              ))
            }
          </div>
        </div>

        <div className="synth-footer">
          <span>GA Smart Building · DDSI · Confidentiel</span>
          <span>Rythme Bilan J15 & J30</span>
          <span>{settings.period}</span>
        </div>
      </div>
    </div>
  )
}
