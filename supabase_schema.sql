-- PILOTAGE ACTIVITÉ — Schéma Supabase
-- À exécuter dans Supabase > SQL Editor

-- Poles
create table if not exists poles (
  id text primary key,
  name text not null,
  short text,
  color text,
  icon text,
  sort_order integer default 0
);

-- Domains
create table if not exists domains (
  id text primary key,
  pole_id text references poles(id),
  name text not null,
  sub text,
  rag text default 'G',
  comment text default '',
  days numeric default 0,
  color text,
  sort_order integer default 0
);

-- Projects
create table if not exists projects (
  id text primary key,
  domain_id text references domains(id),
  name text not null,
  prio text default 'M',
  pct integer default 0,
  rag text default 'G',
  decision text default '',
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Incidents (inclut CPH et blocages)
create table if not exists incidents (
  id text primary key,
  domain_id text references domains(id),
  type text default 'incident', -- incident | blocked | cph
  text text not null,
  created_at timestamptz default now()
);

-- Expertises
create table if not exists expertises (
  id text primary key,
  domain_id text references domains(id),
  text text not null,
  created_at timestamptz default now()
);

-- Settings (période, jours)
create table if not exists settings (
  key text primary key,
  value text
);

-- RLS : accès libre pour l'instant (usage personnel)
alter table poles      enable row level security;
alter table domains    enable row level security;
alter table projects   enable row level security;
alter table incidents  enable row level security;
alter table expertises enable row level security;
alter table settings   enable row level security;

create policy "allow all" on poles      for all using (true) with check (true);
create policy "allow all" on domains    for all using (true) with check (true);
create policy "allow all" on projects   for all using (true) with check (true);
create policy "allow all" on incidents  for all using (true) with check (true);
create policy "allow all" on expertises for all using (true) with check (true);
create policy "allow all" on settings   for all using (true) with check (true);

-- Données initiales — Pôles
insert into poles (id, name, short, color, icon, sort_order) values
  ('pole1', 'SI Interne & Expertise Système', 'SI Interne', '#2d6be4', '🏛', 1),
  ('pole2', 'Smart Building & IoT',           'Smart Bldg', '#16a085', '🏗', 2),
  ('pole3', 'Data & IA',                      'Data & IA',  '#9b59b6', '🧠', 3)
on conflict do nothing;

-- Données initiales — Domaines
insert into domains (id, pole_id, name, sub, rag, comment, days, color, sort_order) values
  ('Identité & Accès',           'pole1', 'Identité & Accès',           'Entra ID · MFA TOTP · PIM · AD On-Prem · SSO',               'G', 'Migration TOTP en cours — Migration Complete à valider', 2, '#3b82f6', 1),
  ('Messagerie & Workspace',     'pole1', 'Messagerie & Workspace',     'Exchange Online · Teams · SharePoint · Intune · M365',        'G', 'Licences E3 stables — 687 utilisateurs', 1, '#60a5fa', 2),
  ('Infra Cloud & FinOps',       'pole1', 'Infra Cloud & FinOps',       'AWS Landing Zone · Azure · CDK TypeScript · FinOps',          'O', 'Aurora MinCapacity drift ~151€/mois à corriger', 2, '#1d4ed8', 3),
  ('Infrastructure Legacy',      'pole1', 'Infrastructure Legacy',      'VMware ESXi DC privé Equinix · Hyper-V sites usines · Zabbix','G', 'Stable — décommission AD local en cours', 1, '#2563eb', 4),
  ('Sécurité & Résilience',      'pole1', 'Sécurité & Résilience',      'PRA/PRI · Azure Site Recovery sites usines · Trivy · Backup', 'G', 'ASR déployé et validé sur tous les sites usines', 1, '#7c3aed', 5),
  ('Applications & Intégration', 'pole1', 'Applications & Intégration', 'Prefabin AWS · API BIM Trimble Connect · IFS connecteurs',    'G', 'Prefabin en production', 1, '#0891b2', 6),
  ('Support N3 & Architecture',  'pole1', 'Support N3 & Architecture',  'Escalades N1/N2 · Appui OT Equilab · Expertise CODIR · DSI', 'G', 'Point entrée technique unique — activité nominale', 2, '#6b7a99', 7),
  ('Veille Technologique',       'pole1', 'Veille Technologique',       'Cloud · IA · Sécurité · DevSecOps · Architecture',            'G', '', 1, '#64748b', 8),
  ('IoT Platform AWS',           'pole2', 'IoT Platform AWS',           'Greengrass · IoT Core · Kinesis · S3 · Glue · Athena',        'O', 'Plateforme livrée 2024 · 10 bâtiments contractualisés · N2 en exploitation · expertise N3 au-dessus', 2, '#059669', 9),
  ('Infrastructures Smart GTB',  'pole2', 'Infrastructures Smart GTB',  'Proxmox clusters bâtiments · Supervision Zabbix · NIWA',      'O', 'NIWA 1 an en prod — présentation Equilab à organiser — catalogue services en construction', 1, '#10b981', 10),
  ('Infra Sites & OT/IT',        'pole2', 'Infra Sites & OT/IT',        'Automates GTB · Capteurs BLE · GA Pro Supabase AWS',          'O', 'GA Pro Supabase : recette DEV à valider', 2, '#34d399', 11),
  ('Plateforme IA — GAÏA',       'pole3', 'Plateforme IA — GAÏA',       'LibreChat · AWS Bedrock Claude · LiteLLM · MCP · SSO Entra',  'G', 'Leexi MCP en intégration — Langfuse observabilité', 5, '#8b5cf6', 12),
  ('Data Platform & BI',         'pole3', 'Data Platform & BI',         'IFS Fabric F2 · ADLS Gen2 · Power BI · Datapump · OPDG',      'O', 'SALES semantic model bloqué — escalade éditeur IFS', 2, '#7c3aed', 13)
on conflict do nothing;

-- Données initiales — Projets
insert into projects (id, domain_id, name, prio, pct, rag, decision, sort_order) values
  ('p1',  'Identité & Accès',           'MFA Entra — Migration TOTP complète',          'H', 75,  'G', 'Valider étape Migration Complete', 1),
  ('p2',  'Infrastructure Legacy',      'Décommission AD On-Prem legacy',               'M', 25,  'G', '', 2),
  ('p3',  'Infra Cloud & FinOps',       'AWS FinOps — Correction Aurora drift',         'M', 0,   'O', 'Planifier fenêtre de maintenance', 3),
  ('p4',  'Applications & Intégration', 'Prefabin API — Maintenance & évolution',       'B', 100, 'G', '', 4),
  ('p5',  'IoT Platform AWS',           'IoT — Telemetrie csi_act debug',               'M', 25,  'O', '', 5),
  ('p6',  'Infra Sites & OT/IT',        'GA Pro — Supabase GO PROD',                    'M', 75,  'O', 'GO PROD conditionné email enroll + APNS', 6),
  ('p7',  'Infrastructures Smart GTB',  'GTB NIWA — Homologation & Transfert Equilab',  'H', 75,  'O', 'Organiser présentation validation Equilab', 7),
  ('p7b', 'Infrastructures Smart GTB',  'GTB — Catalogue de services bâtiments',        'H', 25,  'G', 'Valider scope avec Equilab après présentation NIWA', 8),
  ('p8',  'Plateforme IA — GAÏA',       'GAÏA — Connecteur Leexi MCP',                 'H', 50,  'G', '', 9),
  ('p9',  'Plateforme IA — GAÏA',       'GAÏA — Observabilité Langfuse',               'H', 50,  'G', '', 10),
  ('p10', 'Data Platform & BI',         'IFS Fabric — SALES Workspace déblocage',       'M', 25,  'R', 'Arbitrage éditeur IFS — escalade support', 11)
on conflict do nothing;

-- Données initiales — Incidents
insert into incidents (id, domain_id, type, text) values
  ('i1', 'Data Platform & BI',   'blocked',  'IFS Fabric SALES — "Area SALES is invalid" sans réponse éditeur'),
  ('i2', 'Infra Cloud & FinOps', 'incident', 'Aurora MinCapacity drift — ~151€/mois de surcoût non corrigé'),
  ('c1', 'Support N3 & Architecture', 'cph', 'DSI — Cadrage urgent CODIR GAÏA, préparation slides J-1')
on conflict do nothing;

-- Données initiales — Expertises
insert into expertises (id, domain_id, text) values
  ('e1', 'Plateforme IA — GAÏA',  'Architecture MCP Leexi — pattern OBO, alignement Softeria'),
  ('e2', 'Infra Cloud & FinOps',  'AWS FinOps review Q2 — plan de correction CDK'),
  ('e3', 'IoT Platform AWS',      'IoT pipeline debug — csi_act manquant dans Greengrass agent'),
  ('e4', 'Support N3 & Architecture', 'Appui Equilab OT — intégration capteurs site NIWA')
on conflict do nothing;

-- Paramètres
insert into settings (key, value) values
  ('period', 'Bilan au 15 avril 2026'),
  ('period_days', '20')
on conflict do nothing;
