const LAYERS = [
  {
    pole: '🏛 SI Interne & Expertise Système', poleColor: '#2d6be4',
    items: [
      { name: 'Identité & Accès',          sub: 'Entra ID · MFA TOTP · PIM · AD · SSO',               value: 'Qui peut accéder à quoi, depuis où. Couche de sécurité la plus fondamentale du SI.', business: 'Zéro compromission = zéro cyberattaque par credential.' },
      { name: 'Messagerie & Workspace',    sub: 'Exchange Online · Teams · SharePoint · Intune · M365', value: 'Collaboration quotidienne de 800 personnes. Une panne ici arrête toute l\'entreprise.', business: 'Productivité de l\'ensemble des collaborateurs. Licences E3 optimisées.' },
      { name: 'Infra Cloud & FinOps',      sub: 'AWS Landing Zone · Azure · CDK · FinOps',             value: 'Socle cloud de tous les projets de transformation. Garant que l\'innovation ne dérive pas sur le budget.', business: 'Enabler de GAÏA, IoT, GA Pro. Chaque euro optimisé = budget libéré.' },
      { name: 'Infrastructure Legacy',     sub: 'VMware ESXi DC Equinix · Hyper-V usines · Zabbix',    value: 'L\'existant qui tourne pendant la transformation cloud. Décommission AD local en cours.', business: 'Continuité opérationnelle sans interruption de service.' },
      { name: 'Sécurité & Résilience',     sub: 'PRA/PRI · Azure Site Recovery · Trivy · Backup',      value: 'PRA sites usines déployé et validé. DevSecOps sur tous les pipelines CI/CD.', business: 'Zéro perte de données, reprise garantie sur l\'ensemble des sites.' },
      { name: 'Applications & Intégration',sub: 'Prefabin AWS · API BIM Trimble · IFS connecteurs',    value: 'API et connecteurs entre les outils métier. Prefabin en production.', business: 'Fluidité du flux d\'information entre BIM, usines et chantiers.' },
      { name: 'Support N3 & Architecture', sub: 'Escalades N1/N2 · Appui OT Equilab · CODIR · DSI',   value: 'Point d\'entrée technique unique. Déblocage d\'urgence, expertise, cadrage CODIR.', business: 'Réduction du time-to-resolution. Qualité des décisions techniques.' },
      { name: 'Veille Technologique',      sub: 'Cloud · IA · Sécurité · DevSecOps · Architecture',   value: 'Choix faits avant que les mauvais soient imposés. Pas de ticket GLPI, mais centrale.', business: 'Qualité des choix d\'architecture à 3 ans. Positionnement précoce.' },
    ]
  },
  {
    pole: '🏗 Smart Building & IoT', poleColor: '#16a085',
    items: [
      { name: 'IoT Platform AWS',          sub: 'Greengrass · IoT Core · Kinesis · S3 · Glue',         value: 'Plateforme livrée 2024. 10 bâtiments contractualisés. N2 en exploitation. Expertise N3 au-dessus pour le service énergie Equilab.', business: '100k€ revenus récurrents annuels. ROI ×2 dès la 1ère année.' },
      { name: 'Infrastructures Smart GTB', sub: 'Proxmox clusters · Zabbix bâtiments · NIWA',          value: 'Infrastructure déployée dans les bâtiments GA. POC NIWA 1 an en prod. Catalogue de services en construction.', business: 'Réduction du coût infra par bâtiment. Offre de services standardisée à venir.' },
      { name: 'Infra Sites & OT/IT',       sub: 'Automates GTB · Capteurs BLE · GA Pro Supabase',      value: 'Intégration OT/IT sur sites industriels. GA Pro (iOS/Android) pour maintenance capteurs BLE. Supabase AWS ECS Fargate.', business: 'Outillage équipes terrain. Nouveau service à monétiser.' },
    ]
  },
  {
    pole: '🧠 Data & IA', poleColor: '#9b59b6',
    items: [
      { name: 'Plateforme IA — GAÏA',      sub: 'LibreChat · AWS Bedrock Claude · LiteLLM · MCP',      value: 'IA générative souveraine. AWS Paris (RGPD). SSO Entra ID. MCP pour intégration M365. Piloté et conduit par C. Arnault.', business: 'Souveraineté des données. Élimination Shadow IT IA. ~1 800€/mois pour 800 collaborateurs.' },
      { name: 'Data Platform & BI',        sub: 'IFS Fabric F2 · ADLS Gen2 · Power BI · Datapump',     value: 'IFS ERP → Datapump → ADLS Gen2 → Fabric F2 → Power BI. Intelligence décisionnelle pour les directions.', business: 'Pilotage par la donnée. Fondation pour l\'IA métier future.' },
    ]
  }
]

const RULES = [
  { icon: '✦', text: 'Un incident = une ligne courte. Le dashboard est un outil de signal, pas de documentation technique.' },
  { icon: '✦', text: 'La Veille = toujours 1 à 2 jours alloués. Le commentaire du domaine note ce qui a été exploré.' },
  { icon: '✦', text: 'Ne pas reconstituer le passé. Si le dashboard n\'a pas été ouvert 2 semaines, faire un état des lieux à aujourd\'hui.' },
  { icon: '✦', text: 'Un % faux est pire qu\'un % absent. Si bloqué, passer en orange avec une décision attendue.' },
  { icon: '⚡', text: 'Toute urgence CPH se note. Même rapidement. Une urgence non tracée = valeur qui disparaît.' },
  { icon: '✦', text: 'Supabase est la source de vérité. Tout changement est sauvegardé instantanément et synchronisé sur tous tes appareils.' },
]

export default function Notice({ onNavigate }) {
  return (
    <div className="container notice-container">

      {/* MANIFESTE */}
      <div className="notice-hero">
        <div className="notice-hero-label">Notice & Manifeste · Dashboard Pilotage Activité</div>
        <h1 className="notice-hero-title">Pourquoi je structure<br/>mon activité.</h1>
        <p className="notice-hero-sub">Un architecte qui ne rend pas son travail visible est un architecte invisible.</p>
        <div className="notice-hero-rule"/>
        <p className="notice-hero-by">Christopher Arnault · Responsable Technique — Architecture & Expertise<br/>GA Smart Building · DDSI · Toulouse</p>
      </div>

      {/* POURQUOI */}
      <div className="notice-section">
        <div className="notice-section-label">01 — Le pourquoi</div>
        <h2 className="notice-section-title">Mon travail existe.<br/>Il faut le rendre visible.</h2>
        <div className="notice-lead">
          Un architecte N3 seul sur un spectre aussi large — cloud, data, IA, IoT, identité, legacy, smart building — produit une valeur immense et diffuse. Diffuse veut dire invisible. Invisible veut dire sous-estimé.
        </div>
        <p className="notice-p">Ce dashboard n'est pas un outil de reporting pour Étienne. C'est d'abord <strong>un outil de conscience de moi-même</strong>. Il me permet de voir, en un coup d'œil, sur quoi je passe réellement mon temps, ce qui avance, ce qui bloque, ce qui a besoin d'une décision que je ne peux pas prendre seul.</p>
        <p className="notice-p">Sans structure, les urgences écrasent les projets stratégiques. Tout ce qui tient — l'identité qui ne tombe pas, le cloud qui ne coûte pas trop, l'IA qui fonctionne — devient invisible précisément parce que ça fonctionne. <strong>La fiabilité est silencieuse. Ce dashboard lui donne une voix.</strong></p>
        <div className="notice-mantra">
          <p>Je ne structure pas mon activité pour la montrer.<br/>Je la structure pour ne pas la subir.</p>
        </div>
      </div>

      {/* STACK */}
      <div className="notice-section">
        <div className="notice-section-label">02 — La stack technique</div>
        <h2 className="notice-section-title">Une vraie app,<br/>pas un fichier bricolé.</h2>
        <div className="notice-lead">
          Ce dashboard tourne sur une architecture professionnelle. Accessible depuis n'importe quel appareil, synchronisé en temps réel, données persistantes.
        </div>
        <div className="stack-grid">
          {[
            { name:'Supabase', role:'Base de données PostgreSQL', detail:'Source de vérité unique. Toutes les modifications sont sauvegardées instantanément. Realtime websocket pour la synchronisation multi-device.', color:'#1a7c4a' },
            { name:'React + Vite', role:'Interface utilisateur', detail:'Mises à jour optimistes — l\'écran se met à jour immédiatement, Supabase suit en arrière-plan. Zéro latence perçue.', color:'#2d6be4' },
            { name:'Vercel', role:'Déploiement & hébergement', detail:'Déploiement automatique à chaque push GitHub. URL fixe accessible partout. Build en 2 minutes.', color:'#000000' },
            { name:'GitHub', role:'Versioning du code', detail:'Repo privé. Chaque modification du code est versionnée. Retour arrière possible à tout moment.', color:'#333333' },
          ].map(s => (
            <div key={s.name} className="stack-card" style={{borderTop:`3px solid ${s.color}`}}>
              <div className="stack-name" style={{color:s.color}}>{s.name}</div>
              <div className="stack-role">{s.role}</div>
              <div className="stack-detail">{s.detail}</div>
            </div>
          ))}
        </div>
        <div className="notice-mantra" style={{marginTop:'1.5rem'}}>
          <p>Règle unique : setState() d'abord, Supabase ensuite.<br/>L'écran ne attend jamais le réseau.</p>
        </div>
      </div>

      {/* ARCHITECTURE PAR COUCHE */}
      <div className="notice-section">
        <div className="notice-section-label">03 — Architecture par couche</div>
        <h2 className="notice-section-title">Les 13 domaines.<br/>Leur rôle. Leur valeur.</h2>
        <div className="notice-lead">
          Chaque domaine correspond à une couche réelle de l'architecture GA Smart Building, répartis en 3 pôles de valeur distincts.
        </div>
        {LAYERS.map(layer => (
          <div key={layer.pole} className="layer-group">
            <div className="layer-pole-title" style={{color:layer.poleColor, borderBottomColor:layer.poleColor+'44'}}>{layer.pole}</div>
            {layer.items.map(item => (
              <div key={item.name} className="layer-row">
                <div className="layer-left">
                  <div className="layer-name">{item.name}</div>
                  <div className="layer-sub">{item.sub}</div>
                </div>
                <div className="layer-right">
                  <div className="layer-value">{item.value}</div>
                  <div className="layer-business">💼 {item.business}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* GUIDE D'USAGE */}
      <div className="notice-section">
        <div className="notice-section-label">04 — Guide d'usage</div>
        <h2 className="notice-section-title">Comment utiliser le dashboard<br/>sans que ça devienne une corvée.</h2>
        <div className="notice-routines">
          {[
            {
              freq: 'Au quotidien — 2 min', color: '#fef3c7',
              steps: [
                'Un statut RAG change → onglet Domaines, clic sur le badge.',
                'Un projet avance → onglet Projets, changer la phase.',
                'Une urgence arrive → onglet Incidents, section "C\'est pour hier".',
                'Une décision est attendue → noter dans le champ Décision du projet.',
              ]
            },
            {
              freq: 'OTO lundi avec Étienne — 10 min', color: '#dcfce7',
              steps: [
                'Ouvrir l\'app sur le Mac.',
                'Parcourir Domaines & Statuts ensemble — c\'est la base de discussion.',
                'Identifier les projets bloqués et les décisions à escalader.',
                'Ajuster les jours dans Charge si la semaine a été atypique.',
              ]
            },
            {
              freq: 'Bilan J15 & J30 — 10 min', color: '#dbeafe',
              steps: [
                'Mettre à jour la période en haut — ex : "Bilan au 30 avril 2026".',
                'Vérifier que les statuts et phases sont à jour.',
                'Aller sur Synthèse J15/J30 → screenshot de la zone blanche.',
                'Envoyer le screenshot à Étienne pour son reporting DSI.',
              ]
            },
          ].map(r => (
            <div key={r.freq} className="routine-block" style={{background:r.color}}>
              <div className="routine-freq">{r.freq}</div>
              <div className="routine-steps">
                {r.steps.map((s,i) => (
                  <div key={i} className="routine-step">
                    <span className="routine-num">{i+1}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RÈGLES */}
      <div className="notice-section">
        <div className="notice-section-label">05 — Les règles</div>
        <h2 className="notice-section-title">Ce qui fait que ça tient<br/>dans la durée.</h2>
        <div className="notice-rules">
          {RULES.map((r,i) => (
            <div key={i} className="notice-rule">
              <span className="rule-icon">{r.icon}</span>
              <span>{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGATION RAPIDE */}
      <div className="notice-section">
        <div className="notice-section-label">06 — Accès rapide</div>
        <h2 className="notice-section-title">Aller directement<br/>à l'essentiel.</h2>
        <div className="quick-links">
          {[
            { label:'🗂 Domaines & Statuts', tab:'domains',   desc:'Vue de contrôle — point d\'entrée quotidien' },
            { label:'📋 Projets',            tab:'projects',  desc:'Tableau avec filtres par pôle, domaine, statut' },
            { label:'⚖️ Charge',             tab:'charge',    desc:'Dispatcher les jours par domaine' },
            { label:'⚡ Incidents',          tab:'incidents', desc:'CPH, incidents, expertise N3' },
            { label:'📸 Synthèse J15/J30',   tab:'synthese',  desc:'Screenshot pour le reporting Étienne' },
          ].map(l => (
            <button key={l.tab} className="quick-link-btn" onClick={()=>onNavigate(l.tab)}>
              <div className="quick-link-label">{l.label}</div>
              <div className="quick-link-desc">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="notice-footer">
        <span>GA Smart Building · DDSI · Confidentiel</span>
        <span>Dashboard Pilotage Activité v2 · Supabase + React + Vercel · 2026</span>
        <div className="notice-mantra-small">Structurer, c'est valoriser.</div>
      </div>
    </div>
  )
}
