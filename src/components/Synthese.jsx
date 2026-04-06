import { RAG, getPhase } from '../lib/constants'

export default function Synthese({ poles, domains, projects, incidents, cphs, expertises, settings }) {
  const total     = settings.period_days || 20
  const decisions = projects.filter(p => p.decision?.trim())

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'1rem', gap:'0.5rem'}}>
        <span style={{fontSize:12, color:'#6b7a99', alignSelf:'center'}}>Screenshot de la zone blanche → envoyer à Étienne</span>
        <button className="btn btn-ghost-nav" onClick={() => window.print()}>🖨 Imprimer</button>
      </div>

      <div className="screenshot-area">
        {/* Header */}
        <div className="synth-header">
          <div>
            <div className="synth-h2">Bilan de Pilotage — Pôle Infrastructures & Architecture</div>
            <div className="synth-sub">GA Smart Building · DDSI · N3 Responsable Technique : C. Arnault</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'DM Mono,monospace', fontSize:14, color:'#d4a843', fontWeight:700}}>{settings.period}</div>
            <div style={{fontSize:11, color:'#6b7a99'}}>Présenté par Étienne Garinet · Dir. Infrastructures</div>
          </div>
        </div>

        {/* Pôles */}
        <div className="synth-section-title">Répartition charge — {total} jours</div>
        <div className="synth-poles">
          {poles.map(pole => {
            const pd   = domains.filter(d => d.pole_id === pole.id)
            const days = pd.reduce((s,d) => s+(parseFloat(d.days)||0), 0)
            const pct  = Math.round(days/total*100)
            const pp   = projects.filter(p => pd.find(d=>d.id===p.domain_id))
            const rc   = { G:0,O:0,R:0 }; pd.forEach(d=>rc[d.rag]++)
            return (
              <div key={pole.id} className="synth-pole" style={{borderTop:`3px solid ${pole.color}`}}>
                <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:5}}>
                  <span>{pole.icon}</span>
                  <span style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:11}}>{pole.name}</span>
                </div>
                <div style={{fontFamily:'DM Mono,monospace',fontSize:24,fontWeight:700,color:pole.color,lineHeight:1}}>
                  {days}<span style={{fontSize:11,color:'#6b7a99'}}>j · {pct}%</span>
                </div>
                <div className="progress-bar" style={{margin:'4px 0 5px'}}>
                  <div className="progress-fill" style={{width:`${pct}%`,background:pole.color}}/>
                </div>
                <div style={{display:'flex',gap:6,fontSize:10}}>
                  {rc.G>0&&<span style={{color:'#22c55e'}}>●{rc.G} ok</span>}
                  {rc.O>0&&<span style={{color:'#f59e0b'}}>●{rc.O} attn</span>}
                  {rc.R>0&&<span style={{color:'#ef4444'}}>●{rc.R} bloqué</span>}
                  <span style={{color:'#6b7a99',marginLeft:'auto'}}>{pp.length} projet{pp.length>1?'s':''}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Domaines + projets par pôle */}
        {poles.map(pole => {
          const pd = domains.filter(d => d.pole_id === pole.id)
          const pp = projects.filter(p => pd.find(d=>d.id===p.domain_id))
          const kp = pp.filter(p => p.prio==='H' || p.rag!=='G' || p.decision)
          return (
            <div key={pole.id} style={{marginBottom:'1rem'}}>
              <div className="synth-pole-title" style={{color:pole.color,borderBottomColor:pole.color+'44'}}>
                {pole.icon} {pole.name}
              </div>
              <div className="synth-domains" style={{gridTemplateColumns:`repeat(${Math.min(pd.length,4)},1fr)`}}>
                {pd.map(d => {
                  const r = RAG[d.rag]||RAG.G
                  return (
                    <div key={d.id} className="synth-domain" style={{borderLeft:`3px solid ${r.dot}`}}>
                      <div style={{fontWeight:600,fontSize:10}}>{d.name}</div>
                      <div style={{fontSize:9,color:'#6b7a99',fontStyle:'italic',marginTop:1}}>{d.comment||'—'}</div>
                      <div style={{fontFamily:'DM Mono,monospace',fontSize:9,color:d.color,marginTop:2}}>{d.days}j</div>
                    </div>
                  )
                })}
              </div>
              {kp.length>0&&(
                <div style={{display:'flex',flexDirection:'column',gap:2,marginTop:4}}>
                  {kp.map(p => {
                    const ph=getPhase(p.pct); const r=RAG[p.rag]||RAG.G
                    return (
                      <div key={p.id} className="synth-proj-row">
                        <span style={{color:r.dot}}>●</span>
                        <span style={{flex:1,fontWeight:500,fontSize:9,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.name}</span>
                        <span style={{fontSize:9,color:'#6b7a99',whiteSpace:'nowrap'}}>{ph.label} · {p.pct}%</span>
                        {p.decision&&<span style={{color:'#f59e0b',fontStyle:'italic',fontSize:9,marginLeft:4}}>⚑ {p.decision}</span>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* CPH */}
        {cphs.length>0&&(
          <div className="synth-cph">
            <div className="synth-cph-title">⚡ C'est pour hier — Interventions urgentes ({cphs.length})</div>
            {cphs.map(c=>{
              const d=domains.find(x=>x.id===c.domain_id)
              return <div key={c.id} className="synth-inc"><div className="synth-dot" style={{background:'#d97706'}}/><strong style={{minWidth:80,fontSize:10}}>{d?.name||'—'}</strong><span style={{fontSize:10}}>{c.text}</span></div>
            })}
          </div>
        )}

        {/* Incidents + Décisions */}
        <div className="synth-bottom">
          <div>
            <div className="synth-section-title">Incidents & Blocages ({incidents.length})</div>
            {incidents.length===0
              ? <span style={{fontSize:10,color:'#6b7a99'}}>Aucun incident</span>
              : incidents.map(i=>{
                  const d=domains.find(x=>x.id===i.domain_id); const c=i.type==='blocked'?'#ef4444':'#f59e0b'
                  return <div key={i.id} className="synth-inc"><div className="synth-dot" style={{background:c}}/><strong style={{minWidth:80,fontSize:10}}>{d?.name||'—'}</strong><span style={{fontSize:10}}>{i.text}</span></div>
                })
            }
          </div>
          <div>
            <div className="synth-section-title">Décisions attendues ({decisions.length})</div>
            {decisions.length===0
              ? <span style={{fontSize:10,color:'#6b7a99'}}>Aucune</span>
              : decisions.map(p=>(
                  <div key={p.id} className="synth-inc"><div className="synth-dot" style={{background:'#f59e0b'}}/><strong style={{minWidth:80,fontSize:10}}>{p.name.split('—')[0].trim()}</strong><span style={{fontSize:10}}>{p.decision}</span></div>
                ))
            }
          </div>
        </div>

        <div className="synth-footer">
          <span>GA Smart Building · DDSI · Confidentiel</span>
          <span>Bilan J15 & J30</span>
          <span>{settings.period}</span>
        </div>
      </div>
    </div>
  )
}
