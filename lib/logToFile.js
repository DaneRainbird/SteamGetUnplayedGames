/*
    File: logToFile.js
    Author: Dane Rainbird (hello@danerainbird.me)
    Purpose: Provides a simple log-to-file function for use across the application.
    Last Edited: 2022-10-29
*/

let fs = require('fs');

/** 
 * Helper function to log messages to log.txt
 * 
 * @param {string} ip - The IP address of the client
 * @param {string} status - The status of the request
 * @param {string} message - The message to log
*/
module.exports = log = (ip, status, message) => {
    // Write log to file in format of: Date - IP - Action - Message
    fs.appendFile('log.txt', `${new Date().toISOString()} - ${ip} - ${status}:\n${message}\n\n`, (err) => {
        if (err) throw err;
    });
}