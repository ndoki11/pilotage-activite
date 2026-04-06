import { useState } from 'react'

function IncidentItem({ item, onUpdate, onRemove, badgeColor, badge }) {
  const dom = item.domain_id || '—'
  return (
    <div className="incident-item" style={{borderLeftColor: badgeColor}}>
      <div className="incident-domain">{dom}</div>
      <div
        className="incident-text"
        contentEditable
        suppressContentEditableWarning
        onBlur={e => onUpdate(item.id, e.target.innerText)}
      >{item.text}</div>
      {badge && <span className="cph-badge" style={{background:badgeColor}}>{badge}</span>}
      <button className="del-btn" onClick={() => onRemove(item.id)}>✕</button>
    </div>
  )
}

function AddForm({ domains, onAdd, placeholder, showType }) {
  const [domain, setDomain] = useState(domains[0]?.id || '')
  const [type, setType] = useState('incident')
  const [text, setText] = useState('')

  const handle = () => {
    if (!text.trim()) return
    onAdd(domain, showType ? type : 'expertise', text.trim())
    setText('')
  }

  return (
    <div className="add-form">
      <select className="add-select" value={domain} onChange={e => setDomain(e.target.value)}>
        {domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      {showType && (
        <select className="add-select" value={type} onChange={e => setType(e.target.value)}>
          <option value="incident">🔴 Incident</option>
          <option value="blocked">⛔ Blocage</option>
        </select>
      )}
      <input
        className="add-input"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handle()}
        placeholder={placeholder}
      />
      <button className="btn btn-gold" onClick={handle}>Ajouter</button>
    </div>
  )
}

export default function Incidents({ domains, incidents, cphs, expertises, addIncident, updateIncident, removeIncident, addExpertise, updateExpertise, removeExpertise }) {

  const addCph = (domain, _, text) => addIncident(domain, 'cph', text)

  return (
    <div className="container">
      <div className="grid-2">
        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>

          {/* CPH */}
          <div className="card">
            <div className="card-title" style={{color:'#d97706'}}>
              ⚡ C'est pour hier
              <span className="badge">{cphs.length}</span>
            </div>
            <div style={{fontSize:11, color:'#6b7a99', fontStyle:'italic', marginBottom:'0.6rem'}}>
              DSI · Equilab OT · CNES · Direction — urgence non planifiée
            </div>
            <div className="incident-list">
              {cphs.map(c => <IncidentItem key={c.id} item={c} badgeColor="#d97706" badge="⚡ CPH" onUpdate={updateIncident} onRemove={removeIncident} />)}
            </div>
            <AddForm domains={domains} onAdd={addCph} placeholder="Contexte de l'urgence…" showType={false} />
          </div>

          {/* Incidents */}
          <div className="card">
            <div className="card-title">
              🔴 Incidents & Blocages
              <span className="badge">{incidents.length}</span>
            </div>
            <div className="incident-list">
              {incidents.map(i => (
                <IncidentItem
                  key={i.id} item={i}
                  badgeColor={i.type === 'blocked' ? '#ef4444' : '#f59e0b'}
                  onUpdate={updateIncident} onRemove={removeIncident}
                />
              ))}
            </div>
            <AddForm domains={domains} onAdd={addIncident} placeholder="Description courte…" showType={true} />
          </div>
        </div>

        {/* Expertise */}
        <div className="card">
          <div className="card-title" style={{color:'#8b5cf6'}}>
            🟣 Expertise N3 & Appui technique
            <span className="badge">{expertises.length}</span>
          </div>
          <div style={{fontSize:11, color:'#6b7a99', fontStyle:'italic', marginBottom:'0.6rem'}}>
            Escalades N2→N3 · Appui OT Equilab · Appui équipes APP · Investigations · Demandes DSI
          </div>
          <div className="incident-list">
            {expertises.map(e => <IncidentItem key={e.id} item={e} badgeColor="#8b5cf6" onUpdate={updateExpertise} onRemove={removeExpertise} />)}
          </div>
          <AddForm domains={domains} onAdd={addExpertise} placeholder="Sujet d'expertise ou escalade…" showType={false} />
        </div>
      </div>
    </div>
  )
}
