## 🔐 Authentification et Sécurité

- **RG1** : Un Musi ne peut avoir qu'un seul compte actif à la fois avec la même adresse email.
- **RG2** : Si une adresse mail est déjà existante, on peut réinitialiser le mot de passe.
- **RG3** : Lors de l'inscription, une vérification est envoyée par mail.
- **RG4** : L'utilisateur se connecte uniquement avec son email et son mot de passe.
- **RG5** : Le mot de passe doit respecter les critères de complexité suivants :
  - Minimum 8 caractères
  - Au moins 1 majuscule
  - Au moins 1 chiffre
  - Au moins 1 caractère spécial
- **RG6** : Le mot de passe doit être haché avec un algorithme moderne et sécurisé.
- **RG7** : Une authentification depuis un nouvel appareil nécessite UNE des validations suivantes au choix :
  - Validation par email
  - Validation par 2FA si activée
  - (Validation avec Wakils ?)
- **RG8** : L'authentification à deux facteurs (2FA) est fortement recommandée mais reste optionnelle.
- **RG9** : Les méthodes 2FA autorisées sont sécurisées : TOTP (application) et email.
- **RG10** : Une indication visuelle montre si le compte est protégé par 2FA ou non.
- **RG11** : Limitation des tentatives de connexion :
  - 15 secondes d'attente entre chaque tentative
  - 15 minutes après 3 tentatives échouées
  - Délai exponentiel après chaque tentative échouée supplémentaire
- **RG12** : La durée d'une session est limitée à 15 minutes d'inactivité.
- **RG13** : Une notification est envoyée en cas de connexion depuis une localisation inconnue.
- **RG14** : Le Musi peut consulter l’historique des adresses IP utilisées pour se connecter.
- **RG15** : Le Musi peut se déconnecter de tous les appareils, ou choisir une session unique.
- **RG16** : L'application fournit un historique des connexions visible par le Musi.
- **RG17** : Une phrase mnémonique BIP39 est obligatoire comme seule méthode de sauvegarde cryptographique.
- **RG18** : Avertissement clair : la perte de la phrase mnémonique entraîne la perte définitive des données.
- **RG19** : L'application fournit une documentation sur la conservation sécurisée de la phrase mnémonique.
- **RG20** : La phrase mnémonique doit :
  - Être validée une seule fois lors de sa création
  - Être accompagnée d’une confirmation explicite de sauvegarde (case à cocher)
  - Être présentée avec des avertissements clairs sur son importance et son caractère irrécupérable

## 🤝 Vérification du Wakil

- **RG21** : Vérification bidirectionnelle de la relation de confiance entre le Musi et le Wakil :
  - Génération d’un code alphanumérique de 6 caractères
  - Caractères non-ambigus (lettres majuscules + chiffres)
  - Code utilisé uniquement pour la validation initiale
  - Preuve d’un contact réel entre le Musi et le Wakil (téléphonique ou physique)
  - Relation de confiance permanente jusqu’à révocation
  - Interface de saisie résistante aux erreurs (auto-majuscules, espacement)

## 🔒 Sécurité des Données

- **RG22** : Le déchiffrement des données nécessite :
  - Pour le Musi : sa clé privée active
  - Pour les Wakils post-décès :
    - Confirmation du décès (selon RG des règles post-mortem)
    - Expiration d’un délai de sécurité
    - Niveau d'accès approprié
- **RG23** : La révocation d’accès est immédiate et prioritaire sur toute opération en cours.

## 🛡️ Intégrité des Données

- **RG24** : Toute modification d'information sensible doit être :
  - Horodatée avec précision
  - Signée cryptographiquement par le Musi
  - Journalisée dans un registre d’audit chiffré
  - Traçable dans l’historique des versions
- **RG25** : Sauvegarde des données critiques :
  - Export chiffré complet disponible sur demande du Musi
  - Vérification d’intégrité par hachage après chaque sauvegarde
  - Conservation d’au moins 3 versions antérieures (règle 3-2-1)

## 🔏 Confidentialité et Protection des Données

- **RG26** : Le traitement des données personnelles respecte les principes suivants :
  - Minimisation des données collectées
  - Aucun partage avec des tiers sans consentement explicite
  - Séparation entre données personnelles identifiables et données anonymisées
  - Droit à l’effacement immédiat à la demande du Musi (sauf contrainte légale)
- **RG27** : La journalisation système :
  - Ne conserve jamais de données déchiffrées
  - N’infère jamais le contenu chiffré
  - Enregistre uniquement les métadonnées nécessaires à la sécurité
  - Est automatiquement purgée après 90 jours