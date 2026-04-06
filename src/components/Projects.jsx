import { useState, useMemo } from 'react'
import { RAG, PHASES, cycleRag, getPhase } from '../lib/constants'
import { AddProjectModal } from './Modal'

export default function Projects({ poles, domains, projects, updateProject, addProject, removeProject }) {
  const [showAdd,     setShowAdd]     = useState(false)
  const [filterPole,  setFilterPole]  = useState('all')
  const [filterDomain,setFilterDomain]= useState('all')
  const [filterRag,   setFilterRag]   = useState('all')
  const [filterPrio,  setFilterPrio]  = useState('all')

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const dom = domains.find(d => d.id === p.domain_id)
      if (filterPole   !== 'all' && dom?.pole_id !== filterPole)   return false
      if (filterDomain !== 'all' && p.domain_id  !== filterDomain) return false
      if (filterRag    !== 'all' && p.rag         !== filterRag)    return false
      if (filterPrio   !== 'all' && p.prio        !== filterPrio)   return false
      return true
    })
  }, [projects, domains, filterPole, filterDomain, filterRag, filterPrio])

  const filteredDomains = filterPole === 'all' ? domains : domains.filter(d => d.pole_id === filterPole)
  const activeFilters = [filterPole,filterDomain,filterRag,filterPrio].filter(f=>f!=='all').length

  return (
    <div className="container">
      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Pôle</span>
          <select className="filter-select" value={filterPole} onChange={e=>{setFilterPole(e.target.value);setFilterDomain('all')}}>
            <option value="all">Tous</option>
            {poles.map(p=><option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-label">Domaine</span>
          <select className="filter-select" value={filterDomain} onChange={e=>setFilterDomain(e.target.value)}>
            <option value="all">Tous</option>
            {filteredDomains.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-label">Statut</span>
          <select className="filter-select" value={filterRag} onChange={e=>setFilterRag(e.target.value)}>
            <option value="all">Tous</option>
            <option value="G">● Nominal</option>
            <option value="O">● Attention</option>
            <option value="R">● Bloqué</option>
          </select>
        </div>
        <div className="filter-group">
          <span className="filter-label">Priorité</span>
          <select className="filter-select" value={filterPrio} onChange={e=>setFilterPrio(e.target.value)}>
            <option value="all">Toutes</option>
            <option value="H">HAUTE</option>
            <option value="M">MOYENNE</option>
            <option value="B">BASSE</option>
          </select>
        </div>
        {activeFilters>0&&<button className="btn btn-ghost-nav" style={{fontSize:11}} onClick={()=>{setFilterPole('all');setFilterDomain('all');setFilterRag('all');setFilterPrio('all')}}>✕ Réinitialiser ({activeFilters})</button>}
        <div style={{flex:1}}/>
        <span style={{fontSize:12,color:'#6b7a99'}}>{filtered.length} projet{filtered.length>1?'s':''}</span>
        <button className="btn btn-gold" onClick={()=>setShowAdd(true)}>+ Ajouter un projet</button>
      </div>

      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <table className="proj-table">
          <thead>
            <tr>
              <th>Projet</th>
              <th>Domaine</th>
              <th>Priorité</th>
              <th>Phase</th>
              <th>Statut</th>
              <th>Décision / Blocage</th>
              <th style={{width:32}}/>
            </tr>
          </thead>
          <tbody>
            {filtered.length===0&&(
              <tr><td colSpan="7" style={{textAlign:'center',padding:'2rem',color:'#6b7a99',fontSize:13,fontStyle:'italic'}}>Aucun projet pour ces filtres</td></tr>
            )}
            {filtered.map(p => {
              const rag   = RAG[p.rag]||RAG.G
              const phase = getPhase(p.pct)
              return (
                <tr key={p.id}>
                  <td><input className="cell-input fw" defaultValue={p.name} onBlur={e=>{if(e.target.value!==p.name)updateProject(p.id,{name:e.target.value})}}/></td>
                  <td>
                    <select className="cell-select" value={p.domain_id||''} onChange={e=>updateProject(p.id,{domain_id:e.target.value})}>
                      {poles.map(pole=>(
                        <optgroup key={pole.id} label={`${pole.icon} ${pole.name}`}>
                          {domains.filter(d=>d.pole_id===pole.id).map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select className="cell-select" value={p.prio} onChange={e=>updateProject(p.id,{prio:e.target.value})}>
                      <option value="H">HAUTE</option>
                      <option value="M">MOYENNE</option>
                      <option value="B">BASSE</option>
                    </select>
                  </td>
                  <td>
                    <select className="phase-select" value={p.pct} style={{background:phase.bg,color:phase.color}} onChange={e=>updateProject(p.id,{pct:+e.target.value})}>
                      {PHASES.map(ph=><option key={ph.pct} value={ph.pct} style={{background:ph.bg,color:ph.color}}>{ph.label} — {ph.pct}%</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="rag-btn" style={{background:rag.bg,color:rag.color}} onClick={()=>updateProject(p.id,{rag:cycleRag(p.rag)})}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:rag.dot,display:'inline-block',marginRight:5}}/>
                      {rag.label}
                    </button>
                  </td>
                  <td><input className="cell-input decision" defaultValue={p.decision||''} onBlur={e=>{if(e.target.value!==(p.decision||''))updateProject(p.id,{decision:e.target.value})}} placeholder="—"/></td>
                  <td><button className="del-btn" onClick={()=>confirm('Supprimer ?')&&removeProject(p.id)}>✕</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showAdd&&<AddProjectModal poles={poles} domains={domains} onAdd={addProject} onClose={()=>setShowAdd(false)}/>}
    </div>
  )
}
