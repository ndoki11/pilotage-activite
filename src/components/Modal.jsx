import { useState, useEffect } from 'react'

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function AddProjectModal({ poles, domains, onAdd, onClose }) {
  const [name,     setName]     = useState('')
  const [domainId, setDomainId] = useState(domains[0]?.id || '')
  const [prio,     setPrio]     = useState('M')

  const handle = () => {
    if (!name.trim() || !domainId) return
    onAdd(name.trim(), domainId, prio)
    onClose()
  }

  return (
    <Modal title="Nouveau projet" onClose={onClose}>
      <div className="modal-body">
        <label className="form-label">Nom du projet</label>
        <input
          className="form-input"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          placeholder="Ex: GAÏA — Connecteur Leexi MCP"
          autoFocus
        />

        <label className="form-label">Domaine</label>
        <select className="form-select" value={domainId} onChange={e => setDomainId(e.target.value)}>
          {poles.map(pole => (
            <optgroup key={pole.id} label={`${pole.icon} ${pole.name}`}>
              {domains.filter(d => d.pole_id === pole.id).map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <label className="form-label">Priorité</label>
        <select className="form-select" value={prio} onChange={e => setPrio(e.target.value)}>
          <option value="H">🔴 HAUTE</option>
          <option value="M">🟡 MOYENNE</option>
          <option value="B">⚪ BASSE</option>
        </select>
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost-dark" onClick={onClose}>Annuler</button>
        <button className="btn btn-gold" onClick={handle} disabled={!name.trim()}>Créer le projet</button>
      </div>
    </Modal>
  )
}

export function AddDomainModal({ poles, onAdd, onClose }) {
  const [name,   setName]   = useState('')
  const [sub,    setSub]    = useState('')
  const [poleId, setPoleId] = useState(poles[0]?.id || '')

  const handle = () => {
    if (!name.trim()) return
    onAdd(name.trim(), sub.trim(), poleId)
    onClose()
  }

  return (
    <Modal title="Nouveau domaine" onClose={onClose}>
      <div className="modal-body">
        <label className="form-label">Nom du domaine</label>
        <input
          className="form-input"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          placeholder="Ex: Réseau & Connectivité"
          autoFocus
        />

        <label className="form-label">Technologies / Outils</label>
        <input
          className="form-input"
          value={sub}
          onChange={e => setSub(e.target.value)}
          placeholder="Ex: SDwan · Cisco · VPN"
        />

        <label className="form-label">Pôle</label>
        <select className="form-select" value={poleId} onChange={e => setPoleId(e.target.value)}>
          {poles.map(p => (
            <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
          ))}
        </select>
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost-dark" onClick={onClose}>Annuler</button>
        <button className="btn btn-gold" onClick={handle} disabled={!name.trim()}>Créer le domaine</button>
      </div>
    </Modal>
  )
}

export function EditDomainModal({ domain, poles, onSave, onClose }) {
  const [name,   setName]   = useState(domain.name)
  const [sub,    setSub]    = useState(domain.sub || '')
  const [poleId, setPoleId] = useState(domain.pole_id)

  const handle = () => {
    if (!name.trim()) return
    onSave(domain.id, { name: name.trim(), sub: sub.trim(), pole_id: poleId })
    onClose()
  }

  return (
    <Modal title="Modifier le domaine" onClose={onClose}>
      <div className="modal-body">
        <label className="form-label">Nom du domaine</label>
        <input className="form-input" value={name} onChange={e => setName(e.target.value)} autoFocus/>

        <label className="form-label">Technologies / Outils</label>
        <input className="form-input" value={sub} onChange={e => setSub(e.target.value)} placeholder="Ex: AWS · Azure"/>

        <label className="form-label">Pôle</label>
        <select className="form-select" value={poleId} onChange={e => setPoleId(e.target.value)}>
          {poles.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name}</option>)}
        </select>
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost-dark" onClick={onClose}>Annuler</button>
        <button className="btn btn-gold" onClick={handle} disabled={!name.trim()}>Enregistrer</button>
      </div>
    </Modal>
  )
}

export function AddIncidentModal({ domains, type, onAdd, onClose }) {
  const [domainId, setDomainId] = useState(domains[0]?.id || '')
  const [incType,  setIncType]  = useState(type || 'incident')
  const [text,     setText]     = useState('')

  const handle = () => {
    if (!text.trim()) return
    onAdd(domainId, incType, text.trim())
    onClose()
  }

  const titles = { cph: '⚡ C\'est pour hier', incident: 'Incident ou blocage', expertise: 'Expertise N3' }

  return (
    <Modal title={titles[type] || 'Nouvel item'} onClose={onClose}>
      <div className="modal-body">
        <label className="form-label">Domaine concerné</label>
        <select className="form-select" value={domainId} onChange={e => setDomainId(e.target.value)}>
          {domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>

        {!type && (
          <>
            <label className="form-label">Type</label>
            <select className="form-select" value={incType} onChange={e => setIncType(e.target.value)}>
              <option value="incident">🔴 Incident</option>
              <option value="blocked">⛔ Blocage</option>
            </select>
          </>
        )}

        <label className="form-label">Description</label>
        <input
          className="form-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          placeholder="Description courte…"
          autoFocus
        />
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost-dark" onClick={onClose}>Annuler</button>
        <button className="btn btn-gold" onClick={handle} disabled={!text.trim()}>Ajouter</button>
      </div>
    </Modal>
  )
}


