# DTO Documentation

This document explains how **DTOs (Data Transfer Objects)** are implemented and used in the `wasiyah-api` project, which follows **NestJS** conventions.

---

## What is a DTO?
A **DTO** is an object that defines how data is sent or received through the API. It ensures:

- **Validation** of input data using `class-validator`
- **Documentation** of fields using Swagger’s `@ApiProperty`
- **Encapsulation** of logic for `POST`, `PATCH`, `GET`, or `FILTER` operations

In NestJS, DTOs are plain TypeScript classes, often decorated to enforce validation and describe the expected payload.

---

## Key Principles in `wasiyah-api`

- **Validation decorators** from `class-validator`: `@IsString`, `@IsEmail`, `@MinLength`, etc.
- **API documentation** with `@ApiProperty` (from `@nestjs/swagger`)
- **Custom validators** like `@UniqueEntity` for DB-level constraints
- **Separation of DTOs by use case**:
  - `CreateXDto` → for creation
  - `UpdateXDto` → for updates
  - `QueryXDto` → for filtering
  - `ResponseDto` → for API output formatting

---

## Example – `CreateMusiDto`
This DTO is used to register a new user:

```ts
export class CreateMusiDto {
  @ApiProperty({ description: "The Musi's first name", minLength: 2 })
  @MinLength(2)
  firstName: string;

  @ApiProperty({ description: "The Musi's last name", minLength: 2 })
  @MinLength(2)
  lastName: string;

  @ApiProperty({ description: "The Musi's email address" })
  @IsEmail()
  @UniqueEntity(Musi, 'email')
  email: string;

  @ApiProperty({ description: "The Musi's password", minLength: 8 })
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/, {
    message: 'Password too weak',
  })
  password: string;
}
```

### Key Concepts Illustrated:
- All fields are validated (`@MinLength`, `@IsEmail`, etc.)
- Swagger decorators (`@ApiProperty`) generate OpenAPI documentation
- `@UniqueEntity` ensures the email is not duplicated in the DB

---

This minimal example is sufficient to understand how DTOs are structured and why they are useful. Each module (like `wakil`, `testament`, etc.) follows the same pattern, adapting to its own domain logic.
 