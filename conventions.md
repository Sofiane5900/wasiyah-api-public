# 📐 Conventions du projet Wasiyah

Ce document définit les conventions à suivre pour le développement du projet Wasiyah. Ces conventions visent à maintenir une cohérence dans le code, la documentation et les processus de développement.

## 📂 Conventions de nommage

### Fichiers et répertoires

- Utiliser le **kebab-case** pour les noms de fichiers et répertoires : `mon-fichier.js`, `dossier-important/`
- Pour les fichiers de configuration à la racine, suivre les conventions standards : `.gitignore`, `README.md`, `package.json`
- Suffixer les fichiers selon leur rôle :
  - `.component.ts` pour les composants (front-end)
  - `.service.ts` pour les services
  - `.controller.ts` pour les contrôleurs
  - `.model.ts` pour les modèles de données
  - `.test.ts` pour les tests unitaires
  - `.e2e.ts` pour les tests end-to-end

### Variables, fonctions et classes

- **camelCase** pour les variables et fonctions : `userAccount`, `calculateTotal()`
- **PascalCase** pour les classes, interfaces, types et composants : `UserAccount`, `AuthenticationService`
- **UPPER_SNAKE_CASE** pour les constantes : `MAX_RETRY_ATTEMPTS`, `API_BASE_URL`
- Préfixer les variables privées avec un underscore : `_privateVariable`
- Utiliser des noms descriptifs et éviter les abréviations obscures

## 🔀 Git Flow

Nous utilisons Git Flow pour gérer le cycle de développement du projet.

### Branches principales

- `main` : Code en production, toujours stable
- `develop` : Branche d'intégration continue, destinée au développement

### Branches temporaires

- `feature/*` : Pour développer de nouvelles fonctionnalités (à partir de `develop`)
- `bugfix/*` : Pour corriger des bugs dans la branche `develop`
- `release/*` : Pour préparer une nouvelle version (de `develop` vers `main`)
- `hotfix/*` : Pour corriger rapidement des bugs critiques en production (à partir de `main`)

### Workflow

1. Pour une nouvelle fonctionnalité :
   ```bash
   git switch develop
   git pull
   git switch -c feature/nom-fonctionnalite
   # Développement...
   git push origin feature/nom-fonctionnalite
   # Créer une PR vers develop
   ```

2. Pour corriger un bug en développement :
   ```bash
   git switch develop
   git pull
   git switch -c bugfix/description-bug
   # Correction...
   git push origin bugfix/description-bug
   # Créer une PR vers develop
   ```

3. Pour corriger un bug en production :
   ```bash
   git switch main
   git pull
   git switch -c hotfix/description-bug
   # Correction...
   git push origin hotfix/description-bug
   # Créer des PRs vers main ET develop
   ```

## 💬 Conventions de commits

Nous suivons la spécification [Conventional Commits](https://www.conventionalcommits.org/) pour structurer les messages de commit.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types de commit

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Modification de la documentation
- `style` : Changements de formatage (espaces, indentation, etc.)
- `refactor` : Refactorisation du code sans changement de fonctionnalité
- `perf` : Amélioration des performances
- `test` : Ajout ou modification de tests
- `build` : Modifications du système de build ou des dépendances
- `ci` : Modifications des fichiers de configuration CI
- `chore` : Autres changements qui ne modifient pas le code source

### Exemples

```
feat(auth): ajouter l'authentification à deux facteurs

fix(api): corriger le bug #123 dans l'endpoint utilisateurs

docs: mettre à jour la documentation d'installation
```

## 👀 Pull Requests et revues de code

### Création de PR

- Utiliser un titre clair suivant le format Conventional Commits
- Inclure une description détaillée des changements
- Référencer les issues associées avec des mots-clés comme "Fixes #123"
- Ajouter des labels appropriés
- Assigner un reviewer

### Revue de code

- Vérifier que le code respecte les conventions du projet
- S'assurer que les tests sont présents et passent
- Vérifier la qualité globale du code et suggérer des améliorations
- Les PR doivent être approuvées par au moins un reviewer avant d'être fusionnées

## 📝 Documentation

- Chaque composant majeur doit être documenté
- Inclure des commentaires pour le code complexe
- Pour les fonctions/méthodes, documenter :
  - Description du rôle
  - Paramètres d'entrée
  - Valeur de retour
  - Exceptions ou erreurs possibles
  - Exemples d'utilisation si nécessaire
- Maintenir à jour les documents techniques (README, guides)

## 🎨 Style de code

En attendant le choix définitif de la stack, nous adopterons ces principes généraux :

- Indentation de 2 espaces
- Limite de 100 caractères par ligne
- Utilisation de points-virgules à la fin des instructions
- Utilisation de guillemets simples pour les chaînes de caractères
- Pas d'espaces en fin de ligne
- Une ligne vide à la fin des fichiers

Une configuration plus précise via ESLint/Prettier sera définie une fois la stack choisie.

## 🧪 Tests

- Viser une couverture de code d'au moins 80%
- Chaque fonctionnalité doit être accompagnée de tests unitaires
- Les composants critiques doivent avoir des tests d'intégration
- Les workflows utilisateur principaux doivent avoir des tests end-to-end

## 📦 Gestion des dépendances

- Toutes les dépendances doivent avoir une version fixe
- Documenter pourquoi une dépendance est ajoutée
- Vérifier régulièrement les mises à jour de sécurité
- Éviter d'ajouter des dépendances pour des fonctionnalités mineures

## 🔄 CI/CD

- Chaque PR doit passer toutes les vérifications CI avant d'être fusionnée
- Les vérifications incluent :
  - Lint
  - Tests unitaires
  - Tests d'intégration
  - Build
  - Analyse de sécurité

---

Ces conventions seront revues et ajustées au besoin à mesure que le projet évolue et que les décisions techniques sont prises. 