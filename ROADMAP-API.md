# Roadmap Wasiyah Api 

## Structure du projet 

```
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
```

## État d'Avancement Global

| 🟢 Terminé | ⚪️ Non commencé | 🟡 En cours | 🔵 Prêt à démarrer |
| :--------- | :-------------- | :---------- | :----------------- |


## Version 0.x.x (Développement MVP)


## 🟢 Sécurité des Données – Techniques à implémenter

- [ ] Implémenter les rôles : `MUSI`, `WAKIL`,
- [ ] Contrôle d’accès via Guards / Interceptors selon rôle
- [ ] Déchiffrement conditionné post-mortem :
  - [ ] Vérification décès validé + délai écoulé + Wakil autorisé
- [ ] Révocation immédiate d’un Wakil :
  - [ ] Endpoint `DELETE /wakil/{id}`
  - [ ] Invalidation de son accès à toutes les données


## 🟡 Authentification – Approfondissement

- [ ] Vérification de connexion depuis un nouvel appareil :
  - [ ] Email ou validation 2FA obligatoire
- [ ] Implémenter le système 2FA :
  - [ ] Choix : TOTP via app ou code envoyé par email
  - [ ] Activer / désactiver depuis les paramètres utilisateur
  - [ ] Afficher dans l’API un flag "2FA activé"
- [ ] Limiter les tentatives de connexion :
  - [ ] 15 sec entre tentatives
  - [ ] Blocage temporaire après 3 essais (15 min)
  - [ ] Délai croissant ensuite
- [ ] Gérer les sessions :
  - [ ] Timeout après 15 minutes d'inactivité
  - [ ] Endpoint `POST /logout/all` pour déconnexion globale
  - [ ] Historique des connexions : IP + timestamp
- [ ] Phrase BIP39 :
  - [ ] Génération à la création du compte
  - [ ] Stockage sécurisé (jamais accessible en clair)
  - [ ] Validation unique avec confirmation explicite (checkbox)
  - [ ] Ajouter avertissements sur l’irréversibilité


## ⚪️ Messages posthumes – Gestion technique

- [ ] Implémenter le CRUD complet des messages posthumes
- [ ] Ajout du champ texte (limite de 50 000 caractères)
- [ ] Support des pièces jointes :
  - [ ] Limite : 10 fichiers par message
  - [ ] Taille max : 250 Mo par pièce jointe
  - [ ] Formats acceptés : texte, images, audio, vidéo, PDF, DOC
- [ ] Vérifier la taille cumulée des messages pour chaque utilisateur
- [ ] Limiter à 50 messages par compte
- [ ] Prévoir un retour d'erreur explicite si la limite est atteinte


## ⚪️ Validation du Décès – Gestion technique (version mise à jour)

- [ ] Implémenter l’endpoint `POST /declaration-deces` :
  - [ ] Accessible uniquement par un Wakil désigné du Musi
  - [ ] Création d’un enregistrement de demande de décès en attente
  - [ ] Envoi automatique d’une notification email à tous les Wakils

- [ ] Mettre en place une validation par **majorité de Wakils** :
  - [ ] Exemple : 4 Wakils → 3 confirmations nécessaires
  - [ ] Comptabiliser les confirmations reçues
  - [ ] Valider automatiquement dès qu’une majorité est atteinte
  - [ ] Notifier le Musi qu’une déclaration de décès est en cours

- [ ] Implémenter le délai de sécurité de 30 jours :
  - [ ] Enregistrer la date de la 1ʳᵉ déclaration
  - [ ] Planifier un traitement automatique à J+30
  - [ ] Empêcher tout déverrouillage des volontés avant la date seuil

- [ ] Vérifier l’absence de contestation :
  - [ ] Endpoint `POST /declaration-deces/contest` accessible à tout Wakil
  - [ ] Si une contestation est reçue → bloquer temporairement le processus
  - [ ] Envoyer une notification d’alerte à tous les Wakils et au Musi

- [ ] Vérifier l’absence d’activité du Musi pendant les 30 jours :
  - [ ] Suivre la dernière date de connexion
  - [ ] Vérification automatique au moment du traitement à J+30

- [ ] Déclencher le déverrouillage des volontés :
  - [ ] Si majorité de Wakils confirmée + pas de contestation + 30 jours écoulés + inactivité du Musi
  - [ ] Changer le statut en `DECEASE_CONFIRMED`
  - [ ] Notifier les bénéficiaires et les Wakils autorisés
  - [ ] Donner accès restreint aux données chiffrées aux Wakils

- [ ] Historiser l’événement :
  - [ ] Sauvegarder la date de validation du décès
  - [ ] Ajouter un log d’audit retraçant chaque changement de statut

- [ ] Vérification de vie trimestrielle automatisée :
  - [ ] Déclencher une vérification tous les 90 jours
  - [ ] Envoi d’un email au Musi et à tous ses Wakils
  - [ ] Mettre à jour un champ `last_verification_response_at` en cas de réponse

- [ ] Implémenter le blocage automatique du compte :
  - [ ] Si aucune réponse du Musi + Wakils pendant 3 vérifications consécutives
  - [ ] Basculer le compte en statut `BLOCKED_INACTIVE`
  - [ ] Informer les Wakils concernés

- [ ] Implémenter un endpoint de recréation de compte :
  - [ ] Disponible si la phrase BIP39 est perdue
  - [ ] Création d’un **nouveau compte vide**
  - [ ] Avertir que l’historique est définitivement perdu

##  ⚪️ Notifications – Gestion technique (version mise à jour)

- [ ] Implémenter un **service centralisé** de gestion des notifications
- [ ] Gérer l’envoi des **emails critiques** :
  - [ ] Déclaration de décès
  - [ ] Révocation ou ajout de Wakil
  - [ ] Blocage ou réactivation du compte
- [ ] Ajouter un système de **retry automatique** en cas d’échec (jusqu’à 3 tentatives)
- [ ] Prévoir une structure extensible pour les **notifications push** (backend prêt, en attente du mobile)
- [ ] Ajouter des logs internes dans le service pour chaque envoi :
  - [ ] Type de notification (email / push)
  - [ ] Statut de l’envoi (succès ou échec)
  - [ ] Date et destinataire

##  ⚪️ Confidentialité & RGPD – Implémentation

- [ ] Implémenter un endpoint `DELETE /me` pour permettre à un utilisateur de **supprimer définitivement son compte**
- [ ] Implémenter un endpoint `GET /me/export` pour permettre à l’utilisateur de **télécharger ses données**
- [ ] Implémenter un endpoint `PATCH /me` pour **éditer les données personnelles**
- [ ] Séparer clairement dans la structure :
  - [ ] Les données personnelles identifiables
  - [ ] Les données anonymisées ou non sensibles
- [ ] Ajouter un champ "consentement explicite" au moment de l’inscription (avec case à cocher)
- [ ] Implémenter un mécanisme de **purge automatique des logs système** après x  jours (cron backend)