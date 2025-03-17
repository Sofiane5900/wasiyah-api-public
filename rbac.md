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
| **Expert religieux** | Validateur des ressources islamiques | Compte vérifié comme expert religieux |
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
| `ACCOUNT_VIEW` | Voir les informations du profil |
| `ACCOUNT_EDIT` | Modifier les informations du profil |
| `ACCOUNT_DELETE` | Supprimer le compte |
| `ACCOUNT_EXPORT` | Exporter toutes les données du compte |

### Gestion des Wakils

| Permission | Description |
|------------|-------------|
| `WAKIL_ADD` | Ajouter un nouveau Wakil |
| `WAKIL_VIEW` | Voir la liste des Wakils |
| `WAKIL_EDIT` | Modifier les droits d'un Wakil |
| `WAKIL_REMOVE` | Révoquer un Wakil |
| `WAKIL_ACCEPT` | Accepter une invitation de devenir Wakil |

### Gestion des actifs

| Permission | Description |
|------------|-------------|
| `ASSET_ADD` | Ajouter un actif |
| `ASSET_VIEW` | Voir les actifs |
| `ASSET_EDIT` | Modifier un actif |
| `ASSET_DELETE` | Supprimer un actif |
| `ASSET_ASSIGN` | Attribuer un actif à un bénéficiaire |

### Gestion des documents

| Permission | Description |
|------------|-------------|
| `DOC_ADD` | Ajouter un document |
| `DOC_VIEW` | Voir un document |
| `DOC_EDIT` | Modifier un document |
| `DOC_DELETE` | Supprimer un document |
| `DOC_SHARE` | Partager un document |
| `DOC_CATEGORY_VIEW` | Voir une catégorie de documents (coffre) |

### Gestion du décès

| Permission | Description |
|------------|-------------|
| `DEATH_DECLARE` | Déclarer le décès |
| `DEATH_CONFIRM` | Confirmer une déclaration de décès |
| `DEATH_CONTEST` | Contester une déclaration de décès |
| `DEATH_VALIDATE` | Valider définitivement un décès |

### Fonctionnalités spéciales

| Permission | Description |
|------------|-------------|
| `POSTMORTEM_MESSAGE_VIEW` | Voir les messages posthumes |
| `POSTMORTEM_MESSAGE_ADD` | Créer des messages posthumes |
| `RELIGIOUS_CONTENT_VALIDATE` | Valider du contenu religieux |
| `ACCOUNT_RECOVERY_INITIATE` | Initier une récupération de compte |
| `ACCOUNT_RECOVERY_APPROVE` | Approuver une récupération de compte |

## 📊 Matrice des permissions par rôle

| Permission | Anonyme | Musi | Wakil principal (actif) | Wakil principal (post-mortem) | Wakil standard (actif) | Wakil standard (post-mortem) | Wakil limité (post-mortem) | Expert religieux | Bénéficiaire (post-mortem) |
|------------|---------|------|-------------------------|-------------------------------|------------------------|-----------------------------|----------------------------|------------------|----------------------------|
| `ACCOUNT_VIEW` | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACCOUNT_EDIT` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACCOUNT_DELETE` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ACCOUNT_EXPORT` | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_ADD` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_VIEW` | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `WAKIL_EDIT` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_REMOVE` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `WAKIL_ACCEPT` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ASSET_ADD` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ASSET_VIEW` | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ | ✅* |
| `ASSET_EDIT` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ASSET_DELETE` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `ASSET_ASSIGN` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_ADD` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_VIEW` | ❌ | ✅ | ❌ | ✅** | ❌ | ✅** | ✅** | ❌ | ✅*** |
| `DOC_EDIT` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_DELETE` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `DOC_SHARE` | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| `DOC_CATEGORY_VIEW` | ❌ | ✅ | ❌ | ✅** | ❌ | ✅** | ✅** | ❌ | ✅*** |
| `DEATH_DECLARE` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `DEATH_CONFIRM` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `DEATH_CONTEST` | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `DEATH_VALIDATE` | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `POSTMORTEM_MESSAGE_VIEW` | ❌ | ✅ | ❌ | ✅** | ❌ | ✅** | ✅** | ❌ | ✅*** |
| `POSTMORTEM_MESSAGE_ADD` | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `RELIGIOUS_CONTENT_VALIDATE` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `ACCOUNT_RECOVERY_INITIATE` | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `ACCOUNT_RECOVERY_APPROVE` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |

\* Les bénéficiaires ne peuvent voir que les actifs qui leur sont attribués.
\** Les Wakils ne peuvent voir que les documents des coffres auxquels ils ont accès.
\*** Les bénéficiaires ne peuvent voir que les documents qui leur sont destinés.

## 🔄 Transitions d'états et de droits

### Activation des droits post-mortem

```
┌───────────┐    Déclaration    ┌─────────────┐    Validation    ┌─────────────┐
│   Musi    │ ──────────────────► Décès déclaré│ ──────────────────► Décès validé │
│   actif   │                   │  (30 jours)  │                  │             │
└───────────┘                   └─────────────┘                  └─────────────┘
      │                                │                               │
      │                                │                               │
      ▼                                ▼                               ▼
┌───────────┐                   ┌─────────────┐                 ┌─────────────┐
│  Wakils   │                   │   Wakils    │                 │   Wakils    │
│  actifs   │                   │  en attente │                 │ post-mortem │
└───────────┘                   └─────────────┘                 └─────────────┘
      │                                                               │
      │                                                               │
      ▼                                                               ▼
┌───────────┐                                                  ┌─────────────┐
│ Documents │                                                  │  Documents  │
│  privés   │                                                  │ accessibles │
└───────────┘                                                  └─────────────┘
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