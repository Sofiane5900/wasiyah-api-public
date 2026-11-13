# Wasiyah API 🔐📜

## About the project

Wasiyah API is the backend of a secure web application designed to create and manage wills compliant with Islamic law. This API provides the services needed to manage users, wills, and ensures the security of sensitive data.

### Key features

- ✅ Management of wills compliant with Islamic law
- 🔐 Support for end-to-end encryption (E2EE)
- 💰 API for managing digital and physical assets
- 📝 Secure storage of last wills
- 👥 Management of beneficiaries and executors
- 🔄 Will versioning

## Technologies used

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Fastify](https://www.fastify.io/) - Fast, low-overhead web server
- [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [JWT](https://jwt.io/) - Secure authentication
- [Swagger](https://swagger.io/) - API documentation
- [PNPM](https://pnpm.io/) - Fast, disk-space-efficient package manager
- [Vitest](https://vitest.dev/) - Unit and integration testing framework
- [Playwright](https://playwright.dev/) - End-to-end testing framework

## Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- PNPM (v8 or higher)

### Installation steps

1. Clone the repository
```bash
git clone https://github.com/your-username/wasiyah-api.git
cd wasiyah-api
```

2. Install dependencies with PNPM
```bash
pnpm install
```

3. Configuration
```bash
# Configure environment variables
cp .env.example .env
```

4. Start the service
```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start
```

## Project structure

```
wasiyah-api/
├── src/
│   ├── main.ts                # Application entry point
│   ├── app.module.ts          # Main module
│   ├── auth/                  # Authentication
│   ├── users/                 # User management
│   ├── testaments/            # Will management
│   ├── crypto/                # Cryptography services
│   └── common/                # Shared utilities
├── test/
│   ├── unit/                  # Unit tests (Vitest)
│   ├── integration/           # Integration tests (Vitest)
│   └── e2e/                   # End-to-end tests (Playwright)
├── dist/                      # Compiled code
└── ...
```

## Tests

The project uses several levels of testing to ensure code quality:

### Unit and integration tests (Vitest)

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate a coverage report
pnpm test:coverage
```

### End-to-end tests (Playwright)

```bash
# Run e2e tests in headless mode
pnpm test:e2e

# Generate an HTML report of e2e tests
pnpm test:e2e:report
```

## API Endpoints

The API exposes the following endpoints:

- **Auth**: `/api/auth` - Authentication and session management
- **Users**: `/api/users` - User management
- **Testaments**: `/api/testaments` - Will management
- **Assets**: `/api/assets` - Asset management
- **Beneficiaries**: `/api/beneficiaries` - Beneficiary management

Full API documentation is available via Swagger at `/api/docs` when the application is running in development mode.

## Security

The Wasiyah API implements several layers of security:

- JWT authentication
- Input data validation
- CSRF attack protection
- Rate limiting
- Support for E2EE encryption (sensitive data is encrypted client-side)

## Contributing

Contributions to the Wasiyah API project are welcome! This project uses Git Flow to manage the development cycle.

### Git Flow workflow

We use [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) to organize our work. Here are the main branches:

- `main`: Production code
- `develop`: Development code, continuous integration
- `feature/*`: New features
- `release/*`: Production release preparation
- `hotfix/*`: Urgent production fixes
- `bugfix/*`: Development bug fixes

### How to contribute

1. Fork the repository
2. Clone your fork and set up Git Flow
   ```bash
   git clone https://github.com/your-username/wasiyah-api.git
   cd wasiyah-api
   git flow init -d
   ```

3. Install dependencies with PNPM
   ```bash
   pnpm install
   ```

4. Create a feature branch
   ```bash
   git flow feature start your-feature-name
   ```

5. Work on your feature and commit your changes
   ```bash
   git add .
   git commit -m 'feat: add an amazing feature'
   ```

6. Make sure tests pass
   ```bash
   pnpm test
   pnpm test:e2e
   ```

7. Publish your feature branch
   ```bash
   git flow feature publish your-feature-name
   ```

8. Open a Pull Request to the `develop` branch

9. Once the PR is approved and merged, finish your feature branch
   ```bash
   git flow feature finish your-feature-name
   ```

### Commit conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code refactoring
- `test:` - Adding or fixing tests
- `chore:` - Maintenance tasks, dependency updates, etc.

Please make sure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or suggestions, feel free to open an issue on GitHub.

---

⚠️ **Important security note**: Wasiyah API handles sensitive and personal information. Make sure to follow best security practices during development and deployment.
