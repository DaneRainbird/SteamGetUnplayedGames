/*
    File: getSteamUserDetails.js
    Author: Dane Rainbird (hello@danerainbird.me)
    Purpose: Contains a function that gets the username and URL of a Steam account from it's UUID
    Last Edited: 2022-12-29
*/

const axios = require('axios');

/** 
 * Helper function to get a JSON object containing account details from a Steam UUID
 * 
 * @param {string} uuid - The Steam UUID to get details for
*/
module.exports = getSteamAccountDetails = async (uuid) => {
    return axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${uuid}&format=json&include_appinfo=1`)
        .then((response) => {
            return response.data.response.players[0];
        })
        .catch((error) => {
            throw error.response.data;
        });
}