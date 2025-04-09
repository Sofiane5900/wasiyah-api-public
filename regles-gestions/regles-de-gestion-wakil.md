## 👥 Gestion des Wakils

**RG5** : Le nombre de Wakils par Musi doit être :
- Minimum : 2 Wakils (pour assurer la validation du décès)
- Maximum : 5 Wakils (conformément aux exigences fonctionnelles)
<!-- - Possibilité exceptionnelle d'augmenter ce nombre pour les cas justifiés (famille nombreuse, situation complexe) -->

**RG6** : Un Wakil doit confirmer sa désignation dans un délai de 24 heures, avec le code que le Musi que lui a transmis. 

**RG7** : Le score de confiance d'un Wakil est calculé selon la formule :
- Base : 50 points
- Type de relation : 
  - FAMILLE_PROCHE : +30 points
  - AMI_INTIME : +25 points
  - INSTITUTIONNEL : +25 points
  - FAMILLE_ETENDUE : +20 points
  - RELATIONNEL : +10 points
  - PROFESSIONNEL : +5 points

- Ancienneté de la relation : +1 point par année


<!-- ## 📂 Gestion Documentaire stand by pour le moment.

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

**RG18** : En cas de révocation d'un Wakil :
- Ses validations antérieures sont conservées dans l'historique
- Son score de confiance est réinitialisé
- Un délai de 60 jours est imposé avant sa possible re-désignation

**RG22** : La révocation d'accès est immédiate et prioritaire sur toute autre opération en cours.

**RG23** : Les limites système par compte sont :
- 5 Wakils maximum (conformément au PRD)
- 100 documents par coffre-fort ( certainement évoluer a 500 documents taille 5 à 10 Mo).
- 50 messages posthumes
- 1000 actifs enregistrés
- 100 bénéficiaires maximum

**RG24** : Le système de réputation d'un Wakil est impacté par :
- Nombre de validations réussies : +1 point
- Fausses déclarations de décès : -50 points et révocation immédiate
- Contestations injustifiées : -20 points
- Tentatives d'accès non autorisés : -30 points -->
