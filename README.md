# Amazon Gameon API Wrapper

## Introduction

This backend will server as a wrapper for Amazon Gameon API and facilitates the front end to submit requests to the API.

## Requirements

1. Amazon Developer Account
2. Node.js 8.x
3. Mongo Lab Account or Local Mongo DB
4. Postman for Verification

## Setup

1. Follow the document `docs/Amazon Game Creation.docx` to set up your own game in Amazon.

2. Install NPM dependencies

```
npm i
```

3. Set up the environment variables

```
export GAME_ID="<Game ID>"
export PUBLIC_API_KEY="<Public API Key>"
export ADMIN_API_KEY="<Admin API Key>"
export GAME_PUBLIC_KEY="<Game Public Key>"
```

4. Modify the other configuration variables if necessary in `config/default.js`

5. Run the application

```
npm run start
```

#### Linting JS files

```
npm run lint
```

#### Running in Development mode

```
npm run dev
```

## Postman verification

1. Open Postman

2. Import Postman environment and Collection from `docs` directory

3. Postman API requests are categorized into two parts 
   - Admin APIs
   - Player APIs

4. Admin API is used to create prize types in Amazon GameOn since there is no GUI option to do the same.

5. Once the Prize types are created, competitions could be created by following the instructions in `docs/Amazon Game Creation.docx`

6. Ensure that atleast one competition is active for the User to play and submit score

7. To test the Player APIs we need to follow the given sequence since few environment variables are set based on Postman tests.

Step 1: Login with Player credentials (Player APIs -> Player Login)

Step 2: Get live tournaments (Player APIs -> Get Live Tournaments)

Step 3: Enter the tournament (Player APIs -> Enter Tournament)

Step 4: Submit Score (Player APIs -> Submit SCore)

Step 5: Get Leaderboard (Player APIs -> Get Leaderboard)

