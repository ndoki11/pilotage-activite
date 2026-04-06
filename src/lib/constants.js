export const RAG = {
  G: { label: 'Nominal',   bg: '#dcfce7', color: '#166534', dot: '#22c55e' },
  O: { label: 'Attention', bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  R: { label: 'Bloqué',    bg: '#fee2e2', color: '#991b1b', dot: '#ef4444' },
}

export const PHASES = [
  { pct: 0,   label: '🔲 Étude',      bg: '#f1f5f9', color: '#475569' },
  { pct: 25,  label: '📐 Cadrage',    bg: '#dbeafe', color: '#1d4ed8' },
  { pct: 50,  label: '⚙️ Build',      bg: '#fef3c7', color: '#92400e' },
  { pct: 75,  label: '🧪 Livraison',  bg: '#dcfce7', color: '#166534' },
  { pct: 100, label: '✅ Production', bg: '#1a2545', color: '#ffffff' },
]

export const cycleRag = r => ({ G:'O', O:'R', R:'G' }[r] || 'G')
export const getPhase = pct => PHASES.find(p => p.pct === +pct) || PHASES[0]
export const uid = () => '_' + Math.random().toString(36).slice(2, 9)
