# Wasiyah API 🔐📜

## À propos du projet

Wasiyah API est le backend d'une application web sécurisée destinée à créer et gérer des testaments conformes à la législation islamique. Cette API fournit les services nécessaires pour gérer les utilisateurs, les testaments, et assure la sécurité des données sensibles.

### Fonctionnalités principales

- ✅ Gestion des testaments conformes à la législation islamique
- 🔐 Support pour le chiffrement de bout en bout (E2EE)
- 💰 API pour la gestion des actifs numériques et physiques
- 📝 Stockage sécurisé des dernières volontés
- 👥 Gestion des bénéficiaires et exécuteurs testamentaires
- 🔄 Versionnement des testaments

## Technologies utilisées

- [NestJS](https://nestjs.com/) - Framework Node.js progressif
- [Fastify](https://www.fastify.io/) - Serveur web rapide et à faible surcharge
- [PostgreSQL](https://www.postgresql.org/) - Base de données relationnelle robuste
- [TypeORM](https://typeorm.io/) - ORM pour TypeScript et JavaScript
- [JWT](https://jwt.io/) - Authentification sécurisée
- [Swagger](https://swagger.io/) - Documentation de l'API
- [PNPM](https://pnpm.io/) - Gestionnaire de paquets rapide et économe en espace disque
- [Vitest](https://vitest.dev/) - Framework de test unitaire et d'intégration
- [Playwright](https://playwright.dev/) - Framework de test end-to-end

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- PNPM (v8 ou supérieur)

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone https://github.com/votre-username/wasiyah-api.git
cd wasiyah-api
```

2. Installer les dépendances avec PNPM
```bash
pnpm install
```

3. Configuration
```bash
# Configurer les variables d'environnement
cp .env.example .env
```

4. Démarrer le service
```bash
# Mode développement
pnpm dev

# Mode production
pnpm build
pnpm start
```

## Structure du projet

```
wasiyah-api/
├── src/
│   ├── main.ts                # Point d'entrée de l'application
│   ├── app.module.ts          # Module principal
│   ├── auth/                  # Authentification
│   ├── users/                 # Gestion des utilisateurs
│   ├── testaments/            # Gestion des testaments
│   ├── crypto/                # Services de cryptographie
│   └── common/                # Utilitaires partagés
├── test/
│   ├── unit/                  # Tests unitaires (Vitest)
│   ├── integration/           # Tests d'intégration (Vitest)
│   └── e2e/                   # Tests end-to-end (Playwright)
├── dist/                      # Code compilé
└── ...
```

## Tests

Le projet utilise plusieurs niveaux de tests pour assurer la qualité du code :

### Tests unitaires et d'intégration (Vitest)

```bash
# Exécuter tous les tests
pnpm test

# Exécuter les tests en mode watch
pnpm test:watch

# Générer un rapport de couverture
pnpm test:coverage
```

### Tests end-to-end (Playwright)

```bash
# Exécuter les tests e2e en mode headless
pnpm test:e2e

# Générer un rapport HTML des tests e2e
pnpm test:e2e:report
```

## API Endpoints

L'API expose les endpoints suivants :

- **Auth** : `/api/auth` - Authentification et gestion des sessions
- **Users** : `/api/users` - Gestion des utilisateurs
- **Testaments** : `/api/testaments` - Gestion des testaments
- **Assets** : `/api/assets` - Gestion des actifs
- **Beneficiaries** : `/api/beneficiaries` - Gestion des bénéficiaires

Une documentation complète de l'API est disponible via Swagger à l'adresse `/api/docs` lorsque l'application est en cours d'exécution en mode développement.

## Sécurité

L'API Wasiyah implémente plusieurs niveaux de sécurité :

- Authentification JWT
- Validation des données entrantes
- Protection contre les attaques CSRF
- Rate limiting
- Support pour le chiffrement E2EE (les données sensibles sont chiffrées côté client)

## Contribution

Les contributions au projet Wasiyah API sont les bienvenues ! Ce projet utilise Git Flow pour gérer le cycle de développement.

### Workflow Git Flow

Nous utilisons [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) pour organiser notre travail. Voici les principales branches :

- `main` : Code en production
- `develop` : Code en développement, intégration continue
- `feature/*` : Nouvelles fonctionnalités
- `release/*` : Préparation des versions pour la production
- `hotfix/*` : Corrections urgentes en production
- `bugfix/*` : Corrections de bugs en développement

### Comment contribuer

1. Forkez le dépôt
2. Clonez votre fork et configurez Git Flow
   ```bash
   git clone https://github.com/votre-username/wasiyah-api.git
   cd wasiyah-api
   git flow init -d
   ```

3. Installez les dépendances avec PNPM
   ```bash
   pnpm install
   ```

4. Créez une branche de fonctionnalité
   ```bash
   git flow feature start nom-de-votre-fonctionnalite
   ```

5. Travaillez sur votre fonctionnalité et committez vos changements
   ```bash
   git add .
   git commit -m 'feat: ajouter une fonctionnalité incroyable'
   ```

6. Assurez-vous que les tests passent
   ```bash
   pnpm test
   pnpm test:e2e
   ```

7. Publiez votre branche de fonctionnalité
   ```bash
   git flow feature publish nom-de-votre-fonctionnalite
   ```

8. Ouvrez une Pull Request vers la branche `develop`

9. Une fois la PR approuvée et fusionnée, terminez votre branche de fonctionnalité
   ```bash
   git flow feature finish nom-de-votre-fonctionnalite
   ```

### Conventions de commit

Nous suivons les [Conventional Commits](https://www.conventionalcommits.org/) pour nos messages de commit :

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Modifications de la documentation
- `style:` - Formatage, point-virgules manquants, etc.
- `refactor:` - Refactorisation du code
- `test:` - Ajout ou correction de tests
- `chore:` - Tâches de maintenance, mises à jour de dépendances, etc.

Veuillez vous assurer que votre code respecte les normes de codage du projet et inclut des tests appropriés.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

⚠️ **Note importante sur la sécurité** : Wasiyah API traite des informations sensibles et personnelles. Assurez-vous de suivre les meilleures pratiques en matière de sécurité lors du développement et du déploiement.