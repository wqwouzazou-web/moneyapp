# MoneyApp - CoffreFort

Application full-stack (React + Tailwind front, Node/Express + MongoDB back) pour gérer une caisse, commandes et historique.

## Lancer en local

1. Cloner
2. Créer deux dossiers `frontend` et `backend` avec les fichiers ci-dessus
3. Backend: `cd backend` -> `npm install` -> ajouter `.env` basé sur `.env.example` -> `npm start`
4. Frontend: `cd frontend` -> `npm install` -> `npm run dev` (Vite)

## Déploiement
- Backend: Render / Railway / Heroku — pointez `MONGODB_URI` et `PORT`
- Frontend: Vercel — définir `VITE_API_URL` (ou `REACT_APP_API_URL`) vers l'URL backend
