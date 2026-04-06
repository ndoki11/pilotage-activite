export const PHASES = [
  { pct: 0,   label: '🔲 Étude',      color: '#f1f5f9', textColor: '#475569' },
  { pct: 25,  label: '📐 Cadrage',    color: '#dbeafe', textColor: '#1d4ed8' },
  { pct: 50,  label: '⚙️ Build',      color: '#fef3c7', textColor: '#92400e' },
  { pct: 75,  label: '🧪 Livraison',  color: '#dcfce7', textColor: '#166534' },
  { pct: 100, label: '✅ Production', color: '#1a2545', textColor: '#ffffff' },
]

export const RAG = {
  G: { label: 'Nominal',   bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  O: { label: 'Attention', bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  R: { label: 'Bloqué',    bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
}

export const cycleRag = r => ({ G: 'O', O: 'R', R: 'G' }[r] || 'G')

export const getPhase = pct => PHASES.find(p => p.pct === +pct) || PHASES[0]

export const uid = () => '_' + Math.random().toString(36).slice(2, 9)
