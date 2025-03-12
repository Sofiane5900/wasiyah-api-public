# 📑 **DOCUMENT D'EXIGENCES PRODUIT (PRD)**
# **Wasiyah - Application de gestion de testament islamique**

---

## 📋 **1. APERÇU DU PRODUIT**

### 1.1 **Vision**
Wasiyah est une application web sécurisée destinée à créer et gérer des testaments conformes à la législation islamique. Elle permet aux utilisateurs de préparer leurs dernières volontés dans le respect des règles religieuses tout en bénéficiant d'un système de chiffrement de bout en bout (E2EE) garantissant la confidentialité des informations sensibles.

### 1.2 **Proposition de valeur**
- ✅ Conformité aux règles islamiques d'héritage
- 🔐 Sécurité maximale des données sensibles
- 🌐 Accessibilité depuis tous les appareils
- 🤝 Simplification des démarches testamentaires
- 📱 Interface utilisateur intuitive et épurée

### 1.3 **Utilisateurs cibles**
- **Utilisateurs principaux** : Musulmans souhaitant préparer un testament conforme à leurs valeurs religieuses
- **Utilisateurs secondaires** : Non-musulmans cherchant une solution sécurisée de gestion testamentaire
- **Parties prenantes** : Personnes de confiance désignées par l'utilisateur, héritiers potentiels, conseillers juridiques

---

## 📊 **2. OBJECTIFS COMMERCIAUX**

### 2.1 **Objectifs à court terme (6 mois)**
- Lancement de la version MVP (Minimum Viable Product)
- Acquisition de 5 000 utilisateurs actifs
- Mise en place d'un système de feedback utilisateur
- Taux de rétention de 50% après 3 mois d'utilisation

### 2.2 **Objectifs à moyen terme (1-2 ans)**
- Croissance à 25 000 utilisateurs actifs
- Extension des fonctionnalités (intégration API bancaires, etc.)
- Mise en place d'un modèle d'abonnement freemium
- Partenariats avec des experts juridiques et religieux

### 2.3 **Objectifs à long terme (3-5 ans)**
- Plateforme de référence mondiale pour la gestion de succession islamique
- Expansion à d'autres contextes religieux et culturels
- Création d'une communauté active d'utilisateurs
- Intégration avec des services gouvernementaux (si possible)

---

## 🔧 **3. EXIGENCES FONCTIONNELLES**

### 3.1 **Authentification & Sécurité**

#### 3.1.1 **Inscription et connexion**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir créer un compte et s'y connecter de manière sécurisée.
- **Exigences détaillées** :
  - Système d'inscription par email avec vérification
  - Connexion avec email et mot de passe
  - Authentification à deux facteurs (2FA) obligatoire
  - Choix de méthode 2FA (SMS, email, authentificateur)
  - Protection contre les tentatives de force brute
  - Détection des connexions suspectes (nouvelle localisation, appareil)
  - Récupération de compte avec processus de vérification renforcé

#### 3.1.2 **Gestion des sessions**
- **Priorité** : Élevée
- **Description** : Le système doit gérer les sessions utilisateur de manière sécurisée.
- **Exigences détaillées** :
  - Durée de session limitée (30 minutes d'inactivité)
  - Possibilité de déconnexion de tous les appareils
  - Historique des connexions visible par l'utilisateur
  - Notifications de connexion sur nouvel appareil

#### 3.1.3 **Chiffrement des données**
- **Priorité** : Critique
- **Description** : Toutes les données sensibles doivent être chiffrées de bout en bout.
- **Exigences détaillées** :
  - Chiffrement E2EE pour tous les documents et informations sensibles
  - Gestion des clés de chiffrement côté client (zero-knowledge)
  - Phrase mnémonique de récupération (BIP39)
  - Option d'export sécurisé de la clé de chiffrement
  - Impossibilité pour l'équipe Wasiyah d'accéder aux données déchiffrées

### 3.2 **Gestion des Profils Utilisateur**

#### 3.2.1 **Création et configuration du profil**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir configurer son profil avec ses informations personnelles.
- **Exigences détaillées** :
  - Informations de base (nom, prénom, date de naissance)
  - Choix du mode de succession (Musulman ou Non-Musulman)
  - Configuration des préférences de notification
  - Photo de profil (optionnelle)
  - Informations de contact alternatives

#### 3.2.2 **Mode Musulman vs Non-Musulman**
- **Priorité** : Élevée
- **Description** : L'application doit proposer deux modes selon la confession de l'utilisateur.
- **Exigences détaillées** :
  - **Mode Musulman** :
    - Calcul automatique de 2/3 (66,67%) des avoirs selon les règles islamiques
    - Attribution libre de 1/3 (33,33%) des avoirs (wasiyah)
    - Suggestion de répartition conforme à la charia
    - Alertes en cas de non-conformité
  - **Mode Non-Musulman** :
    - Liberté totale de répartition des avoirs (100%)
    - Suggestions de répartition équitable
    - Modèles prédéfinis optionnels

#### 3.2.3 **Gestion des personnes de confiance**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir désigner des personnes de confiance pour gérer ses données après son décès.
- **Exigences détaillées** :
  - Ajout de jusqu'à 5 personnes de confiance
  - Attribution de rôles spécifiques par personne
  - Système d'invitation et confirmation bidirectionnelle
  - Définition des niveaux d'accès (lecture seule, gestion partielle, gestion totale)
  - Possibilité de révoquer une personne de confiance
  - Système de remplacement (hiérarchie)

#### 3.2.4 **Arbre relationnel**
- **Priorité** : Moyenne
- **Description** : L'utilisateur doit pouvoir définir son arbre relationnel pour identifier ses héritiers légaux.
- **Exigences détaillées** :
  - Interface intuitive de création d'arbre familial
  - Ajout des relations principales (conjoint, enfants, parents, frères/sœurs)
  - Classification automatique des types d'héritiers selon la loi islamique
  - Calcul dynamique des parts en fonction de l'arbre
  - Visualisation graphique de l'arbre et des parts
  - Mise à jour facile (naissance, mariage, décès)

### 3.3 **Gestion des Actifs et du Capital**

#### 3.3.1 **Catégorisation des actifs**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir catégoriser et saisir tous ses actifs.
- **Exigences détaillées** :
  - Catégories prédéfinies (liquidités, immobilier, biens matériels, actifs numériques, etc.)
  - Possibilité de créer des catégories personnalisées
  - Saisie détaillée des informations par actif
  - Téléchargement de justificatifs (actes de propriété, etc.)
  - Estimation de la valeur actuelle
  - Localisation des biens physiques

#### 3.3.2 **Gestion des dettes**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir enregistrer ses dettes et créances.
- **Exigences détaillées** :
  - Saisie des dettes actives (ce que l'utilisateur doit)
  - Saisie des créances (ce qu'on doit à l'utilisateur)
  - Détails des modalités (montant, échéances, intérêts si applicable)
  - Calcul automatique du solde net après remboursement des dettes
  - Priorité de remboursement des dettes sur la distribution des actifs

#### 3.3.3 **Attribution des bénéficiaires**
- **Priorité** : Critique
- **Description** : L'utilisateur doit pouvoir désigner les bénéficiaires de ses actifs.
- **Exigences détaillées** :
  - En mode musulman :
    - Calcul automatique des parts obligatoires (2/3)
    - Interface de répartition du tiers libre (wasiyah)
    - Alertes en cas de violation des règles islamiques
  - En mode non-musulman :
    - Interface de répartition libre
    - Attribution par actif ou par pourcentage global
  - Désignation d'organisations caritatives ou religieuses
  - Conditions d'attribution (âge minimum, situation, etc.)

#### 3.3.4 **Tableau de bord financier**
- **Priorité** : Moyenne
- **Description** : L'utilisateur doit avoir une vue d'ensemble de ses actifs et de leur répartition.
- **Exigences détaillées** :
  - Visualisation graphique de la répartition des actifs
  - Distinction visuelle entre parts obligatoires et wasiyah
  - Historique des modifications de valorisation
  - Rappels de mise à jour des valorisations
  - Graphiques de répartition par bénéficiaire

### 3.4 **Validation du Décès**

#### 3.4.1 **Déclaration et confirmation**
- **Priorité** : Critique
- **Description** : Le système doit permettre la déclaration et la confirmation du décès de l'utilisateur.
- **Exigences détaillées** :
  - Formulaire de déclaration accessible aux personnes de confiance
  - Nécessité de confirmation par au moins 2 personnes de confiance
  - Système de QR Code unique envoyé aux bénéficiaires
  - Délai de sécurité de 30 jours avant activation
  - Système d'alerte à l'utilisateur en cas de déclaration (protection contre les fraudes)
  - Processus de contestation pendant le délai de sécurité

#### 3.4.2 **Activation des dispositions testamentaires**
- **Priorité** : Critique
- **Description** : Après confirmation du décès, le système doit activer les dispositions testamentaires.
- **Exigences détaillées** :
  - Notification à tous les bénéficiaires
  - Accès sécurisé aux informations pertinentes pour chaque bénéficiaire
  - Instructions détaillées pour chaque actif et bénéficiaire
  - Système de confirmation de réception des informations
  - Archive sécurisée de toutes les transactions post-mortem

#### 3.4.3 **Vérifications périodiques de vie**
- **Priorité** : Moyenne
- **Description** : Le système doit vérifier périodiquement que l'utilisateur est toujours en vie.
- **Exigences détaillées** :
  - Demande de confirmation trimestrielle
  - Méthodes variées de confirmation (connexion, réponse à un email, code SMS)
  - Escalade aux personnes de confiance après 3 rappels sans réponse
  - Option de désactivation temporaire pour longues absences planifiées

### 3.5 **Gestion des Documents**

#### 3.5.1 **Coffres-forts numériques**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir stocker des documents dans différents coffres-forts numériques.
- **Exigences détaillées** :
  - Coffre légal pour documents officiels
  - Coffre islamique pour documents religieux
  - Coffre numérique pour mots de passe et accès
  - Chiffrement individuel de chaque coffre
  - Possibilité d'attribuer des accès différents par coffre
  - Versionnement des documents
  - Limite de 1 Go de stockage total par utilisateur

#### 3.5.2 **Génération de documents**
- **Priorité** : Moyenne
- **Description** : Le système doit pouvoir générer des documents standards.
- **Exigences détaillées** :
  - Testament conforme à la loi islamique
  - Contrats de prêt entre particuliers
  - Lettres aux héritiers
  - Instructions post-mortem
  - Recommandations religieuses
  - Export PDF sécurisé

#### 3.5.3 **Gestion des accès aux documents**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir définir qui peut accéder à quels documents et quand.
- **Exigences détaillées** :
  - Attribution d'accès par document ou groupe de documents
  - Accès conditionnel (uniquement après décès confirmé)
  - Journalisation des consultations
  - Révocation d'accès possible
  - Expiration automatique des accès

### 3.6 **Notifications & Rappels**

#### 3.6.1 **Système de notifications**
- **Priorité** : Moyenne
- **Description** : Le système doit notifier les utilisateurs des événements importants.
- **Exigences détaillées** :
  - Notifications par email (principal)
  - Notifications SMS (optionnel)
  - Notifications push sur application mobile (futur)
  - Centre de notifications in-app
  - Contrôle granulaire des types de notifications

#### 3.6.2 **Rappels périodiques**
- **Priorité** : Moyenne
- **Description** : Le système doit rappeler à l'utilisateur de mettre à jour ses informations.
- **Exigences détaillées** :
  - Rappel semestriel pour mise à jour du testament
  - Rappel annuel pour validation des dettes
  - Rappel trimestriel de confirmation de vie
  - Planification personnalisable des rappels
  - Escalade aux personnes de confiance si nécessaire

---

## 📱 **4. EXIGENCES NON FONCTIONNELLES**

### 4.1 **Performance**
- Temps de chargement des pages < 2 secondes
- Capacité à gérer au moins 10 000 utilisateurs simultanés
- Temps de réponse du serveur < 200ms pour 95% des requêtes
- Chiffrement/déchiffrement côté client en < 3 secondes

### 4.2 **Sécurité**
- Chiffrement E2EE pour toutes les données sensibles
- Conformité RGPD et autres réglementations sur la protection des données
- Audit de sécurité trimestriel
- Authentification multifacteur obligatoire
- Protection contre les attaques CSRF, XSS, injection SQL
- Tests de pénétration réguliers

### 4.3 **Disponibilité**
- Uptime de 99,9% (downtime maximal de 8,76 heures/an)
- Sauvegardes automatiques toutes les 6 heures
- Plan de reprise d'activité avec RTO < 4 heures
- Surveillance active 24/7

### 4.4 **Scalabilité**
- Architecture capable de s'adapter à une croissance de 500% en un an
- Charge distribuée sur plusieurs serveurs
- Auto-scaling en fonction de la charge

### 4.5 **Utilisabilité**
- Interface responsive (desktop, tablette, mobile)
- Accessibilité WCAG 2.1 niveau AA
- Support multilingue (arabe, français, anglais en priorité)
- Guide utilisateur intégré et tooltips contextuels
- Temps d'apprentissage < 30 minutes pour les fonctions de base

### 4.6 **Compatibilité**
- Support des navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Support des 3 dernières versions majeures de chaque navigateur
- Compatibilité mobile (iOS 14+, Android 9+)

---

## 👥 **5. USER STORIES ET PARCOURS UTILISATEUR**

### 5.1 **Inscription et configuration initiale**

**US-001 : Inscription sécurisée**  
En tant que nouvel utilisateur, je veux pouvoir créer un compte facilement et sécurisé afin de commencer à utiliser le service.

**US-002 : Configuration du profil**  
En tant qu'utilisateur, je veux configurer mon profil avec mes informations personnelles afin que mon testament soit valide.

**US-003 : Choix du mode testament**  
En tant qu'utilisateur, je veux pouvoir choisir entre mode musulman et non-musulman afin que mon testament respecte mes convictions.

**US-004 : Configuration de l'authentification à deux facteurs**  
En tant qu'utilisateur, je veux configurer ma méthode de 2FA préférée afin de sécuriser mon compte.

### 5.2 **Gestion des personnes de confiance**

**US-005 : Ajout de personnes de confiance**  
En tant qu'utilisateur, je veux pouvoir désigner jusqu'à 5 personnes de confiance afin qu'elles puissent gérer mes affaires après mon décès.

**US-006 : Attribution de rôles spécifiques**  
En tant qu'utilisateur, je veux attribuer des rôles spécifiques à mes personnes de confiance afin de répartir les responsabilités.

**US-007 : Révocation d'une personne de confiance**  
En tant qu'utilisateur, je veux pouvoir révoquer une personne de confiance afin de m'adapter aux changements dans mes relations.

### 5.3 **Gestion des actifs**

**US-008 : Ajout d'actifs**  
En tant qu'utilisateur, je veux pouvoir ajouter et catégoriser mes actifs afin qu'ils soient inclus dans mon testament.

**US-009 : Mise à jour des valorisations**  
En tant qu'utilisateur, je veux pouvoir mettre à jour la valeur de mes actifs afin que mon testament reflète ma situation financière actuelle.

**US-010 : Enregistrement des dettes**  
En tant qu'utilisateur, je veux pouvoir enregistrer mes dettes afin qu'elles soient prises en compte avant distribution des avoirs.

### 5.4 **Répartition des biens**

**US-011 : Création de l'arbre relationnel**  
En tant qu'utilisateur, je veux créer mon arbre familial afin d'identifier mes héritiers légaux.

**US-012 : Répartition automatique selon les règles islamiques**  
En tant qu'utilisateur musulman, je veux que le système calcule automatiquement la répartition des 2/3 de mes avoirs selon la charia afin d'être conforme à mes obligations religieuses.

**US-013 : Attribution du tiers libre (wasiyah)**  
En tant qu'utilisateur musulman, je veux pouvoir attribuer librement le tiers restant de mes avoirs afin d'exprimer mes volontés personnelles.

**US-014 : Répartition libre complète**  
En tant qu'utilisateur non-musulman, je veux pouvoir répartir librement 100% de mes avoirs afin d'exprimer mes volontés personnelles.

### 5.5 **Documentation et coffres-forts**

**US-015 : Stockage de documents officiels**  
En tant qu'utilisateur, je veux pouvoir stocker mes documents officiels dans un coffre-fort sécurisé afin de les préserver et les rendre accessibles à mes héritiers.

**US-016 : Création de contrats de prêt**  
En tant qu'utilisateur, je veux pouvoir créer et stocker des contrats de prêt afin de formaliser mes créances et dettes.

**US-017 : Stockage des accès numériques**  
En tant qu'utilisateur, je veux pouvoir stocker mes mots de passe et accès numériques afin qu'ils soient transmis de façon sécurisée à mes proches après mon décès.

### 5.6 **Gestion du décès**

**US-018 : Déclaration de décès**  
En tant que personne de confiance, je veux pouvoir déclarer le décès de l'utilisateur afin d'initier le processus de succession.

**US-019 : Confirmation du décès**  
En tant que personne de confiance secondaire, je veux pouvoir confirmer une déclaration de décès afin de valider l'information.

**US-020 : Accès aux informations post-mortem**  
En tant que bénéficiaire, je veux pouvoir accéder aux informations qui me concernent après confirmation du décès afin de connaître mes droits et responsabilités.

---

## 🛠️ **6. ARCHITECTURE TECHNIQUE**

### 6.1 **Architecture générale**
- Architecture API RESTful
- Backend NestJS avec Fastify
- Base de données PostgreSQL
- Chiffrement E2EE avec gestion des clés côté client

### 6.2 **Endpoints API principaux**
- `/api/auth` : Authentification, 2FA, gestion de session
- `/api/users` : Profils, préférences, personnes de confiance
- `/api/relations` : Arbre relationnel et bénéficiaires
- `/api/assets` : Gestion des actifs et valorisations
- `/api/inheritance` : Calcul des parts selon règles islamiques
- `/api/documents` : Gestion des coffres-forts numériques
- `/api/death-validation` : Processus de validation du décès
- `/api/notifications` : Configuration des alertes et rappels

### 6.3 **Modèles de données principaux**
- **User** : Informations d'utilisateur, préférences, paramètres
- **TrustedPerson** : Personnes de confiance et leurs permissions
- **Relation** : Relations familiales (arbre généalogique)
- **Asset** : Actifs de l'utilisateur avec métadonnées
- **Debt** : Dettes et créances
- **Document** : Documents stockés (métadonnées + contenu chiffré)
- **Notification** : Configuration des notifications
- **Inheritance** : Règles d'héritage calculées

### 6.4 **Sécurité**
- Chiffrement E2EE avec libsodium.js
- Gestion des clés avec BIP39 (phrases mnémoniques)
- JWT pour l'authentification avec rotation fréquente
- Rate limiting sur les endpoints sensibles
- HTTPS obligatoire avec HSTS
- CSP strict et autres en-têtes de sécurité

---

## 📊 **7. MÉTRIQUES DE SUCCÈS**

### 7.1 **Métriques d'acquisition**
- Nombre de nouveaux utilisateurs inscrits par mois
- Taux de conversion visiteur → utilisateur inscrit
- Coût d'acquisition par utilisateur
- Sources de trafic et leur efficacité

### 7.2 **Métriques d'engagement**
- Nombre d'utilisateurs actifs (DAU, WAU, MAU)
- Taux de complétion des profils
- Nombre moyen d'actifs enregistrés par utilisateur
- Fréquence des mises à jour de testament
- Taux d'utilisation des coffres-forts

### 7.3 **Métriques de satisfaction**
- Net Promoter Score (NPS)
- CSAT (Customer Satisfaction Score)
- Taux de résolution des problèmes au support
- Sentiment d'analyse des retours utilisateurs

### 7.4 **Métriques techniques**
- Uptime du service
- Temps de réponse moyen de l'API
- Taux d'erreurs
- Performance du chiffrement/déchiffrement
- Consommation des ressources serveur

---

## 📅 **8. PLANNING ET PRIORITÉS**

### 8.1 **Phase 1 : MVP (3 mois)**
- Authentification sécurisée avec 2FA
- Profil utilisateur basique
- Gestion des actifs simple
- Répartition selon règles islamiques (mode musulman)
- Stockage de documents basique
- Interface utilisateur responsive minimale

### 8.2 **Phase 2 : Améliorations (3 mois)**
- Arbre relationnel complet
- Gestion avancée des personnes de confiance
- Coffres-forts numériques séparés
- Calcul avancé des parts d'héritage
- Interface utilisateur améliorée

### 8.3 **Phase 3 : Fonctionnalités complètes (6 mois)**
- Système complet de validation du décès
- Génération de documents légaux
- Contrats de prêt entre particuliers
- Notifications et rappels
- Tableaux de bord avancés
- Support multilingue

### 8.4 **Phase 4 : Évolution (ongoing)**
- Intégrations avec services tiers
- Application mobile native
- Fonctionnalités premium
- Support international
- Adaptations à d'autres systèmes juridiques

---

## ⚠️ **9. CONTRAINTES ET CONSIDÉRATIONS**

### 9.1 **Contraintes légales**
- Conformité au RGPD et autres réglementations sur la protection des données
- Respect des lois sur la succession dans différentes juridictions
- Validité juridique des testaments numériques
- Responsabilité en cas d'erreur de calcul ou de répartition

### 9.2 **Contraintes religieuses**
- Fidélité aux règles islamiques d'héritage (farâ'id)
- Validation par des experts en droit islamique
- Respect des différentes écoles juridiques islamiques

### 9.3 **Contraintes techniques**
- Sécurité maximale requise
- Chiffrement E2EE limitant certaines fonctionnalités côté serveur
- Performance du chiffrement/déchiffrement côté client
- Risque de perte d'accès aux données en cas de perte des clés

### 9.4 **Risques identifiés**
- Tentatives de fraude pour accéder aux avoirs
- Fausses déclarations de décès
- Perte définitive des données en cas de mauvaise gestion des clés
- Contestations entre héritiers
- Incertitudes juridiques sur la validité des testaments numériques
- Évolution des lois sur les successions

---

## 📝 **10. ANNEXES**

### 10.1 **Glossaire des termes**
- **Wasiyah** : Testament islamique, autorisant la disposition libre d'un tiers des avoirs
- **Farâ'id** : Science des règles de succession en Islam
- **E2EE** : End-to-End Encryption (chiffrement de bout en bout)
- **2FA** : Two-Factor Authentication (authentification à deux facteurs)
- **BIP39** : Bitcoin Improvement Proposal 39, standard pour phrases mnémoniques

### 10.2 **Références**
- Règles islamiques de succession
- Réglementations sur la protection des données
- Meilleures pratiques en matière de sécurité numérique
- Études sur les comportements utilisateurs en matière de planification successorale

### 10.3 **Maquettes conceptuelles**
- Écrans d'authentification
- Tableau de bord principal
- Interface de gestion des actifs
- Interface de l'arbre relationnel
- Visualisation de la répartition des avoirs

---

## 👤 **11. APPROBATION**

| Nom | Rôle | Date | Signature |
|-----|------|------|-----------|
|     | Product Owner |  |  |
|     | Lead Developer |  |  |
|     | UX Designer |  |  |
|     | Expert juridique |  |  |
|     | Expert en droit islamique |  |  |

---

*Ce PRD est un document évolutif qui sera mis à jour au fur et à mesure de l'avancement du projet et des retours utilisateurs.* 