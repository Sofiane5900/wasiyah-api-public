# 📋 Règles de Gestion - Wasiyah

## 🔐 Authentification et Sécurité

**RG1** : Un Musi ne peut avoir qu'un seul compte actif à la fois avec la même adresse email.

**RG2** : La phrase mnémonique doit être :
- Validée une seule fois lors de sa création
- Accompagnée d'une confirmation explicite de sauvegarde (case à cocher)
- Présentée avec des avertissements clairs sur son importance et son caractère irrécupérable

**RG3** : Après 3 tentatives de connexion échouées, le compte est bloqué pendant 15 minutes.

**RG4** : Une connexion depuis un nouvel appareil nécessite UNE des validations suivantes au choix :
- Validation par email
- Validation par 2FA si activé

## 👥 Gestion des Wakils

**RG5** : Le nombre de Wakils par Musi doit être :
- Minimum : 2 Wakils (pour assurer la validation du décès)
- Maximum : 10 Wakils (limite technique pour maintenir la performance du système)
- Recommandé : 3 à 5 Wakils (pour un équilibre optimal entre sécurité et gestion)

**RG6** : Un Wakil doit confirmer sa désignation dans un délai de 7 jours, après quoi l'invitation expire.

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
  - Propriété intellectuelle numérique
  - Informations d'accès aux comptes importants (même non transmissibles officiellement)

**RG16** : Les messages posthumes sont configurables avec les contraintes techniques suivantes :
- Texte : jusqu'à 100 000 caractères par message (équivalent à environ 50-60 pages)
- Pièces jointes : jusqu'à 20 fichiers par message
- Taille maximale par pièce jointe : 500 Mo
- Types de médias supportés : texte, images, audio, vidéo, documents
- Possibilité de créer plusieurs messages distincts pour différents destinataires

## 🔄 Processus de Récupération

**RG17** : La récupération de compte nécessite :
- Un score de confiance cumulé des Wakils validants > 75%
- Au moins 3 Wakils différents
- Un délai d'attente de 7 jours
- Aucune opposition d'un autre Wakil

**RG18** : En cas de révocation d'un Wakil :
- Ses validations antérieures sont conservées dans l'historique
- Son score de confiance est réinitialisé
- Un délai de 90 jours est imposé avant sa possible re-désignation

## 📱 Notifications

**RG19** : Les notifications critiques (déclaration de décès, révocation de Wakil) sont envoyées :
- Par email (obligatoire)
- Par notification push si app installée
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

## 📊 Métriques et Limites

**RG23** : Les limites système par compte sont :
- 10 Wakils maximum (selon RG5)
- 100 documents par coffre-fort
- Nombre illimité de messages posthumes
- 1000 actifs enregistrés
- 100 bénéficiaires maximum

**RG24** : Le système de réputation d'un Wakil est impacté par :
- Nombre de validations réussies : +1 point
- Fausses déclarations de décès : -50 points et révocation immédiate
- Contestations justifiées : -20 points
- Tentatives d'accès non autorisés : -30 points
- Temps de réponse aux demandes de validation : -1 point par jour de retard

## 🧾 Documentation et conformité

**RG25** : Le système doit mentionner explicitement qu'il ne calcule pas automatiquement la répartition d'héritage :
- Avertissement clair lors de la saisie des actifs
- Rappel que la validation par un expert en droit islamique reste nécessaire
- Recommandation de consulter un imam ou un juriste spécialisé

**RG26** : Les modèles de documents générés doivent inclure :
- Une clause de non-responsabilité concernant la conformité juridique/religieuse
- Des espaces réservés pour la signature d'un témoin qualifié
- La date de génération et un identifiant unique cryptographique

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
- Test de restauration simulée lors de chaque modification majeure

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