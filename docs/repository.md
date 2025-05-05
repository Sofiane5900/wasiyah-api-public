# Repository Documentation

This documentation helps you generate and configure the repository for the entity.

---

## What is a Repository ?

A repository is responsible for handling CRUD operations (Create, Read, Update, Delete) on the database for a given entity.

With TypeORM, each entity (e.g., Wakil, Loan) can have its own repository that exposes methods such as:

- `find()`
- `findOne()`
- `findOneBy()`
- `findAll()`
- `insert()`
- `update()`
- `save()`
- `delete()`

You can also define custom methods if needed. (see on : <a href="https://orkhan.gitbook.io/typeorm/docs">https://orkhan.gitbook.io/typeorm/docs</a>)

## Available Scripts in `package.json`

| Script            | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `make:repository` | Creates a repository file.                                   |

```bash
pnpm make:repository <Entity>
```

The command will generate an entity.repository.ts file in your entity's folder.

## Practical Examples in Wasiyah

### 1. Generate your repository (`wakil.repository.ts`)
```bash
pnpm make:repository Wakil
```

Here is an example of the generated file:

```Javascript
@Injectable()
export class WakilRepository extends ServiceEntityRepository<Wakil> {
        constructor(private readonly dataSource: DataSource) {
        super(Wakil, dataSource.createEntityManager());
    }

    // Example method—you can adapt it or add others as needed.
    /*async findByExampleField(value: string): Promise<Wakil | null> {
    return this.findOneBy({ value });
    }*/
}
```

### 2. Configuration

Declare your repository in the module file of your entity.

```javascript
@Module({
    imports: [TypeOrmModule.forFeature([Wakil])],
    providers: [
        WakilService,
        // add next lines to configure your repositor
        {
            provide: WakilRepository,
            useFactory: (dataSource: DataSource) => {
                return new WakilRepository(dataSource);
            },
            inject: [DataSource],
        },
        // end of repôsitory configuration
    ],
    controllers: [WakilController],
    exports: [WakilRepository], // export your repository
})
export class WakilModule {}

```

### 3. Use TypeORM query builder

You can use TypeORM's query builder for your custom or complex queries.

```javascript
async findPosthumousMessagesByWakil(wakilId: string): Promise<Wakil> {
    return await this.createQueryBuilder()
    .relation(Wakil, "propertyName")
    .of(wakilId)
    .loadMany();
}
```

## Folder Structure Summary

```text
wakil/
├── wakil.repository.ts   // Data access components of the entity
```

---
