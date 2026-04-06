import { RAG, PHASES, cycleRag } from '../lib/constants'

export default function Projects({ poles, domains, projects, updateProject, addProject, removeProject }) {

  const handleAdd = () => {
    const name = prompt('Nom du projet :')
    if (!name) return
    let choiceStr = ''
    let domainList = []
    poles.forEach(pole => {
      const pDomains = domains.filter(d => d.pole_id === pole.id)
      if (pDomains.length) {
        choiceStr += `\n${pole.icon} ${pole.name}\n`
        pDomains.forEach(d => { domainList.push(d); choiceStr += `  ${domainList.length}. ${d.name}\n` })
      }
    })
    const idx = parseInt(prompt(`Dans quel domaine ?\n${choiceStr}\nNuméro :`) || '1') - 1
    const domain = domainList[idx]?.id || domains[0]?.id
    if (domain) addProject(name, domain)
  }

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
        <span style={{fontSize:12, color:'#6b7a99', fontStyle:'italic'}}>
          Cliquer sur une cellule pour éditer · Cliquer sur le statut pour le faire tourner
        </span>
        <button className="btn btn-gold" onClick={handleAdd}>+ Ajouter un projet</button>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Projet / Initiative</th>
              <th>Domaine</th>
              <th>Priorité</th>
              <th>Phase & Avancement</th>
              <th>Statut</th>
              <th>Décision / Blocage</th>
              <th style={{width:32}} />
            </tr>
          </thead>
          <tbody>
            {projects.map(p => {
              const rag = RAG[p.rag] || RAG.G
              const phase = PHASES.find(ph => ph.pct === +p.pct) || PHASES[0]
              return (
                <tr key={p.id}>
                  <td>
                    <input
                      className="cell-input"
                      defaultValue={p.name}
                      onBlur={e => updateProject(p.id, 'name', e.target.value)}
                      style={{fontWeight:600}}
                    />
                  </td>
                  <td>
                    <select
                      className="cell-select"
                      value={p.domain_id}
                      onChange={e => updateProject(p.id, 'domain_id', e.target.value)}
                    >
                      {domains.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </td>
                  <td>
                    <select
                      className="cell-select"
                      value={p.prio}
                      onChange={e => updateProject(p.id, 'prio', e.target.value)}
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
                      style={{background: phase.color, color: phase.textColor}}
                      onChange={e => updateProject(p.id, 'pct', +e.target.value)}
                    >
                      {PHASES.map(ph => (
                        <option key={ph.pct} value={ph.pct} style={{background:ph.color, color:ph.textColor}}>
                          {ph.label} — {ph.pct}%
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="rag-badge"
                      style={{background:rag.bg, color:rag.text}}
                      onClick={() => updateProject(p.id, 'rag', cycleRag(p.rag))}
                    >
                      <span style={{width:7,height:7,borderRadius:'50%',background:rag.dot,display:'inline-block',marginRight:5}} />
                      {rag.label}
                    </button>
                  </td>
                  <td>
                    <input
                      className="cell-input"
                      defaultValue={p.decision || ''}
                      onBlur={e => updateProject(p.id, 'decision', e.target.value)}
                      placeholder="—"
                      style={{fontStyle:'italic', color:'#f59e0b'}}
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
    </div>
  )
}
