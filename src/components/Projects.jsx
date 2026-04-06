import { useState } from 'react'
import { RAG, PHASES, cycleRag, getPhase } from '../lib/constants'
import { AddProjectModal } from './Modal'

export default function Projects({ poles, domains, projects, updateProject, addProject, removeProject }) {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="container">
      <div className="table-header-row">
        <span className="table-hint">Cliquer sur une cellule pour éditer · Statut = clic pour changer</span>
        <button className="btn btn-gold" onClick={() => setShowAdd(true)}>+ Ajouter un projet</button>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
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
            {projects.map(p => {
              const rag   = RAG[p.rag]   || RAG.G
              const phase = getPhase(p.pct)
              const dom   = domains.find(d => d.id === p.domain_id)
              return (
                <tr key={p.id}>
                  <td>
                    <input
                      className="cell-input fw"
                      defaultValue={p.name}
                      onBlur={e => { if(e.target.value !== p.name) updateProject(p.id, { name: e.target.value }) }}
                    />
                  </td>
                  <td>
                    <select
                      className="cell-select"
                      value={p.domain_id || ''}
                      onChange={e => updateProject(p.id, { domain_id: e.target.value })}
                    >
                      {poles.map(pole => (
                        <optgroup key={pole.id} label={`${pole.icon} ${pole.name}`}>
                          {domains.filter(d => d.pole_id === pole.id).map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="cell-select"
                      value={p.prio}
                      onChange={e => updateProject(p.id, { prio: e.target.value })}
                    >
                      <option value="H">HAUTE</option>
                      <option value="M">MOYENNE</option>
                      <option value="B">BASSE</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="phase-select"
                      value={p.pct}
                      style={{background:phase.bg, color:phase.color}}
                      onChange={e => updateProject(p.id, { pct: +e.target.value })}
                    >
                      {PHASES.map(ph => (
                        <option key={ph.pct} value={ph.pct} style={{background:ph.bg, color:ph.color}}>
                          {ph.label} — {ph.pct}%
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="rag-btn"
                      style={{background:rag.bg, color:rag.color}}
                      onClick={() => updateProject(p.id, { rag: cycleRag(p.rag) })}
                    >
                      <span style={{width:7,height:7,borderRadius:'50%',background:rag.dot,display:'inline-block',marginRight:5}}/>
                      {rag.label}
                    </button>
                  </td>
                  <td>
                    <input
                      className="cell-input decision"
                      defaultValue={p.decision || ''}
                      onBlur={e => { if(e.target.value !== p.decision) updateProject(p.id, { decision: e.target.value }) }}
                      placeholder="—"
                    />
                  </td>
                  <td>
                    <button className="del-btn" onClick={() => confirm('Supprimer ?') && removeProject(p.id)}>✕</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddProjectModal
          poles={poles}
          domains={domains}
          onAdd={addProject}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  )
}
