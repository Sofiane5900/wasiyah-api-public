# 📚 Lexique Wasiyah

Ce document définit les termes spécifiques utilisés dans le projet Wasiyah pour assurer une compréhension commune et cohérente entre les membres de l'équipe, les utilisateurs et les partenaires.

## Termes principaux

| Terme | Définition |
|------|------------|
| **Wasiyah** (وصية) | Testament islamique respectant les principes de la Charia. Représente jusqu'à 1/3 des biens du défunt pouvant être distribués selon sa volonté. |
| **Musi** (موصي) | Utilisateur principal qui crée un testament islamique. Propriétaire du compte et des données. |
| **Wakil** (وكيل) | Mandataire désigné par le Musi pour l'exécution de ses volontés testamentaires et/ou la récupération de son compte. |
| **Wakil principal** | Mandataire avec droits étendus, explicitement désigné comme administrateur de confiance par le Musi. |
| **Wakil standard** | Mandataire avec des droits limités à certains coffres-forts spécifiquement assignés. |
| **Wakil limité** | Mandataire avec accès en lecture seule après le décès du Musi. |
| **Bénéficiaire** | Personne désignée pour recevoir des actifs ou messages après le décès du Musi. |
| **Farâ'id** | Science des règles de succession en Islam, déterminant la distribution obligatoire des 2/3 des biens. |

## Concepts techniques

| Terme | Définition |
|------|------------|
| **Score de confiance** | Valeur numérique (0-100) calculée pour chaque Wakil en fonction de divers facteurs (ancienneté, relation, interactions) pour déterminer leur niveau de fiabilité. |
| **Seuil de validation** | Score minimal requis (généralement 75%) pour autoriser des opérations sensibles comme la récupération de compte ou la validation d'un décès. |
| **Coffre-fort** | Espace de stockage chiffré contenant un ensemble de documents regroupés par thématique (ex: financier, médical, familial). |
| **E2EE** | Chiffrement de bout en bout. Méthode où seuls l'expéditeur et le destinataire peuvent accéder aux données déchiffrées. |
| **Zero-knowledge** | Approche de sécurité où le serveur ne possède jamais les informations nécessaires pour déchiffrer les données utilisateur. |
| **Chiffrement à double clé** | Technique où une donnée est protégée par deux couches de chiffrement distinctes, nécessitant deux clés différentes pour y accéder. |
| **2FA** | Two-Factor Authentication (authentification à deux facteurs). Sécurité supplémentaire exigeant deux méthodes d'authentification distinctes. |
| **Phrase mnémonique** | Séquence de 12 à 24 mots permettant de générer et récupérer les clés cryptographiques. |
| **BIP39** | Bitcoin Improvement Proposal 39, standard pour phrases mnémoniques permettant de sauvegarder des clés cryptographiques. Dans un système E2EE, cette phrase représente la SEULE méthode de sauvegarde des clés. |
| **Sauvegarde cryptographique** | Processus de conservation sécurisée des clés de chiffrement, fondamentalement différent d'une "récupération de compte" traditionnelle. |
| **Période de contestation** | Durée de 30 jours pendant laquelle le décès déclaré peut être contesté avant confirmation définitive. |
| **Post-mortem** | État activé après la validation du décès du Musi, débloquant certains accès pour les Wakils et bénéficiaires. |

## États et transitions

| Terme | Définition |
|------|------------|
| **Activation des droits** | Processus de transfert des accès aux Wakils et bénéficiaires après validation du décès. |
| **Archivage sécurisé** | Préservation des données chiffrées inaccessibles lors d'une récupération de compte après perte de phrase mnémonique. |
| **Déclaration de décès** | Signalement initial du décès d'un Musi par ses Wakils, déclenchant la période de contestation. |
| **Validation du décès** | Confirmation définitive du décès après la période de contestation, activant les droits post-mortem. |
| **Récupération de compte** | Processus permettant à un Musi de regagner l'accès à son compte après perte de sa phrase mnémonique, nécessitant l'approbation des Wakils. |

## Relations et droits

| Terme | Définition |
|------|------------|
| **FAMILLE_PROCHE** | Catégorie de relation incluant parents, enfants et conjoint, ayant un impact significatif sur le score de confiance. |
| **FAMILLE_ÉTENDUE** | Catégorie incluant oncles, tantes, cousins et autres membres de la famille éloignée. |
| **AMI** | Relation non familiale avec lien de confiance personnel. |
| **PROFESSIONNEL** | Relation basée sur une expertise professionnelle (avocat, notaire, etc.). |
| **RELIGIEUX** | Relation avec une personne ayant une légitimité religieuse (imam, cheikh, etc.). |
| **Pouvoir décisionnel final** | Capacité du Wakil principal à trancher en cas de score de confiance limite (70-75). |

## Considérations légales et religieuses

| Terme | Définition |
|------|------------|
| **Charia** | Loi islamique régissant divers aspects de la vie, incluant les règles de succession. |
| **Qard Hasan** | Prêt sans intérêt conforme aux principes islamiques. |
| **Sadaqah** | Don charitable en islam. |
| **Open Source** | Modèle de développement logiciel où le code source est librement accessible et modifiable, permettant la transparence et l'audit par la communauté. | 