const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.on("ready", () => {
    console.log("Bot loaded.\n");
});

client.login(config.token);
