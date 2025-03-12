# 🔐 **GUIDE COMPLET DU CHIFFREMENT DE BOUT EN BOUT**
# **Wasiyah - Sécurité et confidentialité des données**

---

## 📋 **1. INTRODUCTION**

### 1.1 **Objectif de ce document**
Ce guide technique détaille le fonctionnement du chiffrement de bout en bout (E2EE) dans l'application Wasiyah. Il est destiné aux développeurs, auditeurs de sécurité et utilisateurs avancés souhaitant comprendre les mécanismes qui garantissent la confidentialité totale des données.

### 1.2 **Principes fondamentaux**
Wasiyah repose sur les principes de sécurité suivants :
- **Zero-knowledge** : Le serveur n'a jamais accès aux données déchiffrées
- **E2EE intégral** : Seul l'utilisateur (et ses Wakils après son décès) peuvent accéder aux données
- **Absence de porte dérobée** : Aucun mécanisme de récupération classique qui compromettrait la sécurité
- **Transparence totale** : Code de chiffrement open source et auditable

---

## 🔄 **2. CYCLE DE VIE COMPLET**

### 2.1 **Création du compte et génération des clés**

#### 2.1.1 **Processus d'inscription**
1. L'utilisateur crée un compte avec **email + mot de passe**
2. L'email est vérifié via un lien ou code de confirmation
3. Le système propose la configuration d'une **authentification à deux facteurs (2FA)** :
   - Fortement recommandée mais optionnelle
   - Plusieurs méthodes proposées : email, application d'authentification
   - Incitation visuelle indiquant le niveau de sécurité du compte
4. Le navigateur ou l'application génère **localement** une paire de clés cryptographiques :
   - **Clé publique** (utilisée pour chiffrer les données)
   - **Clé privée** (utilisée pour déchiffrer, jamais transmise au serveur)
5. Le système génère également une **clé d'accès post-mortem** aléatoire (pour l'accès des Wakils après décès)

#### 2.1.2 **Création et stockage de la phrase mnémonique**
1. Une **phrase mnémonique BIP39** est générée (12 ou 24 mots)
2. Cette phrase est affichée à l'utilisateur avec des instructions claires de sauvegarde
3. L'utilisateur doit confirmer avoir sauvegardé la phrase (en ressaisissant certains mots)
4. La phrase n'est **jamais stockée** sur le serveur

#### 2.1.3 **Chiffrement et stockage des clés**
1. La **clé privée est chiffrée** avec une clé dérivée du mot de passe de l'utilisateur
   - Utilisation de fonctions de dérivation sécurisées (PBKDF2, Argon2) avec sel et étirement
2. La clé privée chiffrée est stockée localement (localStorage, IndexedDB ou fichier local)
3. La **clé d'accès post-mortem** est chiffrée avec la clé publique du système
4. Les données chiffrées par le système incluent des métadonnées sur qui peut y accéder et quand

---

## 🔑 **3. SCÉNARIOS D'UTILISATION**

### 3.1 **Connexion standard et accès aux données**

#### 3.1.1 **Processus de connexion**
1. L'utilisateur entre son email et mot de passe
2. Si le 2FA est activé, le serveur demande également le code 2FA
3. Après authentification réussie, l'application récupère la clé privée chiffrée

#### 3.1.2 **Déchiffrement et accès**
1. Le mot de passe saisi est utilisé pour **dériver localement la clé** qui déchiffre la clé privée
2. La clé privée déchiffrée est conservée temporairement en mémoire
3. Cette clé privée permet de déchiffrer toutes les données personnelles
4. À la fin de la session, la clé privée déchiffrée est supprimée de la mémoire

### 3.2 **Changement de mot de passe**

#### 3.2.1 **Étapes du changement**
1. L'utilisateur s'authentifie avec son mot de passe actuel
2. L'ancien mot de passe est utilisé pour déchiffrer sa clé privée
3. L'utilisateur saisit et confirme son nouveau mot de passe
4. **L'application rechiffre la clé privée** avec une clé dérivée du nouveau mot de passe
5. La version chiffrée avec l'ancien mot de passe est détruite
6. La nouvelle version est stockée localement

#### 3.2.2 **Point critique de sécurité**
Cette étape de rechiffrement est **cruciale** car :
- Sans elle, le changement de mot de passe rendrait les données inaccessibles
- Elle garantit la continuité d'accès tout en invalidant l'ancien mot de passe
- Elle s'effectue entièrement en local sans transmission de clés déchiffrées

### 3.3 **Récupération en cas de perte d'accès**

#### 3.3.1 **Perte de mot de passe**
1. L'utilisateur déclenche une procédure de réinitialisation de mot de passe
2. Après vérification d'identité, il peut définir un nouveau mot de passe
3. **MAIS** ce nouveau mot de passe ne permet pas de déchiffrer la clé privée
4. Un message explique que les données restent inaccessibles
5. L'utilisateur doit utiliser sa phrase mnémonique BIP39 pour restaurer l'accès

#### 3.3.2 **Restauration par phrase mnémonique**
1. L'application propose un formulaire de saisie de la phrase mnémonique
2. La phrase saisie permet de **régénérer la clé privée** originale
3. Cette clé privée est immédiatement rechiffrée avec le nouveau mot de passe
4. L'accès aux données est rétabli

#### 3.3.3 **Perte d'appareil**
1. L'utilisateur se connecte depuis un nouvel appareil
2. Même si l'authentification réussit, les données restent inaccessibles
3. L'application demande d'importer la phrase mnémonique
4. Le processus de restauration s'effectue comme dans le cas d'une perte de mot de passe

#### 3.3.4 **Perte de la phrase mnémonique**
- Si l'utilisateur perd à la fois l'accès à son appareil et sa phrase mnémonique :
  - **Les données sont définitivement inaccessibles**
  - Aucune procédure de récupération n'existe (garantie de sécurité)
- Des avertissements clairs sont affichés lors de la création du compte

### 3.4 **Transmission aux Wakils après décès**

#### 3.4.1 **Déclaration et confirmation du décès**
1. Un Wakil déclare le décès de l'utilisateur via l'interface dédiée
2. D'autres Wakils (au moins 1) doivent confirmer la déclaration
3. Un délai de sécurité de 30 jours est enclenché
4. L'utilisateur reçoit des notifications (protection contre les fausses déclarations)

#### 3.4.2 **Activation des accès post-mortem**
1. Après confirmation et expiration du délai, le système active la procédure de transmission
2. La clé d'accès post-mortem est déchiffrée par le système
3. Cette clé permet de créer des accès temporaires et limités pour chaque Wakil
4. Chaque Wakil ne peut accéder qu'aux données correspondant à son rôle prédéfini

---

## 🛡️ **4. CONSIDÉRATIONS TECHNIQUES**

### 4.1 **Algorithmes et standards cryptographiques**
- Chiffrement asymétrique : **RSA 4096 bits** ou **Courbes elliptiques (ECDH P-256)**
- Chiffrement symétrique : **AES-256-GCM**
- Dérivation de clés : **Argon2id** ou **PBKDF2** avec itérations nombreuses
- Standard mnémonique : **BIP39** (utilisé dans les wallets cryptographiques)
- Signatures : **Ed25519** pour authentifier les messages et requêtes

### 4.2 **Stockage et synchronisation**
- Clé privée chiffrée stockée dans un espace sécurisé local
- Synchronisation des données chiffrées uniquement
- Vérification d'intégrité des données par hachage et signatures
- Horodatage et versionnement des données pour prévenir les conflits

### 4.3 **Mesures de protection supplémentaires**
- Rotation régulière des clés de session
- Détection des tentatives d'extraction de clés
- Chiffrement en couches pour les données critiques
- Limitation stricte du temps de conservation des clés en mémoire
- **Niveaux de sécurité du compte clairement indiqués**

### 4.4 **Niveaux de sécurité du compte**
Wasiyah implémente un système de niveaux de sécurité visibles par l'utilisateur :

#### 4.4.1 **Niveau de base**
- Authentification par email et mot de passe uniquement
- **Limitations** : 
  - Alertes de sécurité plus fréquentes
  - Restrictions sur certaines opérations sensibles
  - Délai de sécurité plus long pour la validation du décès (45 jours)
  - Limitations sur le nombre de Wakils (maximum 3)

#### 4.4.2 **Niveau standard**
- Authentification à deux facteurs (2FA) activée
- **Avantages** :
  - Délai de sécurité standard pour la validation du décès (30 jours)
  - Nombre maximal de Wakils autorisé (5)
  - Accès à toutes les fonctionnalités de gestion des actifs

#### 4.4.3 **Niveau renforcé**
- 2FA via application d'authentification (TOTP)
- Vérification périodique d'identité
- **Avantages supplémentaires** :
  - Option de délai de sécurité personnalisable (15-30 jours)
  - Possibilité de créer des règles d'accès avancées pour les Wakils
  - Notifications de sécurité prioritaires

L'objectif est d'encourager tous les utilisateurs à adopter au minimum le niveau standard, tout en rendant l'application accessible aux utilisateurs moins technophiles.

---

## ⚠️ **5. LIMITATIONS ET AVERTISSEMENTS**

### 5.1 **Risques inhérents au modèle**
- **Perte définitive des données** en cas de perte de la phrase mnémonique
- Impossibilité de récupération par l'équipe Wasiyah
- Nécessité d'une sauvegarde rigoureuse par l'utilisateur
- Risque de fausses déclarations de décès (atténué par le système de confirmation multiple)

### 5.2 **Bonnes pratiques pour les utilisateurs**
- Stocker la phrase mnémonique dans plusieurs endroits physiques sécurisés
- Envisager des solutions comme coffre bancaire ou notaire
- Ne jamais partager la phrase avec quiconque avant le décès
- Considérer des mécanismes de transmission sécurisée aux Wakils
- **Activer l'authentification à deux facteurs** (2FA) pour renforcer la sécurité du compte
- Privilégier les applications d'authentification (TOTP) plutôt que les SMS quand c'est possible

---

## 🔍 **6. VÉRIFIABILITÉ ET AUDIT**

### 6.1 **Transparence du code**
- Code source du chiffrement disponible et auditable
- Documentation technique détaillée des fonctions cryptographiques
- Possibilité d'audit indépendant du système de gestion des clés

### 6.2 **Tests et validation**
- Test de pénétration réguliers
- Challenges cryptographiques pour identifier les faiblesses
- Processus de revue de code strict pour les composants de sécurité
- Validation des implémentations par des experts en cryptographie

---

## 📋 **7. RÉCAPITULATIF SIMPLIFIÉ**

| **Action** | **Conséquence** | **Solution** |
|------------------|----------------|----------------|
| **Connexion normale** | Accès au compte et aux données ✅ | Déchiffrement local avec la clé privée stockée |
| **Changement de mot de passe** | Accès maintenu ✅ | Rechiffrement automatique de la clé privée |
| **Perte de mot de passe** | Authentification possible, données inaccessibles 🔒 | Utiliser la phrase BIP39 pour récupérer la clé |
| **Perte d'appareil** | Reconnexion possible, données inaccessibles 🔒 | Importer la phrase BIP39 sur le nouvel appareil |
| **Perte de la phrase BIP39** | Perte définitive des données ❌ | Aucune solution possible 🚨 |
| **Décès de l'utilisateur** | Accès controlé pour les Wakils après validation ✅ | Processus de validation avec délai de sécurité |

---

*Ce document est complémentaire au PRD (Product Requirements Document) de Wasiyah et détaille spécifiquement les aspects cryptographiques de l'application. Il sera mis à jour en fonction des évolutions technologiques et des retours d'audit de sécurité.* 