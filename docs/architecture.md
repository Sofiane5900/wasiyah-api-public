# Wasiyah API – Architecture Overview

## Architecture Type

The `wasiyah-api` project is built using a **modular layered architecture**, heavily inspired by **Clean Architecture** principles.  
Each business domain is isolated in its own independent module, following a clear structure:

- **Controller**: Handles HTTP requests (interface with the outside world)
- **Service**: Contains business logic
- **Entity**: Defines the data model (TypeORM)
- **Module**: Declares the dependencies and binds components

This design enables:
- A **clear separation of concerns**
- **Easy testing** of each layer
- **Scalability**, with new modules added without disrupting the core

---

## Typical Module Structure

Example with `wakil/`:

```text
wakil/
├── wakil.controller.ts   // HTTP routes related to wakils
├── wakil.service.ts      // Business logic (trust score, etc.)
├── wakil.entity.ts       // TypeORM entity representing a wakil
├── wakil.module.ts       // NestJS module declaration
```

## Domain Modules Overview

Each functional domain has its own dedicated folder:

| Module              | Responsibility                               |
|---------------------|----------------------------------------------|
| `musi/`             | Main user (testator)                         |
| `wakil/`            | Trusted representatives (Wakils)            |
| `testament/`        | Will creation and management                |
| `appoint/`          | Assigning wakils                            |
| `declare/`          | Declaration of testaments                   |
| `death/`            | Death declaration                           |
| `document/`         | Encrypted documents and vaults             |
| `loan/`             | Interest-free loans (Qard Hasan)            |
| `repayment/`        | Loan repayments                             |
| `posthumous-message/`| Posthumous letters/messages                 |
| `safe/`             | Digital safes                               |

## Security & Role Management

Security is built on:

- **JWT authentication**
- **Custom Guards** for role-based access control (RBAC)
- **Centralized enums** under `enum/` (e.g. Roles, Relation, etc.)

## Shared & Core Modules

| Module       | Responsibility                                      |
|--------------|-----------------------------------------------------|
| `auth/`      | JWT authentication flow                             |
| `guards/`    | Access control (JWT, role-based)                    |
| `common/`    | Reusable tools (validators, URL helpers…)           |
| `config/`    | Application configuration (JWT, env…)              |
| `filter/`    | Global error handling                               |
| `openapi/`   | Swagger decorators for API documentation            |
| `types/`     | Fastify type extensions                             |

## Architecture Benefits

- **Modularity**: each domain is autonomous
- **Testability**: business logic can be tested in isolation
- **Maintainability**: well-structured and easy to navigate
- **Scalability**: easily extendable without technical debt

