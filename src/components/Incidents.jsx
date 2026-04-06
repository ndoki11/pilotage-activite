import { useState } from 'react'
import { AddIncidentModal } from './Modal'

function ItemList({ items, domains, borderColor, onUpdate, onRemove, badge }) {
  if (!items.length) return <p style={{fontSize:12, color:'#6b7a99', fontStyle:'italic', padding:'0.5rem 0'}}>Aucun élément</p>
  return (
    <div className="incident-list">
      {items.map(item => {
        const dom = domains.find(d => d.id === item.domain_id)
        return (
          <div key={item.id} className="incident-item" style={{borderLeftColor: borderColor(item)}}>
            <div className="incident-domain">{dom?.name || '—'}</div>
            <div
              className="incident-text"
              contentEditable
              suppressContentEditableWarning
              onBlur={e => onUpdate(item.id, e.target.innerText.trim())}
            >{item.text}</div>
            {badge && <span className="inc-badge" style={{background: borderColor(item)}}>{badge(item)}</span>}
            <button className="del-btn" onClick={() => onRemove(item.id)}>✕</button>
          </div>
        )
      })}
    </div>
  )
}

export default function Incidents({ domains, incidents, cphs, expertises, addIncident, updateIncident, removeIncident, addExpertise, updateExpertise, removeExpertise }) {
  const [modal, setModal] = useState(null) // 'cph' | 'incident' | 'expertise' | null

  const handleAdd = (domainId, type, text) => {
    if (modal === 'expertise') addExpertise(domainId, text)
    else addIncident(domainId, type, text)
  }

  return (
    <div className="container">
      <div className="grid-2">

        {/* Gauche : CPH + Incidents */}
        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>

          {/* C'est pour hier */}
          <div className="card">
            <div className="card-title" style={{color:'#d97706', justifyContent:'space-between'}}>
              <span>⚡ C'est pour hier <span className="badge">{cphs.length}</span></span>
              <button className="btn-add-small" onClick={() => setModal('cph')}>+ Ajouter</button>
            </div>
            <p style={{fontSize:11, color:'#6b7a99', fontStyle:'italic', marginBottom:'0.6rem'}}>
              DSI · Equilab OT · CNES · Direction — urgence non planifiée
            </p>
            <ItemList
              items={cphs} domains={domains}
              borderColor={() => '#d97706'}
              badge={() => '⚡ CPH'}
              onUpdate={updateIncident} onRemove={removeIncident}
            />
          </div>

          {/* Incidents */}
          <div className="card">
            <div className="card-title" style={{justifyContent:'space-between'}}>
              <span>🔴 Incidents & Blocages <span className="badge">{incidents.length}</span></span>
              <button className="btn-add-small" onClick={() => setModal('incident')}>+ Ajouter</button>
            </div>
            <ItemList
              items={incidents} domains={domains}
              borderColor={i => i.type === 'blocked' ? '#ef4444' : '#f59e0b'}
              onUpdate={updateIncident} onRemove={removeIncident}
            />
          </div>
        </div>

        {/* Droite : Expertise */}
        <div className="card">
          <div className="card-title" style={{color:'#8b5cf6', justifyContent:'space-between'}}>
            <span>🟣 Expertise N3 <span className="badge">{expertises.length}</span></span>
            <button className="btn-add-small" onClick={() => setModal('expertise')}>+ Ajouter</button>
          </div>
          <p style={{fontSize:11, color:'#6b7a99', fontStyle:'italic', marginBottom:'0.6rem'}}>
            Escalades N2→N3 · Appui OT Equilab · Appui équipes APP · Investigations
          </p>
          <ItemList
            items={expertises} domains={domains}
            borderColor={() => '#8b5cf6'}
            onUpdate={updateExpertise} onRemove={removeExpertise}
          />
        </div>
      </div>

      {modal && (
        <AddIncidentModal
          domains={domains}
          type={modal === 'expertise' ? null : modal}
          onAdd={handleAdd}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
