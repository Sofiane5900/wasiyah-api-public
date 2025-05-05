# Entity Documentation

This file documents the main entities of the `wasiyah-api` project, their structure, relationships, and functional roles.

## General Convention

All entities in the project follow these principles:

- Built using **TypeORM** decorators: `@Entity`, `@Column`, etc.
- Documented with **Swagger** via `@ApiProperty` for OpenAPI generation.
- Enums are centralized in the `enum/` folder.
- Relationships are explicitly defined: `@OneToMany`, `@ManyToOne`, `@OneToOne`.
- Consistent naming: `camelCase` for attributes, `PascalCase` for class names.

---

## List of Documented Entities

- `Musi` – Main user (testator)
- `Wakil` – Trusted representative
- `Testament` – Islamic will
- `Appoint` – Wakil designation
- `Declare` – Testament declaration
- `Death` – Death declaration
- `Safe` – Encrypted vault
- `Document` – Encrypted files
- `Loan` & `Repayment` – Qard Hasan loans
- `PosthumousMessage` – Letters revealed after death

---

## Common Entity Structure

```ts
@Entity()
export class Example {
  @ApiProperty({ description: 'Unique ID', example: 'uuid-v4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Descriptive name' })
  @Column({ type: String, length: 50 })
  name: string;

  @ApiProperty({ description: 'Related entity' })
  @ManyToOne(() => RelatedEntity)
  related: RelatedEntity;
}
```

---

## Entity Example – `Wakil`

The `Wakil` entity represents a trusted person designated by the testator (`Musi`) to carry out tasks such as verifying death, managing posthumous messages, or unlocking safes.

```ts
@Entity()
export class Wakil {
  @ApiProperty({
    description: 'Unique identifier of the wakil',
    example: 'd5b3a4c9-72f8-4abf-b98e-d7e5c9bfc330',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Last name of the wakil' })
  @Column({ type: String, length: 50 })
  lastName: string;

  @ApiProperty({ description: 'First name of the wakil' })
  @Column({ type: String, length: 50 })
  firstName: string;

  @ApiProperty({ description: 'Email address of the wakil' })
  @Column({ type: String, length: 50 })
  email: string;

  @ApiProperty({ description: 'Trust score of the wakil' })
  @Column('int')
  trustScore: number;

  @ApiProperty({
    description: 'List of appointments associated with this wakil',
    type: () => [Appoint],
  })
  @OneToMany(() => Appoint, 'wakil')
  appointments: Appoint[];

  @ApiProperty({
    description: 'List of declarations made by this wakil',
    type: () => [Declare],
  })
  @OneToMany(() => Declare, 'wakil')
  declarations: Declare[];
}
```

### Key Concepts Illustrated:
- `@Entity()` marks this class as a DB table.
- `@PrimaryGeneratedColumn('uuid')` defines the unique ID.
- `@ApiProperty()` ensures proper Swagger/OpenAPI documentation.
- Relations to other entities are declared explicitly with `@OneToMany`.
