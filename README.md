# Get Unplayed Steam Games
A Simple Node.js tool to get your unplayed Steam Games in JSON format.

## Setup / Running
- First, obtain a [Steam API Key](https://steamcommunity.com/dev/)
- Run `npm install` to download the required dependencies.
- Create a file named `.env` and create a key called `PORT`, which the app will run at (defaults to 8080), as well as a key called `STEAM_API_KEY`, containing the API key you obtained earlier.
- Run `node .\app.js` and navigate to `localhost:8080`, or whichever port you chose.

## Usage
Once up and running, visit the endpoint `/steam/getUnplayedGames/uuid`, where `uuid` is a user's steamID64 (which can be obtained from tools like [SteamID](https://steamid.io/)).

You can check it out live [here!](https://getunplayedsteamgames.onrender.com/steam/getUnplayedGames/)
