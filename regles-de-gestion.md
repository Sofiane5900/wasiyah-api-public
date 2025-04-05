# 📋 Règles de Gestion - Wasiyah

## 🔐 Authentification et Sécurité

**RG1** : Un Musi ne peut avoir qu'un seul compte actif à la fois avec la même adresse email.
**RG** : Si une adresse mail est déjà existante, on peut réinitialiser le mot de passe.
  - Système d'inscription par email avec vérification
  - Connexion avec email et mot de passe
  - Authentification à deux facteurs (2FA) fortement recommandée mais optionnelle
  - Méthodes de 2FA sécurisées (application d'authentification TOTP, email)
  - Indication visuelle du niveau de sécurité du compte (avec/sans 2FA)
  - Protection contre les tentatives de force brute
  - Détection des connexions suspectes (nouvelle localisation, appareil)
  - Phrase mnémonique BIP39 obligatoire comme SEULE méthode de sauvegarde cryptographique
  - Avertissement clair que la perte de la phrase mnémonique entraîne la perte définitive des données
  - Documentation détaillée sur la conservation sécurisée de la phrase mnémonique
  - Durée de session limitée (15 minutes d'inactivité)
  - Possibilité de déconnexion de tous les appareils
  - Historique des connexions visible par le Musi
  - Notifications de connexion sur nouvel appareil

**RG2** : La phrase mnémonique doit être :
- Validée une seule fois lors de sa création
- Accompagnée d'une confirmation explicite de sauvegarde (case à cocher)
- Présentée avec des avertissements clairs sur son importance et son caractère irrécupérable
  - **Code de validation à usage unique pour l'établissement de la relation de confiance** :
    - Génération d'un code alphanumérique de 6 caractères lors de la désignation d'un Wakil
    - Utilisation de caractères non-ambigus (lettres majuscules et chiffres facilement distinguables)
    - Code utilisé uniquement pour la validation initiale du Wakil, établissant une relation de confiance permanente (jusqu'à révocation)
    - Preuve d'un contact réel (téléphonique ou physique) entre le Musi et son Wakil
    - Processus de vérification bidirectionnel : le Wakil reçoit une notification de demande de désignation et doit saisir le code communiqué par le Musi pour confirmer la relation
    - Une fois validée, cette relation de confiance sert de base pour toutes les futures interactions, y compris la validation d'un compte de remplacement
    - Interface de saisie résistante aux erreurs (conversion automatique en majuscules, espacement)

**RG3** : Après 3 tentatives d'authentification échouées, le compte est bloqué pendant 15 minutes.

**RG4** : Une authentification depuis un nouvel appareil nécessite UNE des validations suivantes au choix :
- Validation par email
- Validation par 2FA si activée

## 👥 Gestion des Wakils

**RG5** : Le nombre de Wakils par Musi doit être :
- Minimum : 1 Wakils (pour assurer la validation du décès)
- Maximum : 5 Wakils (conformément aux exigences fonctionnelles)
- Possibilité exceptionnelle d'augmenter ce nombre pour les cas justifiés (famille nombreuse, situation complexe)

**RG6** : Un Wakil doit confirmer sa désignation dans un délai de 2 jours, après quoi l'invitation expire.

**RG7** : Le score de confiance d'un Wakil est calculé selon la formule :
- Base : 50 points
- Type de relation : 
  - FAMILLE_PROCHE : +30 points
  - AMI_INTIME : +25 points
  - FAMILLE_ETENDUE : +20 points
  - RELATIONNEL : +10 points
  - PROFESSIONNEL : +5 points
  - INSTITUTIONNEL : +25 points
- Ancienneté de la relation : +1 point par année (max 20 points)
- Validation par autres Wakils : +5 points par validation

**RG8** : Pour les Wakils de type PROFESSIONNEL ou INSTITUTIONNEL :
- Obligation d'afficher publiquement leur statut de Wakil multiple
- Transparence sur le nombre total de Musis qu'ils accompagnent
- Déclaration de tout conflit d'intérêt potentiel
- Possibilité pour les Musis de voir les statistiques de fiabilité du Wakil

## ⚰️ Validation du Décès

**RG9** : La déclaration de décès nécessite :
- Au moins 2 Wakils différents pour confirmation
- Un délai de sécurité de 30 jours
- Dans un premier temps les dernieres volontés dans un second temps le testament
- Aucune contestation active d'un autre Wakil
- Aucune connexion du Musi pendant le délai

**RG10** : Une contestation de décès doit être déposée dans les 15 jours suivant la déclaration initiale.

**RG11** : La non-réponse à 3 vérifications trimestrielles consécutives de vie déclenche :
1. Notification à tous les Wakils
2. Demande de confirmation de vie au Musi sur tous ses canaux
3. Si aucune réponse dans les 30 jours, possibilité de déclarer le décès

## 💰 Gestion des Actifs

**RG12** : La somme des pourcentages attribués aux bénéficiaires non-héritiers légaux ne peut pas dépasser 33% du capital total.

**RG13** : Les dettes doivent être validées tous les 12 mois, avec un rappel automatique 30 jours avant expiration.

**RG14** : Tout prêt enregistré doit être de type "qard hasan" (sans intérêt), avec :
- Montant principal fixe
- Échéancier de remboursement
- Pas de pénalités de retard monétaires

## 📂 Gestion Documentaire

**RG15** : Les documents du coffre-fort sont classés automatiquement selon leur type :
- Documents d'identité → Coffre légal
- Certificats religieux → Coffre islamique
- Documents personnels → Coffre personnel
- Actifs numériques → Coffre numérique :
  - Cryptomonnaies (clés privées, seeds)
  - NFTs et tokens
  - Domaines web et hébergements
  - Comptes de jeux avec valeur réelle (Star Citizen, Eve Online, etc.)
  - Collections numériques valorisables (cartes, objets rares in-game)
  - Propriété intellectuelle numérique
  - Informations d'accès aux comptes importants (même non transmissibles officiellement)

**RG16** : Les messages posthumes sont configurables avec les contraintes techniques suivantes :
- Texte : jusqu'à 50 000 caractères par message (équivalent à environ 25-30 pages)
- Pièces jointes : jusqu'à 10 fichiers par message
- Taille maximale par pièce jointe : 250 Mo
- Types de médias supportés : texte, images, audio, vidéo, documents
- Limite de 50 messages posthumes par compte pour garantir une performance optimale

## 🔄 Processus de Récupération

**RG17** : La récupération de compte nécessite :
- Un score de confiance cumulé des Wakils validants > 75%
- Au moins 1 Wakil
- Un délai d'attente de 7 jours
- Aucune opposition d'un autre Wakil

**RG18** : En cas de révocation d'un Wakil :
- Ses validations antérieures sont conservées dans l'historique
- Son score de confiance est réinitialisé
- Possibilité de le re-ajouter avec une notification en ammont (warning)

## 📱 Notifications

**RG19** : Les notifications critiques (déclaration de décès, révocation de Wakil) sont envoyées :
- Par email (obligatoire)
- Par notification push si app installée (FUTURE)
Avec 3 tentatives en cas d'échec.

**RG20** : Les rappels de mise à jour suivent la séquence :
- J-30 : Premier rappel
- J-15 : Second rappel
- J-5 : Rappel urgent
- J+1 : Notification de dépassement


## 🔒 Sécurité des Données

**RG21** : Le déchiffrement des données nécessite :
- Pour le Musi : Sa clé privée active
- Pour les Wakils post-décès : 
  - Confirmation du décès selon RG9
  - Expiration du délai de sécurité
  - Niveau d'accès approprié pour le type de données

**RG22** : La révocation d'accès est immédiate et prioritaire sur toute autre opération en cours.

<!-- ## 📊 Métriques et Limites

**RG23** : Les limites système par compte sont :
- 5 Wakils maximum (conformément au PRD)
- 100 documents par coffre-fort
- 50 messages posthumes
- 1000 actifs enregistrés
- 100 bénéficiaires maximum

**RG24** : Le système de réputation d'un Wakil est impacté par :
- Nombre de validations réussies : +1 point
- Fausses déclarations de décès : -50 points et révocation immédiate
- Contestations justifiées : -20 points
- Tentatives d'accès non autorisés : -30 points
- Temps de réponse aux demandes de validation : -1 point par jour de retard -->

## 🧾 Documentation et conformité

**RG25** : Le système doit mentionner explicitement qu'il ne calcule pas automatiquement la répartition d'héritage :
- Avertissement clair lors de la saisie des actifs
- Rappel que la validation par un expert en droit islamique reste nécessaire
- Recommandation de consulter un imam ou un juriste spécialisé

<!-- **RG26** : Les modèles de documents générés doivent inclure :
- Une clause de non-responsabilité concernant la conformité juridique/religieuse
- Des espaces réservés pour la signature d'un témoin qualifié
- La date de génération et un identifiant unique cryptographique -->

## 🛡️ Intégrité des données

**RG27** : Chaque modification d'information sensible doit être :
- Horodatée avec précision
- Signée cryptographiquement par le Musi
- Journalisée dans un registre d'audit chiffré
- Traçable dans l'historique des versions

**RG28** : Les sauvegardes des données critiques suivent le protocole :
- Export chiffré complet disponible sur demande du Musi
- Vérification d'intégrité par hachage après chaque sauvegarde
- Conservation de 3 versions antérieures minimum

## 🗄️ Archives et conservation

**RG29** : La rétention des données après décès confirmé est régie par :
- Conservation minimale de 5 ans pour toutes les données
- Option d'archivage prolongé jusqu'à 50 ans pour documents légaux importants
- Processus d'effacement définitif sur demande des héritiers légaux (avec validation multiple)
- Exportation possible en formats standards non-propriétaires

## 🔍 Validation et certification

**RG30** : L'inscription de ressources islamiques référencées requiert :
- Source clairement identifiée (école juridique, ouvrage de référence)
- Validation par au moins un expert religieux certifié
- Datation et contextualisation des avis religieux cités
- Mention des divergences majeures entre écoles juridiques quand elles existent

## 🔏 Confidentialité et protection des données

**RG31** : Le traitement des données personnelles doit respecter les principes suivants :
- Minimisation des données : seules les informations strictement nécessaires sont collectées
- Aucun partage de données avec des tiers sans consentement explicite du Musi
- Séparation claire entre données personnelles identifiables et données anonymisées
- Droit à l'effacement complet et immédiat à la demande du Musi (sauf contrainte légale)

**RG32** : La journalisation système doit être conçue pour :
- Ne jamais conserver de données déchiffrées
- Exclure toute information permettant d'inférer le contenu chiffré
- Enregistrer uniquement les métadonnées nécessaires à la sécurité
- Être automatiquement purgée après 90 jours


<!-- ## 👥 Gouvernance communautaire

**RG35** : Les contributions au code source sont soumises aux règles :
- Validation obligatoire par au moins 2 mainteneurs principaux
- Conformité au guide de style de code
- Tests automatisés couvrant 85% minimum du code ajouté
- Documentation claire des modifications

**RG36** : Les décisions d'évolution majeure requièrent :
- Publication préalable d'une proposition documentée (RFC)
- Période de commentaires communautaires d'au moins 14 jours
- Vote formel des mainteneurs
- Prise en compte des impacts religieux et éthiques -->

## 🌐 Internationalisation et accessibilité

**RG37** : Le système de traduction collaborative doit garantir :
- Validation minimale par 3 locuteurs natifs avant publication d'une traduction
- Conservation de l'historique complet des modifications par langue
- Traductions prioritaires des termes religieux et juridiques spécifiques
- Vérification par un expert religieux des contenus sensibles dans chaque langue

## 🏥 Directives médicales

**RG38** : Les directives relatives au don d'organes doivent être :
- Explicitement datées et signées électroniquement
- Conformes à la législation française en vigueur (consentement présumé sauf opposition)
- Consultables immédiatement en cas d'urgence par les Wakils désignés
- Mises à jour au minimum tous les 3 ans avec rappel automatique

## 🔄 Vérifications de vie

**RG39** : Le système de vérification périodique de vie doit fonctionner comme suit :
- Demande de confirmation trimestrielle envoyée au Musi
- Méthodes acceptables de confirmation : connexion à l'application, clic sur lien sécurisé, validation 2FA
- Escalade aux Wakils après 3 rappels espacés de 7 jours sans réponse
- Options de désactivation temporaire pour absences planifiées (max 12 mois)


<!-- ## ⚠️ Situations exceptionnelles

**RG42** : En cas de situation critique, le système doit :
- Basculer automatiquement sur une infrastructure de secours dans un délai < 1 heure
- Notifier les administrateurs système et les mainteneurs principaux
- Mettre en place un mode maintenance avec accès minimal aux données non-sensibles
- Journaliser toutes les actions d'urgence dans un registre spécial
- Effectuer une vérification d'intégrité complète avant le retour à l'état normal

**RG43** : En cas de décès simultané du Musi et d'un ou plusieurs Wakils :
- Validation par les Wakils restants avec quorum réduit si nécessaire
- Procédure juridique documentée pour les cas extrêmes (décès de tous les acteurs)
- Mécanisme de secours permettant la désignation d'une autorité religieuse comme arbitre -->

## 📊 Métriques et KPI

**RG46** : Les métriques système autorisées sont limitées à :
- Données techniques de performance non-identifiantes
- Statistiques agrégées sur l'utilisation des fonctionnalités (sans contenu)
- Métriques de santé et disponibilité du système
- Rapports d'erreurs anonymisés (sans données utilisateur)

**RG47** : Le suivi des métriques de succès doit respecter :
- Fréquence de calcul mensuelle pour les indicateurs clés
- Tableau de bord accessible uniquement aux mainteneurs principaux
- Conservation des tendances historiques sur 24 mois glissants
- Révision trimestrielle des objectifs de performance

## 👁️ Utilisabilité et accessibilité

**RG48** : L'interface utilisateur doit respecter les principes suivants :
- Compatibilité WCAG 2.1 niveau AA minimum
- Support des technologies d'assistance (lecteurs d'écran)
- Interface responsive avec breakpoints adaptés à tous les appareils
- Temps de chargement < 3 secondes pour les pages principales
- Tests utilisateurs obligatoires avant toute refonte majeure


## ⚖️ Aspects juridiques et conformité légale

**RG51** : La conformité au RGPD et autres réglementations sur la protection des données implique :
- Politique de confidentialité explicite et accessible en un clic
- Mécanisme de portabilité des données dans un format standard
- Journalisation de tous les consentements avec horodatage
- Inventaire documenté de toutes les données personnelles traitées
- Analyse d'impact sur la protection des données (AIPD) mise à jour annuellement

**RG52** : La validité juridique des documents générés est renforcée par :
- Certification du moment de création par horodatage qualifié
- Journalisation cryptographique des modifications
- Avertissements clairs sur la nécessité d'une validation par un expert juridique local
- Format de document conforme aux standards légaux dans la mesure du possible
- Documentation des limites de validité légale selon les juridictions
