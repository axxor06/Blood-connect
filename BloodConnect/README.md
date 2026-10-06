# Blood-Connect

Built on the Resume Builder structure (React + Vite, MUI + Bootstrap CDN, axios instance, json-server).

## Run
```
cd server && npm install && npm start        # json-server on :3000
cd blood-donation && npm install && npm run dev
```

## API layer (same chain as Resume Builder)
`Components/Pages` -> `services/allAPI.js` -> `api/apiServices.js` -> `api/axiosInstance.js`
