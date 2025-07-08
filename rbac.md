# 🔐 Role-based access control system (RBAC) - Wasiyah

## 📋 Introduction

This document defines the role-based access control (RBAC) system for the Wasiyah application. It specifies user roles and their access permissions to pages and functionalities, enabling administrators to control precisely who can access what.

**Objectif principal** : Permettre aux administrateurs d'attribuer des rôles aux utilisateurs et de contrôler leurs accès aux pages selon leur rôle, garantissant que chaque utilisateur n'ait accès qu'aux fonctionnalités et données correspondant à son statut.

## 👤 Définition des rôles

### Rôles principaux

| Rôle | Description | Attribution |
|------|-------------|-------------|
| **ROLE_ADMIN** | Administrateur système avec tous les droits | Attribution manuelle par super-admin |
| **ROLE_MUSI** | Utilisateur principal (testateur) | Attribution automatique lors de l'inscription |
| **ROLE_WAKIL** | Mandataire désigné par un Musi | Attribution par invitation d'un Musi |

**Note importante** : Un utilisateur peut cumuler plusieurs rôles. Par exemple, un Musi peut également devenir Wakil pour d'autres utilisateurs, et inversement.

### États des utilisateurs

| État | Description | Impact |
|------|-------------|--------|
| **PENDING** | Compte créé, email non vérifié | Accès limité (vérification uniquement) |
| **ACTIVE** | Email vérifié, compte fonctionnel | Accès complet selon le rôle |
| **INACTIVE** | Compte désactivé | Aucun accès |

## 🌐 Contrôle d'accès aux pages

### Pages publiques (Anonyme)

| Page | Route | Description | Accès |
|------|-------|-------------|-------|
| **Accueil** | `/` | Page d'accueil publique | 🌍 Tous |
| **Inscription** | `/register` | Créer un nouveau compte | 🌍 Tous |
| **Connexion** | `/login` | Se connecter au système | 🌍 Tous |
| **Vérification email** | `/verify-email` | Confirmer son adresse email | 🌍 Tous |

### Pages Musi (ROLE_MUSI)

| Page | Route | Description | Accès |
|------|-------|-------------|-------|
| **Dashboard Musi** | `/dashboard` | Tableau de bord principal | ✅ ROLE_MUSI |
| **Testament** | `/testament` | Gestion du testament | ✅ ROLE_MUSI |
| **Coffre-fort** | `/safes` | Gestion des coffres-forts | ✅ ROLE_MUSI |
| **Mes Wakils** | `/wakils` | Gestion des mandataires | ✅ ROLE_MUSI |
| **Actifs** | `/assets` | Gestion des biens et actifs | ✅ ROLE_MUSI |
| **Messages posthumes** | `/posthumous-messages` | Messages après décès | ✅ ROLE_MUSI |
| **Mon profil** | `/profile` | Informations personnelles | ✅ ROLE_MUSI |

### Pages Wakil (ROLE_WAKIL)

| Page | Route | Description | Accès |
|------|-------|-------------|-------|
| **Dashboard Wakil** | `/wakil-dashboard` | Tableau de bord mandataire | ✅ ROLE_WAKIL |
| **Mes mandats** | `/my-mandates` | Liste des Musis dont je suis Wakil | ✅ ROLE_WAKIL |
| **Documents assignés** | `/assigned-documents` | Documents partagés avec moi | ✅ ROLE_WAKIL |
| **Déclarations de décès** | `/death-declarations` | Déclarer/confirmer un décès | ✅ ROLE_WAKIL |
| **Mon profil Wakil** | `/wakil-profile` | Mes informations de mandataire | ✅ ROLE_WAKIL |

### Pages Admin (ROLE_ADMIN)

| Page | Route | Description | Accès |
|------|-------|-------------|-------|
| **Dashboard Admin** | `/admin` | Panneau d'administration | ✅ ROLE_ADMIN |
| **Gestion utilisateurs** | `/admin/users` | Liste et gestion des comptes | ✅ ROLE_ADMIN |
| **Attribution des rôles** | `/admin/roles` | Modifier les rôles utilisateurs | ✅ ROLE_ADMIN |
| **Monitoring système** | `/admin/monitoring` | Surveillance de l'application | ✅ ROLE_ADMIN |
| **Logs d'audit** | `/admin/audit` | Historique des actions | ✅ ROLE_ADMIN |

## ⚙️ Contrôle d'accès aux fonctionnalités

### Fonctionnalités par rôle

#### ROLE_MUSI
| Fonctionnalité | Permission | Description |
|----------------|------------|-------------|
| **Créer testament** | ✅ | Rédiger ses dernières volontés |
| **Gérer coffres-forts** | ✅ | Créer/modifier/supprimer ses coffres |
| **Inviter Wakils** | ✅ | Désigner des mandataires |
| **Gérer actifs** | ✅ | Ajouter/modifier ses biens |
| **Messages posthumes** | ✅ | Créer des messages pour après sa mort |
| **Voir son profil** | ✅ | Consulter ses informations |
| **Modifier son profil** | ✅ | Mettre à jour ses données |
| **Supprimer son compte** | ✅ | Fermer définitivement son compte |

#### ROLE_WAKIL
| Fonctionnalité | Permission | Description |
|----------------|------------|-------------|
| **Accepter mandat** | ✅ | Confirmer un rôle de Wakil |
| **Voir mandats assignés** | ✅ | Liste des Musis dont je suis Wakil |
| **Accéder documents partagés** | ✅ | Consulter les documents assignés |
| **Déclarer décès** | ✅ | Signaler le décès d'un Musi |
| **Confirmer décès** | ✅ | Valider une déclaration de décès |
| **Contester décès** | ✅ | Contester une fausse déclaration |
| **Voir profil Wakil** | ✅ | Consulter ses informations de mandataire |

#### ROLE_ADMIN
| Fonctionnalité | Permission | Description |
|----------------|------------|-------------|
| **Voir tous les utilisateurs** | ✅ | Liste complète des comptes |
| **Modifier rôles utilisateurs** | ✅ | Attribuer/révoquer des rôles |
| **Suspendre comptes** | ✅ | Désactiver des utilisateurs |
| **Accéder logs système** | ✅ | Consulter l'historique d'activité |
| **Gérer configuration** | ✅ | Paramètres système |
| **Support utilisateurs** | ✅ | Assistance technique |

## 🔐 Matrice de permissions détaillée

### Accès aux pages

| Page/Route | Anonyme | ROLE_MUSI | ROLE_WAKIL | ROLE_ADMIN |
|------------|---------|-----------|------------|------------|
| `/` (Accueil) | ✅ | ✅ | ✅ | ✅ |
| `/register` | ✅ | ❌ | ❌ | ❌ |
| `/login` | ✅ | ❌ | ❌ | ❌ |
| `/verify-email` | ❌| ✅ | ✅ | ✅ |
| `/dashboard` | ❌ | ✅ | ❌ | ❌ |
| `/testament` | ❌ | ✅ | ❌ | ❌ |
| `/safes` | ❌ | ✅ | ❌ | ❌ |
| `/wakils` | ❌ | ✅ | ❌ | ❌ |
| `/assets` | ❌ | ✅ | ❌ | ❌ |
| `/posthumous-messages` | ❌ | ✅ | ❌ | ❌ |
| `/profile` | ❌ | ✅ | ❌ | ❌ |
| `/wakil-dashboard` | ❌ | ✅ | ✅ | ❌ |
| `/my-mandates` | ❌ | ❌ | ✅ | ❌ |
| `/assigned-documents` | ❌ | ❌ | ✅ | ❌ |
| `/death-declarations` | ❌ | ❌ | ✅ | ❌ |
| `/wakil-profile` | ❌ | ❌ | ✅ | ❌ |
| `/admin/*` | ❌ | ❌ | ❌ | ✅ |

### Actions CRUD

| Action | ROLE_MUSI | ROLE_WAKIL | ROLE_ADMIN |
|--------|-----------|------------|------------|
| **Créer testament** | ✅ | ❌ | ❌ |
| **Modifier testament** | ✅ | ❌ | ❌ |
| **Voir testament** | ✅ | ✅* | ✅ |
| **Créer coffre-fort** | ✅ | ❌ | ❌ |
| **Voir coffre-fort** | ✅ | ✅* | ✅ |
| **Inviter Wakil** | ✅ | ❌ | ❌ |
| **Accepter mandat Wakil** | ❌ | ✅ | ❌ |
| **Voir tous les utilisateurs** | ❌ | ❌ | ✅ |
| **Modifier rôles** | ❌ | ❌ | ✅ |

*\* Uniquement si assigné par le Musi*

## 🛡️ Implémentation technique

### Guards NestJS

```typescript
// Route protégée par rôle
@Roles('ROLE_ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('/admin/users')
async getAllUsers() { ... }

// Route accessible aux Musis
@Roles('ROLE_MUSI')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('/testament')
async getTestament() { ... }

// Route accessible aux Wakils
@Roles('ROLE_WAKIL')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('/my-mandates')
async getMyMandates() { ... }

// Route accessible aux utilisateurs ayant PLUSIEURS rôles
@Roles('ROLE_MUSI', 'ROLE_WAKIL') // OU logique
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('/dashboard')
async getDashboard() { ... }
```

### Enum des rôles

```typescript
export enum RoleUser {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MUSI = 'ROLE_MUSI',
  ROLE_WAKIL = 'ROLE_WAKIL'
}

// Interface pour utilisateur avec multi-rôles
interface UserWithRoles {
  id: string;
  email: string;
  roles: RoleUser[]; // Array de rôles
  hasRole(role: RoleUser): boolean;
}
```

### Configuration base de données

```sql
CREATE TYPE "musi_roles_enum" AS ENUM(
  'ROLE_ADMIN', 
  'ROLE_MUSI', 
  'ROLE_WAKIL'
);

CREATE TABLE "musi" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" varchar UNIQUE NOT NULL,
  "roles" musi_roles_enum[] DEFAULT ARRAY['ROLE_MUSI'], -- Array pour multi-rôles
  "status" musi_status_enum DEFAULT 'pending',
  -- autres champs...
);

-- Table de liaison pour les rôles multiples (alternative)
CREATE TABLE "user_roles" (
  "user_id" uuid REFERENCES "musi"("id"),
  "role" musi_roles_enum,
  PRIMARY KEY ("user_id", "role")
);
```

## 🎯 Attribution des rôles

### Processus d'attribution

1. **ROLE_MUSI** : Attribution automatique lors de l'inscription
2. **ROLE_WAKIL** : Attribution après acceptation d'une invitation
3. **ROLE_ADMIN** : Attribution manuelle par un administrateur existant

### Workflow d'attribution admin

```typescript
// Endpoint pour attribuer un rôle (ROLE_ADMIN uniquement)
@Roles('ROLE_ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Patch('/admin/users/:id/role')
async assignRole(
  @Param('id') userId: string,
  @Body() roleDto: { role: RoleUser }
) {
  return this.userService.updateRole(userId, roleDto.role);
}
```

## 📊 Règles de gestion

### RG1 - Attribution des rôles
- Un utilisateur peut cumuler plusieurs rôles (ex: ROLE_MUSI + ROLE_WAKIL)
- Un Wakil peut également être Musi et inversement
- Seuls les ROLE_ADMIN peuvent modifier les rôles des autres utilisateurs
- L'auto-attribution de rôles est interdite

### RG2 - Accès aux pages
- L'accès aux pages est déterminé par le rôle principal de l'utilisateur
- Les utilisateurs PENDING n'ont accès qu'aux pages de vérification
- Les utilisateurs INACTIVE n'ont aucun accès

### RG3 - Hiérarchie des rôles
- ROLE_ADMIN > ROLE_MUSI = ROLE_WAKIL
- Les administrateurs ont accès à toutes les fonctionnalités de lecture
- Les Musis et Wakils ont des domaines d'action séparés et complémentaires

## 🔄 Gestion des multi-rôles

### Cas d'usage typiques

1. **Musi qui devient Wakil** : Un utilisateur crée son testament (ROLE_MUSI) puis accepte d'être mandataire pour un ami (+ ROLE_WAKIL)

2. **Wakil qui devient Musi** : Un mandataire décide de créer son propre testament (+ ROLE_MUSI)

3. **Interface unifiée** : L'utilisateur voit un dashboard combiné avec accès aux deux types de fonctionnalités

### Logique d'accès

- Si l'utilisateur a `ROLE_MUSI` → Accès aux pages Musi
- Si l'utilisateur a `ROLE_WAKIL` → Accès aux pages Wakil  
- Si l'utilisateur a les deux → Accès aux deux types de pages
- Navigation contextuelle selon le rôle actif

## 📝 Notes d'implémentation

Ce RBAC est conçu pour être :
- **Extensible** : Facile d'ajouter de nouveaux rôles
- **Granulaire** : Contrôle fin des accès par page et fonctionnalité
- **Sécurisé** : Double vérification (JWT + Rôles)
- **Administrable** : Interface admin pour gérer les permissions
- **Flexible** : Support des multi-rôles pour les cas d'usage complexes

---

**Version** : v1.0 - Spécification pour implémentation
**Dernière mise à jour** : Janvier 2025 
