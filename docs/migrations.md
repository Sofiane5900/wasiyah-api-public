# Migration Documentation – Wasiyah API Project

This document explains how **TypeORM migrations** are managed in the `wasiyah-api` project, which uses **NestJS** and **PostgreSQL**.

---

## What is a migration?

A **migration** is a snapshot of the database schema at a specific point in time. It allows you to:

* Create or modify tables, columns, types, indexes, foreign keys, etc.
* Keep a **history of schema changes**.
* Synchronize the database across environments (dev, test, prod).

TypeORM migrations are `.ts` files with two main methods: `up()` and `down()`, which define how to apply and revert changes.

---

## Configuration

* Main config file: `src/data-source.ts`
* Migration folder: `src/migrations/`
* CLI used: [`typeorm-ts-node-commonjs`](https://www.npmjs.com/package/typeorm-ts-node-commonjs)

---

## Available Scripts in `package.json`

| Script               | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `migration:create`   | Creates an empty migration file.                             |
| `migration:generate` | Automatically generates a migration based on entity changes. |
| `migration:run`      | Applies pending migrations to the current database.          |

```bash
pnpm migration:create
pnpm migration:generate
pnpm migration:run
```

---

## Practical Examples in Wasiyah

### 1. Initial schema (`1745760588081-migrations.ts`)

This migration creates the base schema: `user`, `death`, `wakil`, `loan`, `testament`, etc.

It also defines ENUM types, foreign keys, and unique constraints.

### 2. Renaming a table (`1745827736450-rename-table-user-to-musi.ts`)

Renames the table `user` to `musi`, and updates all related foreign key constraints accordingly.

This shows how to handle schema refactors safely.

### 3. Updating an ENUM (`1745842383378-changeRoleUserByMusi.ts`)

Changes the `roles` column from using `'ROLE_USER'` to `'ROLE_MUSI'` ENUM values in the `musi` table.

This illustrates a good practice: rename the old type, create a new one, migrate values, and drop the old type.

---

## Best Practices in Wasiyah

* Migrations are **timestamped** and **ordered chronologically**.
* Never edit a migration already applied in production. Always create a new one.
* Any entity change must be followed by `pnpm migration:generate`.
* All relations (`@ManyToOne`, `@JoinColumn`, etc.) are tested after migration.

---

## Testing Environment

Before tests, a script prepares a fresh database:

```bash
pnpm prepare:test
```

> This executes `scripts/create-test-db.ts`, ideal for Vitest tests.

---

## Folder Structure Summary

```
src/
├── data-source.ts          # TypeORM config
├── migrations/             # Migration files
│   ├── 17457605...ts       # Initial schema
│   ├── 17458277...ts       # Rename User → Musi
│   └── 17458423...ts       # Update ENUM Role
```

---

Each migration faithfully reflects business domain changes, ensuring a clean, consistent, and versioned database for each deployment.
