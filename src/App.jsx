import { useState } from 'react'
import { usePilotage } from './hooks/usePilotage'
import Domains from './components/Domains'
import Projects from './components/Projects'
import Charge from './components/Charge'
import Incidents from './components/Incidents'
import Synthese from './components/Synthese'
import './index.css'

const TABS = [
  { id: 'domains',   label: '🗂 Domaines & Statuts' },
  { id: 'projects',  label: '📋 Projets' },
  { id: 'charge',    label: '⚖️ Charge' },
  { id: 'incidents', label: '⚡ Incidents & Expertise' },
  { id: 'synthese',  label: '📸 Synthèse J15/J30' },
]

export default function App() {
  const [tab, setTab] = useState('domains')
  const db = usePilotage()

  if (db.loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0f1729', color:'#d4a843', fontFamily:'DM Mono, monospace', fontSize:14 }}>
      Chargement…
    </div>
  )

  return (
    <div className="app">
      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-left">
          <span className="topbar-logo">⬡ PILOTAGE</span>
          <div className="period-input-wrap">
            <input
              className="period-input"
              value={db.settings.period}
              onChange={e => db.updateSetting('period', e.target.value)}
            />
          </div>
        </div>
        <div className="topbar-right">
          <button className="btn btn-gold" onClick={() => setTab('synthese')}>
            📸 Synthèse
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* VIEWS */}
      <div className="content">
        {tab === 'domains'   && <Domains   {...db} />}
        {tab === 'projects'  && <Projects  {...db} />}
        {tab === 'charge'    && <Charge    {...db} />}
        {tab === 'incidents' && <Incidents {...db} />}
        {tab === 'synthese'  && <Synthese  {...db} />}
      </div>
    </div>
  )
}
