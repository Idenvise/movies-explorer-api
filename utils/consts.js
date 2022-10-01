const mongoDev = 'mongodb://localhost:27017/moviesdb';
const regExpLink = /https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/i;

module.exports = { mongoDev, regExpLink };
