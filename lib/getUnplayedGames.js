/*
    File: getUnplayedGames.js
    Author: Dane Rainbird (hello@danerainbird.me)
    Purpose: Contains a function that gets the unplayed games from a Steam UUID
    Last Edited: 2022-10-29
*/

const axios = require('axios');

module.exports = getSteamUnplayedGames = async (uuid) => {
    return axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${uuid}&format=json&include_appinfo=1`)
        .then((response) => {
            let games = response.data.response.games;
            games = games.filter((game) => {
                return game.playtime_forever === 0;
            });
            return games;
        })
        .catch((error) => {
            throw error.response.data;
        });
}
