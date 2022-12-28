/*
    File: app.js
    Author: Dane Rainbird (hello@danerainbird.me)
    Purpose: Contains the main code for the webapp to run
    Last Edited: 2022-12-29
*/

// Imports
const dotenv = require('dotenv');
const express = require('express');
const cors = require("cors");
const getUnplayedGames = require('./lib/getUnplayedGames');
const getSteamAccountDetails = require('./lib/getSteamUserDetails');
const log = require('./lib/logToFile');

// Configuration
const app = express();
app.use(cors());
dotenv.config();

// Ensure that the API key is set before continuing
if (!process.env.STEAM_API_KEY) {
    console.error("ERROR: STEAM_API_KEY is not set in .env file");
    process.exit(1);
}

// Start the server
app.listen(process.env.PORT || 8080);
console.log(`Server started on port ${process.env.PORT || 8080}`);

// Main route, used for getting unplayed games from a particular steam UUID
app.get('/steam/getUnplayedGames/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const details = await getSteamAccountDetails(uuid);
    getSteamUnplayedGames(uuid)
        .then((games) => {
            // For each game, only return the name and appid
            let gameNames = games.map((game) => {
                return {
                    name: game.name,
                    appid: game.appid
                };
            }); 

            // Send the response with some metadata attached
            let retData = {
                "meta": {
                    "status": "200",
                    "uuid": uuid,
                    "username": details.personaname,
                    "profileURL": details.profileurl
                },
                "games": gameNames
            }
            res.json(retData)
        })
        .catch((error) => {
            console.log("Encountered an error when requesting games, logged to log.txt at " + new Date().toISOString());
            log(req.ip, "500", error);
            res.status(500).json({
                'status': 500,
                'message': "Internal error, please try again later"
            });
        });
});

// Catch-all route
app.get('*', (req, res) => {
    res.status(501).json({
        'status': 501,
        'message': "Visit /steam/getUnplayedGames/:uuid to get a list of unplayed games"
    });
});