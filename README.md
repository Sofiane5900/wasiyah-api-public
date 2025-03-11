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

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone https://github.com/votre-username/wasiyah-api.git
cd wasiyah-api
```

2. Installer les dépendances
```bash
npm install
```

3. Configuration
```bash
# Configurer les variables d'environnement
cp .env.example .env
```

4. Démarrer le service
```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
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
├── test/                      # Tests
├── dist/                      # Code compilé
└── ...
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

Les contributions au projet Wasiyah API sont les bienvenues ! Voici comment vous pouvez participer :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'feat: ajouter une fonctionnalité incroyable'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

Veuillez vous assurer que votre code respecte les normes de codage du projet et inclut des tests appropriés.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

⚠️ **Note importante sur la sécurité** : Wasiyah API traite des informations sensibles et personnelles. Assurez-vous de suivre les meilleures pratiques en matière de sécurité lors du développement et du déploiement.