import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

// ─────────────────────────────────────────────────────────
// RÈGLE UNIQUE : setState AVANT supabase, toujours.
// L'écran ne attend jamais le réseau.
// ─────────────────────────────────────────────────────────

export function usePilotage() {
  const [poles,      setPoles]      = useState([])
  const [domains,    setDomains]    = useState([])
  const [projects,   setProjects]   = useState([])
  const [incidents,  setIncidents]  = useState([])
  const [expertises, setExpertises] = useState([])
  const [settings,   setSettings]   = useState({ period: 'Bilan au 15 avril 2026', period_days: 20 })
  const [loading,    setLoading]    = useState(true)
  const [collapsed, setCollapsed] = useState({})

  const toggleCollapsed = (poleId) => {
    setCollapsed(prev => {
      const next = { ...prev, [poleId]: !prev[poleId] }
      try { localStorage.setItem('pilotage_collapsed', JSON.stringify(next)) } catch {}
      return next
    })
  }

  // ── Chargement initial ──────────────────────────────────
  const loadAll = useCallback(async () => {
    const [p, d, pr, i, e, s] = await Promise.all([
      supabase.from('poles').select('*').order('sort_order'),
      supabase.from('domains').select('*').order('sort_order'),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('incidents').select('*').order('created_at'),
      supabase.from('expertises').select('*').order('created_at'),
      supabase.from('settings').select('*'),
    ])
    if (p.data)  setPoles(p.data)
    if (d.data)  setDomains(d.data)
    if (pr.data) setProjects(pr.data)
    if (i.data)  setIncidents(i.data)
    if (e.data)  setExpertises(e.data)
    if (s.data) {
      const obj = Object.fromEntries(s.data.map(r => [r.key, r.value]))
      setSettings({ period: obj.period || 'Bilan au 15 avril 2026', period_days: parseInt(obj.period_days) || 20 })
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  // ── Realtime : sync multi-device ───────────────────────
  useEffect(() => {
    const channel = supabase.channel('pilotage-all')
    ;['poles','domains','projects','incidents','expertises','settings'].forEach(t => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table: t }, loadAll)
    })
    channel.subscribe()
    return () => supabase.removeChannel(channel)
  }, [loadAll])

  // ── Settings ───────────────────────────────────────────
  const updateSetting = (key, value) => {
    setSettings(s => ({ ...s, [key]: value }))
    supabase.from('settings').upsert({ key, value: String(value) })
  }

  // ── Domaines ───────────────────────────────────────────
  const updateDomain = (id, patch) => {
    setDomains(prev => prev.map(d => d.id === id ? { ...d, ...patch } : d))
    supabase.from('domains').update(patch).eq('id', id)
  }

  const addDomain = (name, sub, poleId) => {
    const d = { id: name, pole_id: poleId, name, sub, rag: 'G', comment: '', days: 0, color: '#6b7a99', sort_order: 99 }
    setDomains(prev => [...prev, d])
    supabase.from('domains').insert(d)
  }

  const removeDomain = (id) => {
    setDomains(prev => prev.filter(d => d.id !== id))
    setProjects(prev => prev.filter(p => p.domain_id !== id))
    supabase.from('projects').delete().eq('domain_id', id)
    supabase.from('domains').delete().eq('id', id)
  }

  // ── Projets ────────────────────────────────────────────
  const updateProject = (id, patch) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p))
    supabase.from('projects').update(patch).eq('id', id)
  }

  const addProject = (name, domainId, prio = 'M') => {
    const p = { id: uid(), domain_id: domainId, name, prio, pct: 0, rag: 'G', decision: '', sort_order: 99 }
    setProjects(prev => [...prev, p])
    supabase.from('projects').insert(p)
  }

  const removeProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    supabase.from('projects').delete().eq('id', id)
  }

  // ── Incidents ──────────────────────────────────────────
  const addIncident = (domainId, type, text) => {
    const i = { id: uid(), domain_id: domainId, type, text, created_at: new Date().toISOString() }
    setIncidents(prev => [...prev, i])
    supabase.from('incidents').insert(i)
  }

  const updateIncident = (id, text) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, text } : i))
    supabase.from('incidents').update({ text }).eq('id', id)
  }

  const removeIncident = (id) => {
    setIncidents(prev => prev.filter(i => i.id !== id))
    supabase.from('incidents').delete().eq('id', id)
  }

  // ── Expertises ─────────────────────────────────────────
  const addExpertise = (domainId, text) => {
    const e = { id: uid(), domain_id: domainId, text, created_at: new Date().toISOString() }
    setExpertises(prev => [...prev, e])
    supabase.from('expertises').insert(e)
  }

  const updateExpertise = (id, text) => {
    setExpertises(prev => prev.map(e => e.id === id ? { ...e, text } : e))
    supabase.from('expertises').update({ text }).eq('id', id)
  }

  const removeExpertise = (id) => {
    setExpertises(prev => prev.filter(e => e.id !== id))
    supabase.from('expertises').delete().eq('id', id)
  }

  return {
    poles, domains, projects,
    incidents:  incidents.filter(i => i.type !== 'cph'),
    cphs:       incidents.filter(i => i.type === 'cph'),
    expertises, settings, loading,
    collapsed, toggleCollapsed,
    updateSetting,
    updateDomain,  addDomain,  removeDomain,
    updateProject, addProject, removeProject,
    addIncident,   updateIncident,  removeIncident,
    addExpertise,  updateExpertise, removeExpertise,
  }
}

function uid() { return '_' + Math.random().toString(36).slice(2, 9) }
