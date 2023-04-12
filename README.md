# Dev Salary Simulator
## Introduction
**Dev Salary Simulator** est une application permettant de simuler son salaire dans les domaine de l'informatique et du digital selon ses compétences, son niveau d'expérience, sa région, etc...
L'application est destinée a toute personnes souhaitant connaitre sa valeur selon son profil ou bien connaitre la valeur d'une équipe technique.
## Stack technique
- Front-end : NuxtJS
- Back-end : Symphony & Express
- Architecture : Micro-services
- Base de données : MongoDB
## Commandes
### Commande pour lancer le projet en mode `prod` :
**Utilisation de Docker** :
- Création des variables d'environnement :
	- Service data :
		- Se placer dans le dossier data : `cd data`
		- ```
			MONGO=yourMongoDB
			SECRET=yourSecretKey
			```
- Revenir à la racine du projet
- Lancement du projet : `docker compose up`
- Arrêt du projet : `docker compose down`
### Commande pour lancer les applications séparément en mode `dev` :
**Front-end** :
- Se placer à la racine du projet : `cd spa/salary-simulator`
- *(Optionnel)* : Créer un fichier `.env` pour override les variables d'environnement de l'application : 
	- ```
		NUXT_API_SECRET=yourSecret
		NUXT_PUBLIC_API_BASE=adressOfYourServiceData
		NUXT_PUBLIC_AUTH_BASE=adressOfYourServiceAuth
		```
- Lancer le projet en mode dev `npm run dev`

**Back-end - Service data**:
- Se placer à la racine de l'application : `cd data`
- Créer un fichier `.env` :
	- ```
		MONGO=yourMongoDB
		SECRET=yourSecretKey
		```
- Lancer l'application : `node index.js`

**Back-end - Service auth**:
- Se placer à la racine de l'application : `cd auth/projet`
- Créer un fichier `.env.local` :
	- ```
		MONGODB_URL=yourMongoDBURL
		MONGODB_DB=yourMongoDB
		MAIL_SENDER=yourEmailAdress
		MAILER_DSN=yourEmailSMTP
		```
