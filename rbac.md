# 🔐 Role-based access control system (RBAC) - Wasiyah

## 📋 Introduction

This document defines the role-based access control (RBAC) system for the Wasiyah application. It specifies user roles and their access permissions to pages and functionalities, enabling administrators to control precisely who can access what.

**Main objective**: To enable administrators to assign roles to users and control their access to pages according to their role, ensuring that each user only has access to the functions and data corresponding to their status.

## 👤 Roles definition

### Main roles

| Role | Description | Assignment |
|------|-------------|------------|
| **ROLE_ADMIN** | System administrator with all rights | Manual assignment by super-admin |
| **ROLE_MUSI** | Main user (testator) | Automatic assignment upon registration |
| **ROLE_WAKIL** | Representative designated by a Musi | Assignment by Musi invitation |

**Important note**: A user can have multiple roles. For example, a Musi can also become a Wakil for other users, and vice versa.

### User States

| State | Description | Impact |
|-------|-------------|---------|
| **PENDING** | Account created, email not verified | Limited access (verification only) |
| **ACTIVE** | Email verified, functional account | Full access according to role |
| **INACTIVE** | Account disabled | No access |

## 🌐 Page Access Control

### Public Pages (Anonymous)

| Page | Route | Description | Access |
|------|-------|-------------|--------|
| **Home** | `/` | Public homepage | 🌍 All |
| **Register** | `/register` | Create a new account | 🌍 All |
| **Login** | `/login` | Log into the system | 🌍 All |
| **Email verification** | `/verify-email` | Confirm email address | 🌍 All |

### Musi Pages (ROLE_MUSI)

| Page | Route | Description | Access |
|------|-------|-------------|--------|
| **Musi Dashboard** | `/dashboard` | Main dashboard | ✅ ROLE_MUSI |
| **Testament** | `/testament` | Testament management | ✅ ROLE_MUSI |
| **Safe** | `/safes` | Safe management | ✅ ROLE_MUSI |
| **My Wakils** | `/wakils` | Representative management | ✅ ROLE_MUSI |
| **Assets** | `/assets` | Asset management | ✅ ROLE_MUSI |
| **Posthumous messages** | `/posthumous-messages` | Messages after death | ✅ ROLE_MUSI |
| **My profile** | `/profile` | Personal information | ✅ ROLE_MUSI |

### Wakil Pages (ROLE_WAKIL)

| Page | Route | Description | Access |
|------|-------|-------------|--------|
| **Wakil Dashboard** | `/wakil-dashboard` | Representative dashboard | ✅ ROLE_WAKIL |
| **My mandates** | `/my-mandates` | List of Musis I am Wakil for | ✅ ROLE_WAKIL |
| **Assigned documents** | `/assigned-documents` | Documents shared with me | ✅ ROLE_WAKIL |
| **Death declarations** | `/death-declarations` | Declare/confirm death | ✅ ROLE_WAKIL |
| **My Wakil profile** | `/wakil-profile` | My representative information | ✅ ROLE_WAKIL |

### Admin Pages (ROLE_ADMIN)

| Page | Route | Description | Access |
|------|-------|-------------|--------|
| **Admin Dashboard** | `/admin` | Administration panel | ✅ ROLE_ADMIN |
| **User management** | `/admin/users` | Account list and management | ✅ ROLE_ADMIN |
| **Role assignment** | `/admin/roles` | Modify user roles | ✅ ROLE_ADMIN |
| **System monitoring** | `/admin/monitoring` | Application monitoring | ✅ ROLE_ADMIN |
| **Audit logs** | `/admin/audit` | Action history | ✅ ROLE_ADMIN |

## ⚙️ Feature Access Control

### Features by Role

#### ROLE_MUSI
| Feature | Permission | Description |
|---------|------------|-------------|
| **Create testament** | ✅ | Write last will and testament |
| **Manage safes** | ✅ | Create/modify/delete safes |
| **Invite Wakils** | ✅ | Designate representatives |
| **Manage assets** | ✅ | Add/modify assets |
| **Posthumous messages** | ✅ | Create messages for after death |
| **View profile** | ✅ | View personal information |
| **Edit profile** | ✅ | Update personal data |
| **Delete account** | ✅ | Permanently close account |

#### ROLE_WAKIL
| Feature | Permission | Description |
|---------|------------|-------------|
| **Accept mandate** | ✅ | Confirm Wakil role |
| **View assigned mandates** | ✅ | List of Musis I am Wakil for |
| **Access shared documents** | ✅ | View assigned documents |
| **Declare death** | ✅ | Report a Musi's death |
| **Confirm death** | ✅ | Validate death declaration |
| **Contest death** | ✅ | Contest false declaration |
| **View Wakil profile** | ✅ | View representative information |

#### ROLE_ADMIN
| Feature | Permission | Description |
|---------|------------|-------------|
| **View all users** | ✅ | Complete account list |
| **Modify user roles** | ✅ | Assign/revoke roles |
| **Suspend accounts** | ✅ | Disable users |
| **Access system logs** | ✅ | View activity history |
| **Manage configuration** | ✅ | System settings |
| **User support** | ✅ | Technical assistance |

## 🔐 Detailed Permission Matrix

### Page Access

| Page/Route | Anonymous | ROLE_MUSI | ROLE_WAKIL | ROLE_ADMIN |
|------------|-----------|-----------|------------|------------|
| `/` (Home) | ✅ | ✅ | ✅ | ✅ |
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

### CRUD Actions

| Action | ROLE_MUSI | ROLE_WAKIL | ROLE_ADMIN |
|--------|-----------|------------|------------|
| **Create testament** | ✅ | ❌ | ❌ |
| **Modify testament** | ✅ | ❌ | ❌ |
| **View testament** | ✅ | ✅* | ✅ |
| **Create safe** | ✅ | ❌ | ❌ |
| **View safe** | ✅ | ✅* | ✅ |
| **Invite Wakil** | ✅ | ❌ | ❌ |
| **Accept Wakil mandate** | ❌ | ✅ | ❌ |
| **View all users** | ❌ | ❌ | ✅ |
| **Modify roles** | ❌ | ❌ | ✅ |

*\* Only if assigned by the Musi*

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

### Database Configuration

```sql
CREATE TYPE "musi_roles_enum" AS ENUM(
  'ROLE_ADMIN', 
  'ROLE_MUSI', 
  'ROLE_WAKIL'
);

CREATE TABLE "musi" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" varchar UNIQUE NOT NULL,
  "roles" musi_roles_enum[] DEFAULT ARRAY['ROLE_MUSI'], -- Array for multi-roles
  "status" musi_status_enum DEFAULT 'pending',
  -- other fields...
);

-- Junction table for multiple roles (alternative)
CREATE TABLE "user_roles" (
  "user_id" uuid REFERENCES "musi"("id"),
  "role" musi_roles_enum,
  PRIMARY KEY ("user_id", "role")
);
```

## 🎯 Role Assignment

### Assignment Process

1. **ROLE_MUSI**: Automatic assignment upon registration
2. **ROLE_WAKIL**: Assignment after accepting an invitation
3. **ROLE_ADMIN**: Manual assignment by an existing administrator

### Admin Assignment Workflow

```typescript
// Endpoint to assign a role (ROLE_ADMIN only)
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

## 📊 Management Rules

### MR1 - Role Assignment
- A user can have multiple roles (e.g., ROLE_MUSI + ROLE_WAKIL)
- A Wakil can also be a Musi and vice versa
- Only ROLE_ADMIN can modify other users' roles
- Self-assignment of roles is forbidden

### MR2 - Page Access
- Page access is determined by the user's main role
- PENDING users only have access to verification pages
- INACTIVE users have no access

### MR3 - Role Hierarchy
- ROLE_ADMIN > ROLE_MUSI = ROLE_WAKIL
- Administrators have access to all read functionalities
- Musis and Wakils have separate and complementary domains of action

## 🔄 Multi-role Management

### Typical Use Cases

1. **Musi becoming Wakil**: A user creates their testament (ROLE_MUSI) then accepts to be a representative for a friend (+ ROLE_WAKIL)

2. **Wakil becoming Musi**: A representative decides to create their own testament (+ ROLE_MUSI)

3. **Unified Interface**: The user sees a combined dashboard with access to both types of functionalities

### Access Logic

- If user has `ROLE_MUSI` → Access to Musi pages
- If user has `ROLE_WAKIL` → Access to Wakil pages
- If user has both → Access to both types of pages
- Contextual navigation based on active role

## 📝 Implementation Notes

This RBAC is designed to be:
- **Extensible**: Easy to add new roles
- **Granular**: Fine-grained access control by page and functionality
- **Secure**: Double verification (JWT + Roles)
- **Manageable**: Admin interface to manage permissions
- **Flexible**: Support for multi-roles for complex use cases

---

**Version**: v1.1 - English translation
**Last update**: July 2025 
