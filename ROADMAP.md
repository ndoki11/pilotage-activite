# Roadmap — Dashboard Pilotage Activité

## Règles DevOps — immuables

| Règle | Détail |
|-------|--------|
| SQL schema = 1 seule exécution | `supabase_schema.sql` ne se relance jamais. Toute suppression ou modification dans l'app est permanente. |
| Push code ≠ impact données | GitHub → Vercel déploie uniquement le code. Les données Supabase ne sont jamais touchées par un push. |
| Suppression domaine = permanente | Un domaine supprimé dans l'app est supprimé en base. Il ne revient que si on relance le SQL schema (interdit). |
| Source de vérité = Supabase | Toute modification dans l'app est sauvegardée instantanément. Accessible depuis tous les appareils. |

---

## Livré — v2.2 (avril 2026)

- [x] Architecture Supabase + React + Vercel — synchronisation temps réel
- [x] Mise à jour optimiste — setState avant Supabase, zéro latence
- [x] 5 vues réactives — Domaines, Projets, Charge, Incidents, Synthèse
- [x] Collapse/expand des pôles mémorisé
- [x] Édition domaine après création
- [x] Filtres projets — pôle, domaine, statut RAG, priorité
- [x] Modals vrais formulaires — zéro prompt() numéroté
- [x] Bouton Clôturer le bilan — archive snapshot JSON dans table `bilans`
- [x] Guide screenshot PDF pour Étienne
- [x] Notice complète — manifeste, schéma flux, stack, 13 couches, règles, guide d'usage

---

## Backlog — à implémenter quand les données sont disponibles

### Phase 1 — À partir de 2 bilans clôturés (juillet 2026)

- [ ] **Vue Analytique basique** — liste des bilans archivés avec date et période
- [ ] Comparaison deux bilans côte à côte — RAG avant/après par domaine

### Phase 2 — À partir de 6 bilans clôturés (octobre 2026)

- [ ] **Bilan trimestriel** — agrégation automatique de 6 bilans J15/J30
- [ ] Évolution du statut RAG par domaine dans le temps — graphique simple
- [ ] Tendance charge par pôle — est-ce que ça augmente ou diminue

### Phase 3 — À partir de 24 bilans clôturés (avril 2027)

- [ ] **Bilan annuel** — agrégation de 24 bilans, exportable en PDF
- [ ] Nombre de CPH par mois — indicateur de charge non planifiée
- [ ] Projets livrés dans l'année — ce que tu as produit concrètement
- [ ] Préparation entretien annuel — synthèse automatique de l'activité

---

## Quand lancer les bilans

| Fréquence | Quand | Action |
|-----------|-------|--------|
| **J15** | Le 15 de chaque mois | Synthèse → Clôturer ce bilan → PDF → Teams Étienne |
| **J30** | Le dernier jour ouvré du mois | Synthèse → Clôturer ce bilan → PDF → Teams Étienne |
| **Trimestriel** | Disponible après octobre 2026 | Vue Analytique → Bilan trimestriel → PDF DSI |
| **Annuel** | Disponible après avril 2027 | Vue Analytique → Bilan annuel → PDF entretien |
