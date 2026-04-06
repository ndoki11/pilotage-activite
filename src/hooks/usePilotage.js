import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function usePilotage() {
  const [poles, setPoles] = useState([])
  const [domains, setDomains] = useState([])
  const [projects, setProjects] = useState([])
  const [incidents, setIncidents] = useState([])
  const [expertises, setExpertises] = useState([])
  const [settings, setSettings] = useState({ period: 'Bilan au 15 avril 2026', period_days: 20 })
  const [loading, setLoading] = useState(true)

  // ── LOAD ALL ──
  const loadAll = useCallback(async () => {
    const [p, d, pr, i, e, s] = await Promise.all([
      supabase.from('poles').select('*').order('sort_order'),
      supabase.from('domains').select('*').order('sort_order'),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('incidents').select('*').order('created_at'),
      supabase.from('expertises').select('*').order('created_at'),
      supabase.from('settings').select('*'),
    ])
    setPoles(p.data || [])
    setDomains(d.data || [])
    setProjects(pr.data || [])
    setIncidents(i.data || [])
    setExpertises(e.data || [])
    if (s.data) {
      const obj = {}
      s.data.forEach(r => obj[r.key] = r.value)
      setSettings({ period: obj.period || 'Bilan au 15 avril 2026', period_days: parseInt(obj.period_days) || 20 })
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  // ── REALTIME ──
  useEffect(() => {
    const tables = ['poles', 'domains', 'projects', 'incidents', 'expertises', 'settings']
    const subs = tables.map(t =>
      supabase.channel(`${t}-changes`)
        .on('postgres_changes', { event: '*', schema: 'public', table: t }, () => loadAll())
        .subscribe()
    )
    return () => subs.forEach(s => supabase.removeChannel(s))
  }, [loadAll])

  // ── SETTINGS ──
  const updateSetting = async (key, value) => {
    await supabase.from('settings').upsert({ key, value: String(value) })
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  // ── DOMAINS ──
  const updateDomainRag = async (id, rag) => {
    await supabase.from('domains').update({ rag }).eq('id', id)
    setDomains(prev => prev.map(d => d.id === id ? { ...d, rag } : d))
  }
  const updateDomainComment = async (id, comment) => {
    await supabase.from('domains').update({ comment }).eq('id', id)
    setDomains(prev => prev.map(d => d.id === id ? { ...d, comment } : d))
  }
  const updateDomainDays = async (id, days) => {
    await supabase.from('domains').update({ days: parseFloat(days) }).eq('id', id)
    setDomains(prev => prev.map(d => d.id === id ? { ...d, days: parseFloat(days) } : d))
  }
  const addDomain = async (name, sub, poleId) => {
    const { data } = await supabase.from('domains').insert({ id: name, pole_id: poleId, name, sub, rag: 'G', comment: '', days: 0, color: '#6b7a99', sort_order: domains.length + 1 }).select()
    if (data) setDomains(prev => [...prev, data[0]])
  }
  const removeDomain = async (id) => {
    await supabase.from('projects').delete().eq('domain_id', id)
    await supabase.from('domains').delete().eq('id', id)
    setDomains(prev => prev.filter(d => d.id !== id))
    setProjects(prev => prev.filter(p => p.domain_id !== id))
  }

  // ── PROJECTS ──
  const updateProject = async (id, field, value) => {
    await supabase.from('projects').update({ [field]: value }).eq('id', id)
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }
  const addProject = async (name, domainId, prio = 'M') => {
    const id = 'p_' + Date.now()
    const { data } = await supabase.from('projects').insert({ id, domain_id: domainId, name, prio, pct: 0, rag: 'G', decision: '', sort_order: projects.length + 1 }).select()
    if (data) setProjects(prev => [...prev, data[0]])
  }
  const removeProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  // ── INCIDENTS ──
  const addIncident = async (domainId, type, text) => {
    const id = 'i_' + Date.now()
    const { data } = await supabase.from('incidents').insert({ id, domain_id: domainId, type, text }).select()
    if (data) setIncidents(prev => [...prev, data[0]])
  }
  const updateIncident = async (id, text) => {
    await supabase.from('incidents').update({ text }).eq('id', id)
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, text } : i))
  }
  const removeIncident = async (id) => {
    await supabase.from('incidents').delete().eq('id', id)
    setIncidents(prev => prev.filter(i => i.id !== id))
  }

  // ── EXPERTISES ──
  const addExpertise = async (domainId, text) => {
    const id = 'e_' + Date.now()
    const { data } = await supabase.from('expertises').insert({ id, domain_id: domainId, text }).select()
    if (data) setExpertises(prev => [...prev, data[0]])
  }
  const updateExpertise = async (id, text) => {
    await supabase.from('expertises').update({ text }).eq('id', id)
    setExpertises(prev => prev.map(e => e.id === id ? { ...e, text } : e))
  }
  const removeExpertise = async (id) => {
    await supabase.from('expertises').delete().eq('id', id)
    setExpertises(prev => prev.filter(e => e.id !== id))
  }

  return {
    poles, domains, projects,
    incidents: incidents.filter(i => i.type !== 'cph'),
    cphs: incidents.filter(i => i.type === 'cph'),
    expertises, settings, loading,
    updateSetting,
    updateDomainRag, updateDomainComment, updateDomainDays, addDomain, removeDomain,
    updateProject, addProject, removeProject,
    addIncident, updateIncident, removeIncident,
    addExpertise, updateExpertise, removeExpertise,
  }
}
