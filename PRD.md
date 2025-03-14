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
- 🆓 Application entièrement gratuite
- 🔄 Code source ouvert et communautaire
- 🔒 Aucune dépendance à des services tiers
- 💫 Créée par la communauté, pour la communauté
- 🛡️ Chiffrement de bout en bout pour une confidentialité totale

### 1.3 **Utilisateurs cibles**
- **Utilisateurs principaux** : Musulmans souhaitant préparer un testament conforme à leurs valeurs religieuses
- **Utilisateurs secondaires** : Non-musulmans cherchant une solution sécurisée de gestion testamentaire
- **Parties prenantes** : Wakils (mandataires désignés par l'utilisateur), héritiers potentiels, conseillers juridiques
- **Contributeurs** : Développeurs souhaitant participer au projet open source

---

## 📊 **2. OBJECTIFS DU PROJET**

### 2.1 **Objectifs à court terme (6 mois)**
- Lancement de la version MVP (Minimum Viable Product) fonctionnelle
- Création d'une communauté initiale d'utilisateurs et testeurs
- Mise en place d'un système de feedback utilisateur
- Publication du code source avec une licence open source
- Développement de rappels informatifs sur les règles islamiques de succession (sans implémentation de partage automatique)
- Création d'une documentation complète avec tutoriels d'utilisation

### 2.2 **Objectifs à moyen terme (1-2 ans)**
- Stabilisation de l'application et correction des bugs identifiés
- Amélioration de l'expérience utilisateur selon les retours
- Extension des fonctionnalités en conservant l'indépendance du système
- Constitution d'une petite communauté de contributeurs
- Partenariats avec des experts religieux pour validation
- Traduction collaborative dans au moins 3 langues principales (arabe, français, anglais)

### 2.3 **Objectifs à long terme (3-5 ans)**
- Outil de référence pour la communauté musulmane francophone
- Expansion progressive à d'autres langues selon les contributions
- Création d'une communauté active d'utilisateurs et de développeurs
- Documentation complète du code et des règles islamiques
- Maintien de l'indépendance vis-à-vis des services et technologies propriétaires
- Ressource pédagogique informative sur les règles de succession islamique (sans calculateur automatique)

---

## 🔧 **3. EXIGENCES FONCTIONNELLES**

### 3.1 **Authentification & Sécurité**

#### 3.1.1 **Inscription et connexion**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir créer un compte et s'y connecter de manière sécurisée.
- **Exigences détaillées** :
  - Système d'inscription par email avec vérification
  - Connexion avec email et mot de passe
  - Authentification à deux facteurs (2FA) fortement recommandée mais optionnelle
  - Méthodes de 2FA sécurisées (application d'authentification TOTP, email)
  - Indication visuelle du niveau de sécurité du compte (avec/sans 2FA)
  - Protection contre les tentatives de force brute
  - Détection des connexions suspectes (nouvelle localisation, appareil)
  - Phrase mnémonique BIP39 obligatoire comme SEULE méthode de sauvegarde cryptographique
  - Avertissement clair que la perte de la phrase mnémonique entraîne la perte définitive des données
  - Documentation détaillée sur la conservation sécurisée de la phrase mnémonique

#### 3.1.2 **Gestion des sessions**
- **Priorité** : Élevée
- **Description** : Le système doit gérer les sessions utilisateur de manière sécurisée.
- **Exigences détaillées** :
  - Durée de session limitée (30 minutes d'inactivité)
  - Possibilité de déconnexion de tous les appareils
  - Historique des connexions visible par l'utilisateur
  - Notifications de connexion sur nouvel appareil

#### 3.1.3 **Chiffrement des données**
- **Priorité** : CRITIQUE (Fondement du projet)
- **Description** : Toutes les données sensibles doivent être chiffrées de bout en bout, rendant impossible l'accès aux informations pour quiconque autre que l'utilisateur de son vivant, et ses Wakils explicitement désignés UNIQUEMENT après son décès confirmé.
- **Exigences détaillées** :
  - Chiffrement E2EE pour tous les documents et informations sensibles
  - Gestion des clés de chiffrement exclusivement côté client (zero-knowledge)
  - Phrase mnémonique (BIP39) obligatoire pour sauvegarde cryptographique des clés avec instructions de conservation sécurisée
  - Avertissement explicite que la perte de la phrase mnémonique entraîne la perte définitive et irréversible des données
  - Architecture de chiffrement à plusieurs niveaux pour les données particulièrement sensibles (coffres-forts spécifiques chiffrés avec des clés distinctes, elles-mêmes chiffrées avec la clé publique de l'utilisateur)
  - Option d'export sécurisé de la clé de chiffrement
  - Impossibilité technique pour l'équipe Wasiyah d'accéder aux données déchiffrées
  - Transparence totale du code de chiffrement/déchiffrement
  - Pas de génération de clés sur le serveur
  - Pas de transmission des clés privées non chiffrées via le réseau
  - Absence totale de "porte dérobée" ou de mécanisme de récupération traditionnel
  - Garantie cryptographique que les Wakils ne peuvent accéder aux données avant la validation complète du décès

### 3.2 **Gestion des Profils Utilisateur**

#### 3.2.1 **Création et configuration du profil**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir configurer son profil avec ses informations personnelles.
- **Exigences détaillées** :
  - Informations de base (nom, prénom, date de naissance)
  - Choix du profil d'utilisateur (Musulman ou Non-Musulman) pour personnaliser les ressources informatives
  - Configuration des préférences de notification
  - Photo de profil (optionnelle)
  - Informations de contact alternatives

#### 3.2.2 **Profil Musulman vs Non-Musulman**
- **Priorité** : Élevée
- **Description** : L'application doit proposer deux modes de ressources informatives selon le choix de l'utilisateur.
- **Exigences détaillées** :
  - **Profil Musulman** :
    - Rappels informatifs sur les principes du testament en Islam
    - Ressources pédagogiques sur les règles de succession islamique
    - Informations sur la répartition recommandée (sans calcul automatique)
    - Documentation de référence sur les principes de la wasiyah
  - **Profil Non-Musulman** :
    - Ressources générales sur la planification successorale
    - Suggestions de considérations importantes
    - Documentation sur les bonnes pratiques testamentaires

#### 3.2.3 **Gestion des Wakils**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir désigner des Wakils (وكيل, mandataires) pour gérer ses données et exécuter ses volontés UNIQUEMENT après son décès confirmé.
- **Exigences détaillées** :
  - Ajout de jusqu'à 5 Wakils
  - Attribution de rôles spécifiques par Wakil
  - Système d'invitation et confirmation bidirectionnelle
  - Définition des niveaux d'accès (lecture seule, gestion partielle, gestion totale)
  - Possibilité de révoquer un Wakil
  - Système de remplacement (hiérarchie)
  - Aucun accès aux données de l'utilisateur avant la validation du décès
  - Séparation stricte entre le rôle de déclaration du décès et l'accès aux données
  - Option pour désigner une mosquée ou une organisation islamique comme Wakil (particulièrement utile pour les personnes sans entourage familial)
  - Processus spécifique de validation pour les Wakils institutionnels

#### 3.2.4 **Arbre relationnel**
- **Priorité** : Moyenne
- **Description** : L'utilisateur doit pouvoir définir son arbre relationnel pour identifier ses proches.
- **Exigences détaillées** :
  - Interface intuitive de création d'arbre familial
  - Ajout des relations principales (conjoint, enfants, parents, frères/sœurs)
  - Informations sur les types d'héritiers selon la loi islamique
  - Visualisation graphique de l'arbre
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
  - Visualisation du solde net après remboursement des dettes
  - Informations sur la priorité de remboursement des dettes sur la distribution des actifs

#### 3.3.3 **Attribution des bénéficiaires**
- **Priorité** : Critique
- **Description** : L'utilisateur doit pouvoir désigner les bénéficiaires de ses actifs.
- **Exigences détaillées** :
  - Selon le profil choisi :
    - **Profil musulman** :
      - Ressources informatives sur les parts selon les règles islamiques
      - Interface de répartition des actifs avec rappels informatifs
      - Guides explicatifs sur les principes de la wasiyah (testament islamique)
    - **Profil non-musulman** :
      - Interface de répartition libre
      - Attribution par actif ou par pourcentage global
  - Désignation d'organisations caritatives ou religieuses comme bénéficiaires
  - Conditions d'attribution (âge minimum, situation, etc.)

#### 3.3.4 **Tableau de bord financier**
- **Priorité** : Moyenne
- **Description** : L'utilisateur doit avoir une vue d'ensemble de ses actifs et de leur répartition.
- **Exigences détaillées** :
  - Affichage clair du capital total (somme de tous les actifs moins les dettes)
  - Visualisation graphique de la répartition des actifs
  - Distinction visuelle entre parts obligatoires et wasiyah
  - Historique des modifications de valorisation
  - Rappels de mise à jour des valorisations
  - Graphiques de répartition par bénéficiaire
  - Suivi de l'évolution du capital avec historique (trimestriel)
  - Notifications d'évolution significative du capital (gain/perte)

#### 3.3.5 **Contrats de prêt entre particuliers**
- **Priorité** : Moyenne
- **Description** : L'utilisateur doit pouvoir créer, gérer et suivre des contrats de prêt conformes aux principes islamiques.
- **Exigences détaillées** :
  - Création de contrats de prêt sans intérêt (qard hasan)
  - Modèles personnalisables selon la nature du prêt
  - Calendrier de remboursement avec rappels automatiques
  - Génération de documents PDF signables électroniquement
  - Suivi des remboursements par échéances
  - Possibilité d'enregistrer un prêt comme "sadaqa" (don caritatif) à tout moment
  - Impact automatique sur le capital disponible pour la succession
  - Notifications aux deux parties concernant les échéances

#### 3.3.6 **Don d'organes et directives médicales**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir exprimer clairement ses volontés concernant le don d'organes et certaines directives médicales.
- **Exigences détaillées** :
  - Formulaire explicite sur le consentement au don d'organes (acceptation ou refus)
  - Information claire sur la législation française en vigueur (consentement présumé sauf opposition)
  - Option d'imprimer/exporter une carte de donneur personnalisée
  - Possibilité de préciser des restrictions éventuelles (organes spécifiques)
  - **Option explicite** pour rendre cette information accessible aux Wakils avant le décès (activée par défaut mais désactivable)
  - Interface séparée et sécurisée pour les Wakils permettant d'accéder uniquement à ces informations médicales
  - Carte de donneur numérique partageables par QR code avec le personnel médical
  - Journalisation détaillée de tout accès à ces informations avant le décès
  - Notification à l'utilisateur en cas de consultation par un Wakil
  - Accès prioritaire et immédiat à cette information pour les Wakils dès la déclaration de décès
  - Notification spécifique aux Wakils concernant ces volontés
  - Historique des modifications de ces directives
  - Option pour ajouter des directives médicales complémentaires

### 3.4 **Validation du Décès**

#### 3.4.1 **Déclaration et confirmation**
- **Priorité** : Critique
- **Description** : Le système doit permettre la déclaration et la confirmation du décès de l'utilisateur, sans donner accès aux données avant validation complète.
- **Exigences détaillées** :
  - Formulaire de déclaration accessible aux Wakils
  - Nécessité de confirmation par au moins 2 Wakils
  - Système de QR Code unique envoyé aux bénéficiaires
  - Délai de sécurité de 30 jours avant activation
  - Système d'alerte à l'utilisateur en cas de déclaration (protection contre les fraudes)
  - Processus de contestation pendant le délai de sécurité
  - Architecture cryptographique garantissant l'impossibilité d'accès aux données pendant la période de confirmation

#### 3.4.2 **Activation des dispositions testamentaires**
- **Priorité** : Critique
- **Description** : Après confirmation du décès et expiration du délai de sécurité, le système doit activer les dispositions testamentaires.
- **Exigences détaillées** :
  - Déverrouillage cryptographique automatique des accès selon les rôles prédéfinis
  - Notification à tous les bénéficiaires
  - Accès sécurisé aux informations pertinentes pour chaque bénéficiaire
  - Instructions détaillées pour chaque actif et bénéficiaire
  - Système de confirmation de réception des informations
  - Archive sécurisée de toutes les transactions post-mortem
  - Journal des accès pour audit

#### 3.4.3 **Vérifications périodiques de vie**
- **Priorité** : Moyenne
- **Description** : Le système doit vérifier périodiquement que l'utilisateur est toujours en vie.
- **Exigences détaillées** :
  - Demande de confirmation trimestrielle
  - Méthodes sécurisées de confirmation (connexion, réponse à un email, application d'authentification)
  - Escalade aux Wakils après 3 rappels sans réponse
  - Option de désactivation temporaire pour longues absences planifiées

### 3.5 **Gestion des Documents**

#### 3.5.1 **Coffres-forts numériques**
- **Priorité** : Élevée
- **Description** : L'utilisateur doit pouvoir stocker des documents dans différents coffres-forts numériques.
- **Exigences détaillées** :
  - Coffre légal pour documents officiels
  - Coffre islamique pour documents religieux
  - Coffre numérique pour mots de passe et accès
  - Chiffrement individuel de chaque coffre avec des clés distinctes
  - Clés des coffres-forts elles-mêmes chiffrées avec la clé publique de l'utilisateur
  - Possibilité d'attribuer des accès spécifiques par coffre à différents Wakils
  - Garantie qu'un Wakil n'aura accès qu'aux coffres-forts explicitement partagés
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
  - Notifications via l'application d'authentification (optionnel, pour les comptes avec 2FA)
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
  - Escalade aux Wakils si nécessaire

### 3.7 **Autonomie et indépendance**

#### 3.7.1 **Architecture autonome**
- **Priorité** : Critique
- **Description** : L'application doit fonctionner de manière totalement autonome, sans dépendance à des API tierces.
- **Exigences détaillées** :
  - Aucune intégration avec des services bancaires externes
  - Aucune utilisation de services d'authentification tiers (Google, Facebook, etc.)
  - Auto-hébergement possible pour les utilisateurs avancés
  - Fonctionnement complet sans accès internet après installation
  - Capacité à exporter/importer toutes les données en formats ouverts

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
- Authentification multifacteur fortement recommandée avec incitations visuelles
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

### 4.7 **Open Source**
- Licence open source (GPL v3 ou MIT)
- Documentation complète du code et de l'architecture
- Guide de contribution pour les développeurs externes
- Processus de revue de code transparent
- Gestion publique des problèmes et des demandes d'amélioration
- Organisation de sprints communautaires

### 4.8 **Indépendance**
- Aucune dépendance à des services cloud propriétaires
- Aucune API tierce requise pour les fonctionnalités essentielles
- Utilisation exclusive de formats de données ouverts
- Déploiement possible sur serveurs auto-hébergés ou mutualisés standards
- Documentation complète pour un déploiement autonome

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

### 5.2 **Gestion des Wakils**

**US-005 : Ajout de Wakils**  
En tant qu'utilisateur, je veux pouvoir désigner jusqu'à 5 Wakils afin qu'ils puissent gérer mes affaires après mon décès.

**US-006 : Attribution de rôles spécifiques**  
En tant qu'utilisateur, je veux attribuer des rôles spécifiques à mes Wakils afin de répartir les responsabilités.

**US-007 : Révocation d'un Wakil**  
En tant qu'utilisateur, je veux pouvoir révoquer un Wakil afin de m'adapter aux changements dans mes relations.

**US-022 : Désignation d'une mosquée comme Wakil**  
En tant qu'utilisateur sans entourage familial, je veux pouvoir désigner une mosquée ou une organisation islamique comme Wakil afin qu'elle puisse exécuter mes volontés testamentaires après mon décès.

**US-025 : Gestion des Wakils institutionnels**  
En tant qu'utilisateur, je veux pouvoir définir des processus spécifiques de validation pour les Wakils institutionnels afin de m'assurer que mes volontés seront respectées même en l'absence de proches.

### 5.3 **Gestion des actifs**

**US-008 : Ajout d'actifs**  
En tant qu'utilisateur, je veux pouvoir ajouter et catégoriser mes actifs afin qu'ils soient inclus dans mon testament.

**US-009 : Mise à jour des valorisations**  
En tant qu'utilisateur, je veux pouvoir mettre à jour la valeur de mes actifs afin que mon testament reflète ma situation financière actuelle.

**US-010 : Enregistrement des dettes**  
En tant qu'utilisateur, je veux pouvoir enregistrer mes dettes afin qu'elles soient prises en compte avant distribution des avoirs.

**US-021 : Suivi de l'évolution du capital**  
En tant qu'utilisateur, je veux pouvoir suivre l'évolution de mon capital total au fil du temps afin d'avoir une vision claire de ma situation patrimoniale.

### 5.4 **Répartition des biens**

**US-011 : Création de l'arbre relationnel**  
En tant qu'utilisateur, je veux créer mon arbre familial afin d'identifier mes proches.

**US-012 : Ressources sur les règles islamiques de succession**  
En tant qu'utilisateur musulman, je veux accéder à des ressources informatives sur les règles islamiques de succession afin de comprendre les principes applicables à ma situation.

**US-013 : Attribution de mes biens**  
En tant qu'utilisateur musulman, je veux pouvoir attribuer mes biens selon mes volontés tout en recevant des informations conformes à mes valeurs religieuses.

**US-014 : Répartition libre complète**  
En tant qu'utilisateur non-musulman, je veux pouvoir répartir librement mes avoirs afin d'exprimer mes volontés personnelles.

### 5.5 **Documentation et coffres-forts**

**US-015 : Stockage de documents officiels**  
En tant qu'utilisateur, je veux pouvoir stocker mes documents officiels dans un coffre-fort sécurisé afin de les préserver et les rendre accessibles à mes héritiers.

**US-016 : Création de contrats de prêt**  
En tant qu'utilisateur, je veux pouvoir créer et stocker des contrats de prêt afin de formaliser mes créances et dettes.

**US-017 : Stockage des accès numériques**  
En tant qu'utilisateur, je veux pouvoir stocker mes mots de passe et accès numériques afin qu'ils soient transmis de façon sécurisée à mes proches après mon décès.

**US-023 : Gestion des prêts sans intérêt**  
En tant qu'utilisateur musulman, je veux pouvoir créer, gérer et suivre des contrats de prêt sans intérêt (qard hasan) afin de respecter les principes islamiques tout en aidant mes proches.

**US-024 : Suivi des remboursements**  
En tant qu'utilisateur, je veux pouvoir suivre les échéances de remboursement de mes prêts afin de maintenir à jour ma situation financière et son impact sur ma succession.

**US-026 : Expression des volontés sur le don d'organes**  
En tant qu'utilisateur, je veux pouvoir exprimer clairement mon choix concernant le don d'organes et le rendre accessible aux Wakils désignés avant même mon décès afin que mes volontés soient respectées et immédiatement appliquées en cas d'urgence médicale.

### 5.6 **Gestion du décès**

**US-018 : Déclaration de décès**  
En tant que Wakil, je veux pouvoir déclarer le décès de l'utilisateur afin d'initier le processus de succession.

**US-019 : Confirmation du décès**  
En tant que Wakil secondaire, je veux pouvoir confirmer une déclaration de décès afin de valider l'information.

**US-020 : Accès aux informations post-mortem**  
En tant que bénéficiaire, je veux pouvoir accéder aux informations qui me concernent après confirmation du décès afin de connaître mes droits et responsabilités.

---

## 🛠️ **6. ARCHITECTURE TECHNIQUE**

### 6.1 **Architecture générale**
- Architecture API RESTful
- Backend NestJS avec Fastify
- Base de données PostgreSQL
- Chiffrement E2EE avec gestion des clés côté client
- Dépôt de code GitHub public avec CI/CD
- Système entièrement autonome sans dépendances externes
- Modèle "zero-knowledge" où le serveur ne possède jamais les clés de déchiffrement

### 6.2 **Endpoints API principaux**
- `/api/auth` : Authentification, 2FA, gestion de session
- `/api/users` : Profils, préférences, Wakils
- `/api/relations` : Arbre relationnel et bénéficiaires
- `/api/assets` : Gestion des actifs et valorisations
- `/api/resources` : Ressources informatives sur les règles de succession
- `/api/documents` : Gestion des coffres-forts numériques
- `/api/medical-directives` : Don d'organes et directives médicales
- `/api/death-validation` : Processus de validation du décès
- `/api/notifications` : Configuration des alertes et rappels

### 6.3 **Modèles de données principaux**
- **User** : Informations d'utilisateur, préférences, paramètres
- **Wakil** : Wakils et leurs permissions
- **Relation** : Relations familiales (arbre généalogique)
- **Asset** : Actifs de l'utilisateur avec métadonnées
- **Debt** : Dettes et créances
- **Document** : Documents stockés (métadonnées + contenu chiffré)
- **Notification** : Configuration des notifications
- **Resource** : Ressources informatives sur les règles de succession
- **MedicalDirective** : Don d'organes et directives médicales anticipées

### 6.4 **Sécurité**
- Chiffrement E2EE avec libsodium.js
- Gestion des clés avec BIP39 (phrases mnémoniques)
- JWT pour l'authentification avec rotation fréquente
- Rate limiting sur les endpoints sensibles
- HTTPS obligatoire avec HSTS
- CSP strict et autres en-têtes de sécurité

### 6.5 **Architecture de chiffrement E2EE**
- **Client-side encryption** : Toutes les données sensibles sont chiffrées avant de quitter l'appareil de l'utilisateur
- **Modèle cryptographique sécurisé** :
  - Paire de clés cryptographiques générée localement pour l'utilisateur
  - Clé privée de l'utilisateur chiffrée avec une clé dérivée de son mot de passe
  - Les données sont chiffrées avec la clé publique de l'utilisateur
- **Stockage sécurisé** :
  - Toutes les données sont chiffrées avec la clé publique de l'utilisateur
  - Des copies de la clé privée de l'utilisateur sont chiffrées avec les clés publiques des Wakils désignés
  - Aucune clé en clair stockée sur le serveur
  - Sauvegarde de la clé principale via phrase mnémonique (BIP39)
- **Mécanisme de succession sécurisé** :
  - Lors de la déclaration de décès, le processus de validation est initié
  - Après confirmation par au moins 2 Wakils et expiration du délai de sécurité (30 jours)
  - Le système autorise l'accès aux copies chiffrées des clés correspondant à chaque Wakil
  - Chaque Wakil peut déchiffrer sa copie avec sa propre clé privée
  - Séparation stricte entre la déclaration du décès et l'accès aux données
- **Transmission des accès aux Wakils** :
  - Aucune transmission de clé avant la validation complète du décès
  - Après validation, accès aux copies chiffrées des clés selon les droits prédéfinis
  - Permissions d'accès strictement limitées au périmètre spécifié par l'utilisateur
- **Auditabilité et contrôle** :
  - Journal d'accès horodaté pour chaque consultation
  - Notifications en cas d'accès aux données
  - Impossibilité technique d'accès avant la validation du décès
  - Verrous cryptographiques garantissant l'intégrité du processus

---

## 📊 **7. MÉTRIQUES DE SUCCÈS**

### 7.1 **Métriques d'impact**
- Nombre d'utilisateurs actifs 
- Retours qualitatifs des utilisateurs
- Nombre de testaments finalisés
- Sources de trafic et bouche-à-oreille
- Diversité géographique des utilisateurs

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
- Tests d'intrusion et scores de sécurité

### 7.5 **Métriques de la communauté open source**
- Nombre de contributeurs actifs
- Nombre de pull requests et d'issues traitées
- Temps moyen de réponse aux issues
- Diversité des contributeurs
- Qualité de la documentation (mesurée par des enquêtes)

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
- Gestion avancée des Wakils
- Coffres-forts numériques séparés
- Ressources enrichies sur les règles de succession
- Interface utilisateur améliorée

### 8.3 **Phase 3 : Fonctionnalités complètes (6 mois)**
- Système complet de validation du décès
- Génération de documents légaux
- Contrats de prêt entre particuliers
- Notifications et rappels
- Tableaux de bord avancés
- Support multilingue

### 8.4 **Phase 4 : Évolution (ongoing)**
- Application mobile native
- Améliorations des fonctionnalités existantes
- Support international
- Adaptations à d'autres systèmes juridiques
- Outils d'auto-hébergement simplifiés

---

## ⚠️ **9. CONTRAINTES ET CONSIDÉRATIONS**

### 9.1 **Contraintes légales**
- Conformité au RGPD et autres réglementations sur la protection des données
- Respect des lois sur la succession dans différentes juridictions
- Validité juridique des testaments numériques
- Clarté sur la nature informative des ressources fournies

### 9.2 **Contraintes religieuses**
- Fidélité aux règles islamiques d'héritage (farâ'id)
- Validation par des experts en droit islamique
- Respect des différentes écoles juridiques islamiques

### 9.3 **Contraintes techniques**
- Sécurité maximale requise
- Chiffrement E2EE comme principe fondamental et non négociable
- Impossibilité pour quiconque (y compris les administrateurs) d'accéder aux données déchiffrées
- Exception contrôlée et délibérée pour les directives médicales/don d'organes avec accès restrictif possible avant décès
- Séparation cryptographique stricte entre les directives médicales et le reste des données sensibles
- Performance du chiffrement/déchiffrement côté client
- Risque de perte d'accès aux données en cas de perte des clés
- Absence totale de mécanisme de récupération traditionnel (incompatible avec l'E2EE véritable)
- Nécessité d'éduquer les utilisateurs sur l'importance de la sauvegarde de leur phrase mnémonique
- Développement sans recours à des API tierces imposant des défis supplémentaires
- Nécessité de développer en interne des fonctionnalités alternatives aux services tiers

### 9.4 **Risques identifiés**
- Tentatives de fraude pour accéder aux avoirs
- Fausses déclarations de décès
- Perte définitive des données en cas de mauvaise gestion des clés
- Contestations entre héritiers
- Incertitudes juridiques sur la validité des testaments numériques
- Évolution des lois sur les successions
- Difficulté à maintenir une communauté active de contributeurs
- Risques liés à la sécurité du code open source

---

## 📝 **10. ANNEXES**

### 10.1 **Glossaire des termes**
- **Wasiyah** : Testament islamique, autorisant la disposition libre d'un tiers des avoirs
- **Wakil** (وكيل) : Mandataire désigné pour exécuter les volontés testamentaires
- **Farâ'id** : Science des règles de succession en Islam
- **E2EE** : End-to-End Encryption (chiffrement de bout en bout), système où seuls l'émetteur et le destinataire peuvent lire les données
- **Zero-knowledge** : Approche de sécurité où le serveur ne possède jamais les informations nécessaires pour déchiffrer les données
- **Chiffrement à double clé** : Technique où une donnée est protégée par deux couches de chiffrement distinctes, nécessitant deux clés différentes pour y accéder
- **2FA** : Two-Factor Authentication (authentification à deux facteurs)
- **BIP39** : Bitcoin Improvement Proposal 39, standard pour phrases mnémoniques permettant de sauvegarder des clés cryptographiques sous forme de 12 à 24 mots. Dans un système E2EE, cette phrase représente la SEULE méthode de sauvegarde des clés et sa perte entraîne la perte définitive des données.
- **Sauvegarde cryptographique** : Processus de conservation sécurisée des clés de chiffrement, fondamentalement différent d'une "récupération de compte" traditionnelle qui compromettrait le modèle E2EE.
- **Open Source** : Modèle de développement logiciel où le code source est librement accessible et modifiable

### 10.2 **Références**
- Règles islamiques de succession
- Réglementations sur la protection des données
- Meilleures pratiques en matière de sécurité numérique
- Études sur les comportements utilisateurs en matière de planification successorale
- Licences open source et bonnes pratiques

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