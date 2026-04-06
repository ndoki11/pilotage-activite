import { useState } from 'react'
import { RAG, cycleRag, getPhase } from '../lib/constants'
import { AddDomainModal } from './Modal'

export default function Domains({ poles, domains, projects, settings, updateDomain, addDomain, removeDomain }) {
  const [showAdd, setShowAdd] = useState(false)
  const total      = settings.period_days || 20
  const dispatched = domains.reduce((s, d) => s + (parseFloat(d.days) || 0), 0)

  return (
    <div className="container">
      {/* Stats bar */}
      <div className="stat-row">
        {[
          { val: domains.filter(d=>d.rag==='G').length, lbl:'Nominaux',  color:'#22c55e' },
          { val: domains.filter(d=>d.rag==='O').length, lbl:'Attention', color:'#f59e0b' },
          { val: domains.filter(d=>d.rag==='R').length, lbl:'Bloqués',   color:'#ef4444' },
          { val: `${dispatched}j / ${total}j`,          lbl:'Dispatché', color: dispatched > total ? '#ef4444' : dispatched === total ? '#22c55e' : '#d4a843' },
        ].map(s => (
          <div key={s.lbl} className="stat-box">
            <div className="stat-num" style={{color:s.color}}>{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
        <div style={{flex:1}}/>
        <button className="btn btn-ghost-nav" onClick={() => setShowAdd(true)}>+ Domaine</button>
      </div>

      {/* Domains grouped by pole */}
      {poles.map(pole => {
        const pDomains = domains.filter(d => d.pole_id === pole.id)
        const poleDays = pDomains.reduce((s,d) => s+(parseFloat(d.days)||0), 0)
        const polePct  = Math.round(poleDays / total * 100)

        return (
          <div key={pole.id}>
            {/* Pole header */}
            <div className="pole-header" style={{borderLeftColor:pole.color}}>
              <span style={{fontSize:18}}>{pole.icon}</span>
              <div style={{flex:1}}>
                <div className="pole-name">{pole.name}</div>
                <div className="pole-sub">{pDomains.length} domaines</div>
              </div>
              <div style={{textAlign:'right', minWidth:100}}>
                <div style={{fontFamily:'DM Mono,monospace', fontSize:20, fontWeight:700, color:pole.color}}>
                  {poleDays}<span style={{fontSize:11, color:'#6b7a99'}}>j</span>
                </div>
                <div className="progress-bar" style={{width:90, marginLeft:'auto', marginTop:3}}>
                  <div className="progress-fill" style={{width:`${polePct}%`, background:pole.color}}/>
                </div>
                <div style={{fontSize:10, color:'#6b7a99', marginTop:2}}>{polePct}%</div>
              </div>
            </div>

            {/* Domain cards */}
            <div className="domain-cards">
              {pDomains.map(d => {
                const rag   = RAG[d.rag] || RAG.G
                const projs = projects.filter(p => p.domain_id === d.id)
                return (
                  <div key={d.id} className="domain-card" style={{borderLeftColor:rag.dot}}>
                    <div className="domain-header">
                      <div style={{flex:1, minWidth:0}}>
                        <div className="domain-name">{d.name}</div>
                        <div className="domain-sub">{d.sub}</div>
                      </div>
                      <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4}}>
                        <button
                          className="rag-btn"
                          style={{background:rag.bg, color:rag.color}}
                          onClick={() => updateDomain(d.id, { rag: cycleRag(d.rag) })}
                        >
                          <span style={{width:7,height:7,borderRadius:'50%',background:rag.dot,display:'inline-block',marginRight:5,flexShrink:0}}/>
                          {rag.label}
                        </button>
                        <button className="del-btn" onClick={() => confirm('Supprimer ce domaine ?') && removeDomain(d.id)}>✕</button>
                      </div>
                    </div>

                    <div
                      className="domain-comment"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={e => updateDomain(d.id, { comment: e.target.innerText.trim() })}
                    >{d.comment || ''}</div>

                    <div className="domain-days-row">
                      <span className="domain-days-lbl">Jours</span>
                      <input
                        type="range" min="0" max="12" step="0.5"
                        value={d.days}
                        onChange={e => updateDomain(d.id, { days: parseFloat(e.target.value) })}
                        style={{flex:1, accentColor:'#d4a843'}}
                      />
                      <span className="domain-days-val">{d.days}j</span>
                    </div>

                    {/* Projets rattachés — LIAISON CRITIQUE */}
                    {projs.length > 0 && (
                      <div className="proj-chips">
                        {projs.map(p => {
                          const ph  = getPhase(p.pct)
                          const pr  = RAG[p.rag] || RAG.G
                          return (
                            <div key={p.id} className="proj-chip">
                              <span style={{width:7,height:7,borderRadius:'50%',background:pr.dot,display:'inline-block',flexShrink:0}}/>
                              <span style={{flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{p.name}</span>
                              <span style={{fontSize:10, color:'#6b7a99', whiteSpace:'nowrap', marginLeft:4}}>{ph.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {showAdd && <AddDomainModal poles={poles} onAdd={addDomain} onClose={() => setShowAdd(false)}/>}
    </div>
  )
}
