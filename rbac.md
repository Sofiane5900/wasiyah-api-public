# 🔐 Système de contrôle d'accès basé sur les rôles (RBAC) - Wasiyah

## 📋 Introduction

Ce document définit le système de contrôle d'accès basé sur les rôles (RBAC) pour l'application Wasiyah. Il spécifie les différents rôles utilisateur, les permissions associées et la matrice d'autorisation qui détermine quelles actions chaque rôle peut effectuer.

Le modèle RBAC de Wasiyah est conçu pour :

1. Protéger les données sensibles des utilisateurs
2. Respecter l'architecture de chiffrement E2EE
3. Implémenter le principe du moindre privilège
4. Assurer une séparation claire des responsabilités
5. Permettre une transition des droits sécurisée après le décès

## 👤 Définition des rôles

### Rôles principaux

| Rôle | Description | Conditions d'attribution |
|------|-------------|--------------------------|
| **Anonyme** | Utilisateur non authentifié | Aucune |
| **Musi** | Propriétaire principal du compte et des données (testateur) | S'inscrire et créer un compte |
| **Wakil principal** | Mandataire désigné avec droits étendus | Être désigné explicitement par le Musi comme administrateur de confiance |
| **Wakil standard** | Mandataire avec accès partiel aux données | Être désigné par le Musi avec des droits standard |
| **Wakil limité** | Mandataire avec accès en lecture seule | Être désigné par le Musi avec des droits limités |
| **Bénéficiaire** | Personne destinée à recevoir des actifs ou messages | Être désigné par le Musi comme bénéficiaire |

### États des rôles Wakil

Les rôles Wakil peuvent être dans différents états qui affectent leurs permissions :

| État | Description |
|------|-------------|
| **En attente** | Invitation envoyée, non confirmée |
| **Actif** | Invitation acceptée, Musi vivant |
| **Post-mortem** | Après confirmation du décès du Musi |
| **Révoqué** | Droits retirés par le Musi |

## 🔑 Définition des permissions

### Gestion du compte

| Permission | Description |
|------------|-------------|
| `COMPTE_VOIR` | Voir les informations du profil |
| `COMPTE_MODIFIER` | Modifier les informations du profil |
| `COMPTE_SUPPRIMER` | Supprimer le compte |
| `COMPTE_EXPORTER` | Exporter toutes les données du compte |

### Gestion des Wakils

| Permission | Description |
|------------|-------------|
| `WAKIL_AJOUTER` | Ajouter un nouveau Wakil |
| `WAKIL_VOIR` | Voir la liste des Wakils |
| `WAKIL_MODIFIER` | Modifier les droits d'un Wakil |
| `WAKIL_SUPPRIMER` | Révoquer un Wakil |
| `WAKIL_ACCEPTER` | Accepter une invitation de devenir Wakil |

### Gestion des actifs

| Permission | Description |
|------------|-------------|
| `ACTIF_AJOUTER` | Ajouter un actif |
| `ACTIF_VOIR` | Voir les actifs |
| `ACTIF_MODIFIER` | Modifier un actif |
| `ACTIF_SUPPRIMER` | Supprimer un actif |
| `ACTIF_ASSIGNER` | Attribuer un actif à un bénéficiaire |

### Gestion des documents

| Permission | Description |
|------------|-------------|
| `DOC_AJOUTER` | Ajouter un document |
| `DOC_VOIR` | Voir un document |
| `DOC_MODIFIER` | Modifier un document |
| `DOC_SUPPRIMER` | Supprimer un document |
| `DOC_PARTAGER` | Partager un document |
| `DOC_CATEGORIE_VOIR` | Voir une catégorie de documents (coffre) |

### Gestion du décès

| Permission | Description |
|------------|-------------|
| `DECES_DECLARER` | Déclarer le décès |
| `DECES_CONFIRMER` | Confirmer une déclaration de décès |
| `DECES_CONTESTER` | Contester une déclaration de décès |
| `DECES_VALIDER` | Valider définitivement un décès |

### Fonctionnalités spéciales

| Permission | Description |
|------------|-------------|
| `MESSAGE_POSTHUME_VOIR` | Voir les messages posthumes |
| `MESSAGE_POSTHUME_AJOUTER` | Créer des messages posthumes |
| `RECUPERATION_COMPTE_INITIER` | Initier une récupération de compte |
| `RECUPERATION_COMPTE_APPROUVER` | Approuver une récupération de compte |

## 📊 Matrice des permissions par rôle

| Permission | Anonyme | Musi | Wakil principal (actif) | Wakil principal (post-mortem) | Wakil standard (actif) | Wakil standard (post-mortem) | Wakil limité (post-mortem) | Bénéficiaire (post-mortem) |
|------------|---------|------|-------------------------|-------------------------------|------------------------|-----------------------------|----------------------------|----------------------------|
| `COMPTE_VOIR` | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `COMPTE_MODIFIER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `COMPTE_SUPPRIMER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `COMPTE_EXPORTER` | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_AJOUTER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_VOIR` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `WAKIL_MODIFIER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_SUPPRIMER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_ACCEPTER` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACTIF_AJOUTER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACTIF_VOIR` | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅* |
| `ACTIF_MODIFIER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACTIF_SUPPRIMER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACTIF_ASSIGNER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_AJOUTER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_VOIR` | ❌ | ✅ | ❌ | ✅** | ❌ | ✅** | ✅** | ✅*** |
| `DOC_MODIFIER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_SUPPRIMER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_PARTAGER` | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `DOC_CATEGORIE_VOIR` | ❌ | ✅ | ❌ | ✅** | ❌ | ✅** | ✅** | ✅*** |
| `DECES_DECLARER` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `DECES_CONFIRMER` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `DECES_CONTESTER` | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `DECES_VALIDER` | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `MESSAGE_POSTHUME_VOIR` | ❌ | ✅ | ❌ | ✅** | ❌ | ✅** | ✅** | ✅*** |
| `MESSAGE_POSTHUME_AJOUTER` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `RECUPERATION_COMPTE_INITIER` | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `RECUPERATION_COMPTE_APPROUVER` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |

\* Les bénéficiaires ne peuvent voir que les actifs qui leur sont attribués.
\** Les Wakils ne peuvent voir que les documents des coffres auxquels ils ont accès.
\*** Les bénéficiaires ne peuvent voir que les documents qui leur sont destinés.

## 🔄 Transitions d'états et de droits

### Activation des droits post-mortem

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│     ÉTAT INITIAL        │     │  PÉRIODE CONTESTATION   │     │     ÉTAT FINAL          │
│    (Musi vivant)        │     │    (30 jours)           │     │   (Décès confirmé)      │
├─────────────────────────┤     ├─────────────────────────┤     ├─────────────────────────┤
│                         │     │                         │     │                         │
│  ┌─────┐                │     │  ┌─────┐                │     │  ┌─────┐                │
│  │Musi │                │     │  │Musi │                │     │  │Musi │                │
│  └──┬──┘                │     │  └──┬──┘                │     │  └──┬──┘                │
│     │                   │     │     │                   │     │     │                   │
│     │ ACCÈS TOTAL       │     │     │ INACTIF          │     │     │ INACTIF           │
│     ▼                   │     │     ▼                   │     │     ▼                   │
│  ┌──────────────┐       │     │  ┌──────────────┐       │     │  ┌──────────────┐       │
│  │  Documents   │       │     │  │  Documents   │       │     │  │  Documents   │       │
│  │   privés     │       │     │  │   privés     │       │     │  │   privés     │       │
│  └──────────────┘       │     │  └──────────────┘       │     │  └──────────────┘       │
│    ▲         ▲          │     │    ▲         ▲          │     │    ▲         ▲          │
│    │         │          │     │    │         │          │     │    │         │          │
│    │         │          │     │    │         │          │     │    │         │          │
│  AUCUN     LIMITÉ       │     │  LIMITÉ    PARTIEL      │     │  COMPLET   COMPLET      │
│  ACCÈS     (selon       │     │  (coffres  (coffres     │     │  (tous     (tous        │
│            partage)     │     │   assignés) assignés)   │     │  documents) documents)  │
│    │         │          │     │    │         │          │     │    │         │          │
│  ┌─┴───┐   ┌─┴───┐      │     │  ┌─┴───┐   ┌─┴───┐      │     │  ┌─┴───┐   ┌─┴───┐      │
│  │Wakil│   │Wakil│      │     │  │Wakil│   │Wakil│      │     │  │Wakil│   │Wakil│      │
│  │Std. │   │Princ│      │     │  │Std. │   │Princ│      │     │  │Std. │   │Princ│      │
│  └─────┘   └─────┘      │     │  └─────┘   └─────┘      │     │  └─────┘   └─────┘      │
│                         │     │                         │     │                         │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                │                           │                             │
                │                           │                             │
                │      DÉCLARATION DE       │      VALIDATION DU          │
                └─────────► DÉCÈS ──────────┘─────────► DÉCÈS ────────────┘
                       par Wakils                 après période
                                                 de contestation
```

### Processus de récupération de compte

La récupération de compte nécessite l'approbation de plusieurs Wakils, avec un score de confiance cumulé supérieur à 75%.

```
┌───────────┐    Initiation    ┌─────────────┐    Approbations    ┌─────────────┐
│  Compte   │ ───────────────► │ Récupération │ ───────────────────► Nouveau mot  │
│ verrouillé│                  │   en cours   │    (Score > 75%)   │   de passe   │
└───────────┘                  └─────────────┘                    └─────────────┘
```

## 🔒 Considérations de sécurité

### Chiffrement et contrôle d'accès

Ce RBAC fonctionne en conjonction avec le système de chiffrement E2EE :

1. Les permissions définissent si une action est autorisée
2. Le chiffrement E2EE détermine si les données peuvent techniquement être déchiffrées

Cette double protection garantit que même en cas de contournement du RBAC, les données restent inaccessibles sans les clés cryptographiques appropriées.

### Validation des transitions d'état

Les transitions d'état (comme la validation d'un décès) requièrent :
- Des approbations multiples
- Un délai de sécurité
- Des notifications à tous les intervenants
- Des mécanismes de contestation

### Audit et traçabilité

Toutes les actions relatives aux permissions sont :
- Journalisées de manière sécurisée
- Horodatées
- Signées cryptographiquement
- Consultables par les Wakils principaux

## 🚀 Implémentation technique

### Principes de mise en œuvre

1. **Vérification à plusieurs niveaux** :
   - Middleware d'authentification (JWT)
   - Middleware de vérification des rôles
   - Vérification dans les contrôleurs
   - Vérification dans les services métier

2. **Stockage des permissions** :
   - Définition statique des permissions dans le code
   - Association dynamique des permissions aux rôles en base de données
   - Caching des permissions pour optimiser les performances

3. **API authorization** :
   - Utilisation de décorateurs pour les routes
   - Vérification des permissions dans les Guards

### Exemples de code (pseudo-code)

```typescript
// Décorateur de vérification de permission
@RequirePermission('ASSET_VIEW')
async getAssets() {
  // ...
}

// Middleware de vérification des rôles
function checkRole(role: UserRole) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send('Accès refusé');
    }
    next();
  };
}

// Vérification conditionnelle (post-mortem)
async function viewDocument(docId, userId) {
  const user = await userService.findById(userId);
  const doc = await documentService.findById(docId);
  
  if (user.role === 'WAKIL') {
    const musi = await userService.findById(doc.musiId);
    
    if (!musi.isDeceased && !doc.isSharedWithWakil(userId)) {
      throw new ForbiddenException();
    }
  }
  
  // Suite du code...
}
```

## 📝 Maintenance et évolution

Le système RBAC devra évoluer avec les besoins du projet. Un processus de revue et mise à jour est nécessaire :

1. Documenter les modifications de permissions
2. Tester rigoureusement les changements de rôles
3. Informer les utilisateurs des changements de privilèges
4. Auditer régulièrement l'utilisation des permissions

---

Ce document est une version préliminaire du RBAC et sera ajusté au fur et à mesure de l'évolution du projet et de la définition de la stack technique. 