const LAYERS = [
  { pole:'🏛 SI Interne & Expertise Système', poleColor:'#2d6be4', items:[
    { name:'Identité & Accès',          sub:'Entra ID · MFA TOTP · PIM · AD · SSO',               value:'Qui peut accéder à quoi. Couche de sécurité la plus fondamentale.',           business:'Zéro compromission = zéro cyberattaque par credential.' },
    { name:'Messagerie & Workspace',    sub:'Exchange Online · Teams · SharePoint · Intune',        value:'Collaboration de 800 personnes. Une panne ici arrête toute l\'entreprise.',    business:'Productivité globale. Licences E3 optimisées.' },
    { name:'Infra Cloud & FinOps',      sub:'AWS Landing Zone · Azure · CDK TypeScript · FinOps',   value:'Socle de tous les projets. Garant que l\'innovation ne dérive pas en coût.',   business:'Enabler GAÏA, IoT, GA Pro. Chaque euro optimisé = budget innovation.' },
    { name:'Infrastructure Legacy',     sub:'VMware ESXi Equinix · Hyper-V usines · Zabbix',        value:'L\'existant qui tourne pendant la transformation. Décommission AD en cours.',   business:'Continuité sans interruption de service.' },
    { name:'Sécurité & Résilience',     sub:'PRA · Azure Site Recovery usines · Trivy · Backup',    value:'PRA sites usines validé. DevSecOps sur tous les pipelines CI/CD.',            business:'Zéro perte de données. Reprise garantie.' },
    { name:'Applications & Intégration',sub:'Prefabin AWS · API BIM Trimble · IFS connecteurs',     value:'Connecteurs entre outils métier. Prefabin en production.',                    business:'Fluidité BIM → usines → chantiers.' },
    { name:'Support N3 & Architecture', sub:'Escalades N1/N2 · Appui OT Equilab · CODIR · DSI',    value:'Point d\'entrée technique unique. Déblocage urgence, expertise, cadrage.',     business:'Réduction time-to-resolution. Qualité des décisions CODIR.' },
    { name:'Veille Technologique',      sub:'Cloud · IA · Sécurité · DevSecOps · Architecture',     value:'Choix faits avant que les mauvais soient imposés. Invisible mais centrale.',   business:'Qualité des choix à 3 ans. Positionnement précoce.' },
  ]},
  { pole:'🏗 Smart Building & IoT', poleColor:'#16a085', items:[
    { name:'IoT Platform AWS',          sub:'Greengrass · IoT Core · Kinesis · S3 · Glue',          value:'Plateforme livrée 2024. 10 bâtiments. N2 exploitation. N3 expertise au-dessus.', business:'100k€ revenus récurrents. ROI ×2 an 1.' },
    { name:'Infrastructures Smart GTB', sub:'Proxmox clusters · Zabbix bâtiments · NIWA',           value:'Infrastructure bâtiments GA. POC NIWA 1 an en prod. Catalogue en construction.', business:'Réduction coût infra/bâtiment. Offre standardisée à venir.' },
    { name:'Infra Sites & OT/IT',       sub:'Automates GTB · Capteurs BLE · GA Pro Supabase',       value:'OT/IT sites industriels. GA Pro iOS/Android maintenance BLE.',                  business:'Outillage terrain. Nouveau service à monétiser.' },
  ]},
  { pole:'🧠 Data & IA', poleColor:'#9b59b6', items:[
    { name:'Plateforme IA — GAÏA',      sub:'LibreChat · AWS Bedrock Claude · LiteLLM · MCP',       value:'IA souveraine AWS Paris (RGPD). SSO Entra. MCP M365. Piloté par C. Arnault.',   business:'Souveraineté données. ~1 800€/mois pour 800 collaborateurs.' },
    { name:'Data Platform & BI',        sub:'IFS Fabric F2 · ADLS Gen2 · Power BI · Datapump',      value:'IFS ERP → Fabric → Power BI. Intelligence décisionnelle pour les directions.',  business:'Pilotage par la donnée. Fondation IA métier future.' },
  ]},
]

const RULES = [
  { icon:'✦', text:'Un incident = une ligne courte. Signal, pas documentation.' },
  { icon:'✦', text:'Veille = toujours 1-2j alloués. Commenter ce qui a été exploré.' },
  { icon:'✦', text:'Ne pas reconstituer le passé. État des lieux à aujourd\'hui si absent 2 semaines.' },
  { icon:'✦', text:'Un % faux est pire qu\'absent. Mettre orange + décision attendue si incertain.' },
  { icon:'⚡', text:'Toute urgence CPH se note. Urgence non tracée = valeur disparue.' },
  { icon:'✦', text:'Supabase est la source de vérité. Synchronisé sur tous les appareils instantanément.' },
]

export default function Notice({ onNavigate }) {
  return (
    <div className="container notice-container">

      {/* ALERTE CRITIQUE */}
      <div className="notice-alert">
        <div className="notice-alert-icon">⚠️</div>
        <div>
          <div className="notice-alert-title">Règle DevOps — à ne jamais enfreindre</div>
          <div className="notice-alert-text">
            Le fichier SQL schema (<code>supabase_schema.sql</code>) ne doit être exécuté qu'<strong>une seule fois</strong>, lors de la création initiale de la base. Le relancer écrasera ou recréera des données. <strong>Tes suppressions et modifications seraient perdues.</strong><br/>
            Le code (GitHub → Vercel) ne touche jamais aux données. Seul toi touches aux données via l'app ou Supabase Table Editor.
          </div>
        </div>
      </div>

      {/* MANIFESTE */}
      <div className="notice-hero">
        <div className="notice-hero-label">Notice & Manifeste · Dashboard Pilotage Activité v2</div>
        <h1 className="notice-hero-title">Pourquoi je structure<br/>mon activité.</h1>
        <p className="notice-hero-sub">Un architecte qui ne rend pas son travail visible est un architecte invisible.</p>
        <div className="notice-hero-rule"/>
        <p className="notice-hero-by">Christopher Arnault · Responsable Technique — Architecture & Expertise<br/>GA Smart Building · DDSI · Toulouse</p>
      </div>

      {/* POURQUOI */}
      <div className="notice-section">
        <div className="notice-section-label">01 — Le pourquoi</div>
        <h2 className="notice-section-title">Mon travail existe.<br/>Il faut le rendre visible.</h2>
        <div className="notice-lead">Un architecte N3 seul sur un spectre aussi large — cloud, data, IA, IoT, identité, legacy, smart building — produit une valeur immense et diffuse. Diffuse veut dire invisible. Invisible veut dire sous-estimé.</div>
        <p className="notice-p">Ce dashboard n'est pas un outil de reporting pour Étienne. C'est d'abord <strong>un outil de conscience de moi-même</strong>. Il permet de voir sur quoi je passe réellement mon temps, ce qui avance, ce qui bloque, ce qui nécessite une décision.</p>
        <p className="notice-p">Sans structure, les urgences écrasent les projets stratégiques. Tout ce qui tient — l'identité qui ne tombe pas, l'IA qui fonctionne — devient invisible parce que ça fonctionne. <strong>La fiabilité est silencieuse. Ce dashboard lui donne une voix.</strong></p>
        <div className="notice-mantra"><p>Je ne structure pas mon activité pour la montrer.<br/>Je la structure pour ne pas la subir.</p></div>
      </div>

      {/* SCHÉMA FLUX LOGIQUE */}
      <div className="notice-section">
        <div className="notice-section-label">02 — Schéma flux logique métier</div>
        <h2 className="notice-section-title">Comment les données<br/>circulent dans l'app.</h2>
        <div className="notice-lead">Une règle unique gouverne toute l'application : <strong>setState() d'abord, Supabase ensuite.</strong> L'écran ne attend jamais le réseau.</div>

        <div className="flux-schema">
          {/* Supabase */}
          <div className="flux-row">
            <div className="flux-box flux-teal">
              <div className="flux-box-title">Supabase</div>
              <div className="flux-box-sub">Source de vérité unique</div>
            </div>
          </div>
          <div className="flux-arrows-center">
            <div className="flux-arrow-label">loadAll() au démarrage</div>
            <div className="flux-arrow">↓</div>
            <div className="flux-arrow-side">realtime websocket ↺</div>
          </div>
          {/* État React */}
          <div className="flux-row">
            <div className="flux-box flux-purple">
              <div className="flux-box-title">État React</div>
              <div className="flux-box-sub">poles · domains · projects · incidents</div>
            </div>
          </div>
          <div className="flux-arrows-center">
            <div className="flux-arrow">↓</div>
            <div className="flux-arrow-label">5 vues lisent l'état</div>
          </div>
          {/* 5 vues */}
          <div className="flux-row flux-5col">
            {['Domaines','Projets','Charge','Incidents','Synthèse'].map(v=>(
              <div key={v} className="flux-box flux-blue flux-small">{v}</div>
            ))}
          </div>
          <div className="flux-arrows-center">
            <div className="flux-arrow">↓</div>
            <div className="flux-arrow-label">Toute modification →</div>
          </div>
          {/* Règle optimiste */}
          <div className="flux-row">
            <div className="flux-box flux-amber">
              <div className="flux-box-title">Mise à jour optimiste</div>
              <div className="flux-box-sub">setState() immédiat → Supabase en arrière-plan</div>
            </div>
          </div>
          {/* 3 liaisons */}
          <div className="flux-row flux-3col" style={{marginTop:'1rem'}}>
            {[
              { title:'Projets → Domaines', sub:'Nom modifié = fiche suit immédiatement' },
              { title:'RAG → partout',       sub:'Statut = couleur puce domaine + synthèse' },
              { title:'Jours → Charge',      sub:'Slider = barre charge temps réel' },
            ].map(l=>(
              <div key={l.title} className="flux-box flux-coral flux-small">
                <div className="flux-box-title">{l.title}</div>
                <div className="flux-box-sub">{l.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STACK */}
      <div className="notice-section">
        <div className="notice-section-label">03 — Stack technique</div>
        <h2 className="notice-section-title">Une vraie app,<br/>pas un fichier bricolé.</h2>
        <div className="stack-grid">
          {[
            { name:'Supabase',    role:'Base de données PostgreSQL', detail:'Source de vérité. Realtime websocket. Synchronisation multi-device instantanée.', color:'#1a7c4a' },
            { name:'React + Vite',role:'Interface utilisateur',      detail:'Mises à jour optimistes — écran immédiat, Supabase en arrière-plan. Zéro latence.', color:'#2d6be4' },
            { name:'Vercel',      role:'Déploiement automatique',    detail:'Push GitHub → build → déploiement en 2 min. URL fixe. Accessible partout.', color:'#000' },
            { name:'GitHub',      role:'Versioning du code',         detail:'Repo public. Code versionné. Retour arrière possible. Données jamais dans le code.', color:'#333' },
          ].map(s=>(
            <div key={s.name} className="stack-card" style={{borderTop:`3px solid ${s.color}`}}>
              <div className="stack-name" style={{color:s.color}}>{s.name}</div>
              <div className="stack-role">{s.role}</div>
              <div className="stack-detail">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COUCHES */}
      <div className="notice-section">
        <div className="notice-section-label">04 — Architecture par couche</div>
        <h2 className="notice-section-title">Les 13 domaines.<br/>Leur rôle. Leur valeur.</h2>
        {LAYERS.map(layer=>(
          <div key={layer.pole} className="layer-group">
            <div className="layer-pole-title" style={{color:layer.poleColor,borderBottomColor:layer.poleColor+'44'}}>{layer.pole}</div>
            {layer.items.map(item=>(
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
        <div className="notice-section-label">05 — Guide d'usage</div>
        <h2 className="notice-section-title">La routine minimale<br/>pour que ça tienne.</h2>
        <div className="notice-routines">
          {[
            { freq:'Au quotidien — 2 min', color:'#fef3c7', steps:[
              'Statut RAG change → Domaines, clic sur le badge.',
              'Projet avance → Projets, changer la phase.',
              'Urgence arrive → Incidents, section "C\'est pour hier".',
              'Décision attendue → noter dans le champ Décision du projet.',
            ]},
            { freq:'OTO lundi avec Étienne — 10 min', color:'#dcfce7', steps:[
              'Ouvrir l\'app sur le Mac.',
              'Parcourir Domaines & Statuts ensemble — base de discussion.',
              'Identifier projets bloqués et décisions à escalader.',
              'Ajuster les jours dans Charge si semaine atypique.',
            ]},
            { freq:'Bilan J15 & J30 — 10 min', color:'#dbeafe', steps:[
              'Mettre à jour la période en haut — ex : "Bilan au 30 avril 2026".',
              'Vérifier que statuts et phases sont à jour.',
              'Aller sur Synthèse → cliquer "Clôturer ce bilan" pour archiver.',
              'Imprimer en PDF → envoyer à Étienne par Teams ou mail.',
            ]},
          ].map(r=>(
            <div key={r.freq} className="routine-block" style={{background:r.color}}>
              <div className="routine-freq">{r.freq}</div>
              <div className="routine-steps">
                {r.steps.map((s,i)=>(
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
        <div className="notice-section-label">06 — Les règles</div>
        <h2 className="notice-section-title">Ce qui fait que ça tient<br/>dans la durée.</h2>
        <div className="notice-rules">
          {RULES.map((r,i)=>(
            <div key={i} className="notice-rule">
              <span className="rule-icon">{r.icon}</span>
              <span>{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CALENDRIER DES BILANS */}
      <div className="notice-section">
        <div className="notice-section-label">07 — Calendrier des bilans</div>
        <h2 className="notice-section-title">Quand clôturer.<br/>Quand envoyer.</h2>
        <div className="notice-lead">
          Chaque bilan clôturé est archivé dans Supabase avec un snapshot complet. C'est la fondation de ton historique d'activité.
        </div>

        <div className="bilan-calendar">
          {[
            { freq:'J15', when:'Le 15 de chaque mois', action:'Synthèse → Clôturer ce bilan → PDF → Teams Étienne', color:'#dbeafe', border:'#378add', available:'Disponible maintenant' },
            { freq:'J30', when:'Dernier jour ouvré du mois', action:'Synthèse → Clôturer ce bilan → PDF → Teams Étienne', color:'#dcfce7', border:'#22c55e', available:'Disponible maintenant' },
            { freq:'Trimestriel', when:'Tous les 3 mois — à partir de juillet 2026', action:'Vue Analytique → Bilan trimestriel → PDF DSI', color:'#fef3c7', border:'#f59e0b', available:'Disponible après 6 bilans clôturés' },
            { freq:'Annuel', when:'Chaque année — à partir d\'avril 2027', action:'Vue Analytique → Bilan annuel → PDF entretien annuel', color:'#f3e8ff', border:'#8b5cf6', available:'Disponible après 24 bilans clôturés' },
          ].map(b => (
            <div key={b.freq} className="bilan-row" style={{borderLeft:`4px solid ${b.border}`, background:b.color}}>
              <div className="bilan-freq" style={{color:b.border}}>{b.freq}</div>
              <div style={{flex:1}}>
                <div className="bilan-when">{b.when}</div>
                <div className="bilan-action">→ {b.action}</div>
              </div>
              <div className="bilan-status" style={{color:b.border}}>{b.available}</div>
            </div>
          ))}
        </div>

        <div className="notice-mantra" style={{marginTop:'1.5rem'}}>
          <p>Deux clics le 15, deux clics le 30.<br/>Dans 1 an tu as 24 bilans et ton activité parle d'elle-même.</p>
        </div>
      </div>

      {/* ROADMAP */}
      <div className="notice-section">
        <div className="notice-section-label">08 — Ce qui arrive ensuite</div>
        <h2 className="notice-section-title">Le backlog.<br/>Dans l'ordre qui a du sens.</h2>
        <div className="roadmap-list">
          {[
            { phase:'Phase 1 — Juillet 2026', condition:'À partir de 2 bilans clôturés', items:['Vue Analytique basique — liste des bilans avec date','Comparaison deux bilans côte à côte'], color:'#dbeafe', border:'#378add' },
            { phase:'Phase 2 — Octobre 2026', condition:'À partir de 6 bilans clôturés', items:['Bilan trimestriel — agrégation de 6 bilans J15/J30','Évolution RAG par domaine dans le temps','Tendance charge par pôle'], color:'#fef3c7', border:'#f59e0b' },
            { phase:'Phase 3 — Avril 2027', condition:'À partir de 24 bilans clôturés', items:['Bilan annuel — exportable en PDF pour entretien','Nombre de CPH par mois — charge non planifiée','Projets livrés dans l\'année — valeur produite concrète'], color:'#f3e8ff', border:'#8b5cf6' },
          ].map(r => (
            <div key={r.phase} className="roadmap-phase" style={{borderLeft:`4px solid ${r.border}`, background:r.color}}>
              <div className="roadmap-phase-title" style={{color:r.border}}>{r.phase}</div>
              <div className="roadmap-condition">{r.condition}</div>
              {r.items.map((item,i) => (
                <div key={i} className="roadmap-item">
                  <span style={{color:r.border}}>○</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ACCÈS RAPIDE */}
      <div className="notice-section">
        <div className="notice-section-label">09 — Accès rapide</div>
        <h2 className="notice-section-title">Aller directement<br/>à l'essentiel.</h2>
        <div className="quick-links">
          {[
            { label:'🗂 Domaines & Statuts', tab:'domains',   desc:'Vue de contrôle — point d\'entrée quotidien' },
            { label:'📋 Projets',            tab:'projects',  desc:'Tableau avec filtres' },
            { label:'⚖️ Charge',             tab:'charge',    desc:'Dispatcher les jours' },
            { label:'⚡ Incidents',          tab:'incidents', desc:'CPH, incidents, expertise N3' },
            { label:'📸 Synthèse J15/J30',   tab:'synthese',  desc:'Clôturer et envoyer à Étienne' },
          ].map(l=>(
            <button key={l.tab} className="quick-link-btn" onClick={()=>onNavigate(l.tab)}>
              <div className="quick-link-label">{l.label}</div>
              <div className="quick-link-desc">{l.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="notice-footer">
        <span>GA Smart Building · DDSI · Confidentiel</span>
        <span>Dashboard Pilotage v2 · Supabase + React + Vercel · 2026</span>
        <div className="notice-mantra-small">Structurer, c'est valoriser.</div>
      </div>
    </div>
  )
}
