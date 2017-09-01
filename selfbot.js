const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.on("ready", () => {
    console.log("Bot loaded.\n");
});

client.on("message", message => {
    // stops running if message isn't from user or doesn't have prefix
    if (message.author !== client.user || !message.startsWith(config.prefix)){
        return;
    }

    const args = message.content.split(" ").slice(1);

    if (message.content.startsWith(config.prefix + "prune")) {
        message.channel.fetchMessages({limit: 100})
        .then(messages => {
            let messageArray = messages.array();
            messageArray = messageArray.filter(m => m.author.id === client.user.id);
            messageArray.length = message.count + 1; // test this line
            messageArray.map(m => m.delete().catch(console.error));
        });
    }

    

});

client.login(config.token);
