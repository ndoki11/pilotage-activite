import { useState } from 'react'
import { RAG, cycleRag } from '../lib/constants'

export default function Domains({ poles, domains, projects, settings, updateDomainRag, updateDomainComment, updateDomainDays, addDomain, removeDomain }) {
  const total = settings.period_days || 20
  const dispatched = domains.reduce((s, d) => s + (parseFloat(d.days) || 0), 0)

  const ok   = domains.filter(d => d.rag === 'G').length
  const attn = domains.filter(d => d.rag === 'O').length
  const blk  = domains.filter(d => d.rag === 'R').length

  const handleAdd = () => {
    const name = prompt('Nom du domaine :')
    if (!name) return
    const sub = prompt('Technologies (ex: AWS · Azure) :') || ''
    const poleNames = poles.map((p, i) => `${i + 1}. ${p.name}`).join('\n')
    const idx = parseInt(prompt(`Pôle :\n${poleNames}\n\nNuméro :`) || '1') - 1
    const poleId = poles[idx]?.id || poles[0]?.id
    addDomain(name, sub, poleId)
  }

  return (
    <div className="container">
      {/* Stats */}
      <div className="stat-row">
        <div className="stat-box"><div className="stat-num">{ok}</div><div className="stat-lbl">Nominaux</div></div>
        <div className="stat-box"><div className="stat-num" style={{color:'#f59e0b'}}>{attn}</div><div className="stat-lbl">Attention</div></div>
        <div className="stat-box"><div className="stat-num" style={{color:'#ef4444'}}>{blk}</div><div className="stat-lbl">Bloqués</div></div>
        <div className="stat-box">
          <div className="stat-num" style={{color: dispatched > total ? '#ef4444' : dispatched === total ? '#22c55e' : '#d4a843'}}>
            {dispatched}j
          </div>
          <div className="stat-lbl">Dispatché / {total}j</div>
        </div>
        <div style={{flex:1}} />
        <button className="btn btn-ghost" onClick={handleAdd}>+ Domaine</button>
      </div>

      {/* Domains grouped by pole */}
      <div className="domains-grid">
        {poles.map(pole => {
          const pDomains = domains.filter(d => d.pole_id === pole.id)
          const poleDays = pDomains.reduce((s, d) => s + (parseFloat(d.days) || 0), 0)
          const polePct  = Math.round(poleDays / total * 100)

          return (
            <div key={pole.id} style={{gridColumn:'1/-1'}}>
              {/* Pole header */}
              <div className="pole-header" style={{borderLeftColor: pole.color}}>
                <span style={{fontSize:18}}>{pole.icon}</span>
                <div style={{flex:1}}>
                  <div className="pole-name">{pole.name}</div>
                  <div className="pole-sub">{pDomains.length} domaines</div>
                </div>
                <div style={{textAlign:'right', minWidth:100}}>
                  <div style={{fontFamily:'DM Mono, monospace', fontSize:20, fontWeight:700, color:pole.color}}>
                    {poleDays}<span style={{fontSize:11, color:'#6b7a99'}}>j</span>
                  </div>
                  <div className="progress-bar" style={{width:90, marginLeft:'auto', marginTop:3}}>
                    <div className="progress-fill" style={{width:`${polePct}%`, background:pole.color}} />
                  </div>
                  <div style={{fontSize:10, color:'#6b7a99', marginTop:2}}>{polePct}% de la période</div>
                </div>
              </div>

              {/* Domain cards */}
              <div className="domain-cards">
                {pDomains.map(d => {
                  const dProjs = projects.filter(p => p.domain_id === d.id)
                  const rag = RAG[d.rag] || RAG.G
                  return (
                    <div key={d.id} className="domain-card" style={{borderLeftColor: rag.dot}}>
                      <div className="domain-header">
                        <div style={{flex:1, minWidth:0}}>
                          <div className="domain-name">{d.name}</div>
                          <div className="domain-sub">{d.sub}</div>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, marginLeft:8}}>
                          <button
                            className="rag-badge"
                            style={{background:rag.bg, color:rag.text}}
                            onClick={() => updateDomainRag(d.id, cycleRag(d.rag))}
                          >
                            <span style={{width:7, height:7, borderRadius:'50%', background:rag.dot, display:'inline-block', marginRight:5}} />
                            {rag.label}
                          </button>
                          <button className="del-btn" onClick={() => confirm('Supprimer ?') && removeDomain(d.id)}>✕</button>
                        </div>
                      </div>

                      <div
                        className="domain-comment"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={e => updateDomainComment(d.id, e.target.innerText)}
                      >
                        {d.comment || ''}
                      </div>

                      <div className="domain-days">
                        <span className="domain-days-lbl">Jours :</span>
                        <input
                          type="range" min="0" max="12" step="0.5"
                          value={d.days}
                          onChange={e => updateDomainDays(d.id, e.target.value)}
                          style={{flex:1, accentColor:'#d4a843'}}
                        />
                        <span className="domain-days-val">{d.days}j</span>
                      </div>

                      {dProjs.length > 0 && (
                        <div className="projects-mini">
                          {dProjs.map(p => (
                            <div key={p.id} className="project-chip">
                              <span style={{color: RAG[p.rag]?.dot || '#6b7a99', fontSize:8}}>●</span>
                              <span style={{flex:1}}>{p.name}</span>
                              <span style={{color:'#6b7a99', fontSize:10, marginLeft:'auto'}}>
                                {['🔲','📐','⚙️','🧪','✅'][[0,25,50,75,100].indexOf(+p.pct)] || p.pct+'%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
