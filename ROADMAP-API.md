# Roadmap Wasiyah Api 

## Structure du projet 


├── wasiyah-api
    ├── .devcontainer
    ├── .github
    ├── .husky
    │    ├── pre-commit
    ├──  dist
    ├── docker
    │   ├── CI
    │   │    ├── docker-compose.yaml
    │   │    ├── Dockerfile
    │   ├── dev
    │   │    ├── Dockerfile
    │   │    ├── entrypoint.sh
    │   ├── prod
    │   │    ├── Dockerfile
    ├── docs
    │   ├── architecture.md
    │   ├── dto.md
    │   ├── e2ee-guide.md
    │   ├── entities.md
    │   ├── migrations.md
    │   ├── repository.md
    │   ├── routes.md
    │   ├── tests.md
    ├── jwt
    │   ├── private.pem
    │   ├── public.pem
    ├──  node_modules
    ├── regles-gestions
    │   ├── regles-de-gestion-postmortem.md
    │   ├── regles-de-gestion-wakil.md
    │   └── regles-gestion-securite.md
    ├── script
    │    ├── create-test-db.ts
    │    ├── generate-repository.ts
    ├── src
    │   ├── appoint
    │   │   ├── appoint.controller.ts
    │   │   ├── appoint.entity.ts
    │   │   ├── appoint.module.ts
    │   │   ├── appoint.repository.ts
    │   │   └── appoint.service.ts
    │   ├── auth
    │   │   ├── auth.controller.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.service.ts
    │   │   └── dto
    │   │       └── login.dto.ts
    │   ├── common
    │   │   ├── abstract
    │   │   │   └── abstract-service-entity.repository.ts
    │   │   ├── url-generator
    │   │   │   ├── url-generator.interface.ts
    │   │   │   ├── url-generator.module.ts
    │   │   │   └── url-generator.service.ts
    │   │   └── validator
    │   │       └── unique-entity.validator.ts
    │   ├── config
    │   │   └── jwt.config.ts
    │   ├── data-source.ts
    │   ├── death
    │   │   ├── death.controller.ts
    │   │   ├── death.entity.ts
    │   │   ├── death.module.ts
    │   │   ├── death.repository.ts
    │   │   └── death.service.ts
    │   ├── declare
    │   │   ├── declare.controller.ts
    │   │   ├── declare.entity.ts
    │   │   ├── declare.module.ts
    │   │   ├── declare.repository.ts
    │   │   └── declare.service.ts
    │   ├── document
    │   │   ├── document.controller.ts
    │   │   ├── document.entity.ts
    │   │   ├── document.module.ts
    │   │   ├── document.repository.ts
    │   │   └── document.service.ts
    │   ├── enum
    │   │   ├── Relation.ts
    │   │   ├── Roles.ts
    │   │   ├── Safe.ts
    │   │   └── User.ts
    │   ├── filter
    │   │   └── filter-exception.ts
    │   ├── guards
    │   │   ├── jwt
    │   │   │   └── jwt-auth.guards.ts
    │   │   └── roles
    │   │       ├── roles.decorator.ts
    │   │       └── roles.guards.ts
    │   ├── interfaces
    │   ├── loan
    │   │   ├── loan.controller.ts
    │   │   ├── loan.entity.ts
    │   │   ├── loan.module.ts
    │   │   ├── loan.repository.ts
    │   │   └── loan.service.ts
    │   ├── mail
    │   │   └── mail.service.ts
    │   ├── main.ts
    │   ├── migrations
    │   │   └── 1745950230765-migrations.ts
    │   ├── musi
    │   │   ├── dto
    │   │   │   ├── create-musi.dto.ts
    │   │   │   ├── musi-response.dto.ts
    │   │   │   ├── query-musi.dto.ts
    │   │   │   └── update-musi.dto.ts
    │   │   ├── musi.controller.ts
    │   │   ├── musi.entity.ts
    │   │   ├── musi.module.ts
    │   │   ├── musi.repository.ts
    │   │   └── musi.service.ts
    │   ├── openapi
    │   │   └── api.decorator.ts
    │   ├── posthumous-message
    │   │   ├── posthumous-mesage.entity.ts
    │   │   ├── posthumous-message.controller.ts
    │   │   ├── posthumous-message.module.ts
    │   │   ├── posthumous-message.repository.ts
    │   │   └── posthumous-message.service.ts
    │   ├── repayment
    │   │   ├── repayment.controller.ts
    │   │   ├── repayment.entity.ts
    │   │   ├── repayment.module.ts
    │   │   ├── repayment.repository.ts
    │   │   └── repayment.service.ts
    │   ├── safe
    │   │   ├── safe.controller.ts
    │   │   ├── safe.entity.ts
    │   │   ├── safe.module.ts
    │   │   ├── safe.repository.ts
    │   │   └── safe.service.ts
    │   ├── testament
    │   │   ├── testament.controller.ts
    │   │   ├── testament.entity.ts
    │   │   ├── testament.module.ts
    │   │   ├── testament.repository.ts
    │   │   └── testament.service.ts
    │   ├── types
    │   │   ├── fastify-cookie.d.ts
    │   │   └── fastify.d.ts
    │   └── wakil
    │       ├── wakil.controller.ts
    │       ├── wakil.entity.ts
    │       ├── wakil.module.ts
    │       ├── wakil.repository.ts
    │       └── wakil.service.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   ├── data-source.ts
    │   ├── main.ts
    ├── tests
    │   ├── app.controller.spec.ts
    │   ├── e2e
    │   │   └── musi.e2e.spec.ts
    │   └── unit
    │       └── musi.service.spec.ts
    ├── dockerignore
    ├── .env.test
    ├── .gitignore
    ├── .prettierrc
    ├── docker-compose.override.yaml
    ├── docker-compose.yaml
    ├── E2EE-GUIDE.md
    ├── eslint.config.mjs
    ├── lexique.md
    ├── LICENSE
    ├── nest-cli-json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── PRD.md
    ├── rbac.md
    ├── README.md
    ├── regles-de-gestion.md
    ├── tsconfig.build.json
    └── tsconfig.json


## Etat d'avancement Global