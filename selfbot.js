const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.on("ready", () => {
    console.log("Bot loaded.\n");
});

client.on("message", message => {
    // stops running if message isn't from user or doesn't have prefix
    if (message.author !== client.user || !message.content.startsWith(config.prefix)){
        return;
    }

    const command = message.content.split(/\s+/g)[0].substring(8);
    const args = message.content.split(" ").slice(1);

    if (args.length === 0) {
        console.log(`Saw ${command} command sent from user ${message.author.username} (ID: ${message.author.id})`);
    } else {
        console.log(`Saw ${command} command with arguments [${args}], sent from user ${message.author.username} (ID: ${message.author.id})`);
    }

    if (command === "img") {
        let dir = `./images/${args.join(" ")}`;
        message.delete().catch(console.error);
        message.channel.send("", {file: `${dir}`});
        //setTimeout(() => {message.channel.send("", {file: "./images/sadshowerpepe.jpg"});}, 50);
    }

    if (command === "imglist") {
        message.edit(`Atk's self-bot speaking, your available images are:\n*${fs.readdirSync("./images").join("\n")}*`);
    }

    /*if (command === "prune") {
        message.channel.fetchMessages({limit: 100})
        .then(messages => {
            let messageArray = messages.array();
            messageArray = messageArray.filter(m => m.author.id === client.user.id);
            messageArray.length = message.count + 1; // test this line
            messageArray.map(m => m.delete().catch(console.error));
        });
    }*/

    /*if (command === "fix") {
        let stopAfter = parseInt(args[0]);

        if (isNaN(stopAfter)) {
            stopAfter = 20;
        }

        message.channel.fetchMessages({limit: stopAfter}).then(messages => {
            let messageArray = messages.array();
            messageArray = messageArray.filter(m => m.author.id === client.user.id);
            console.log(messageArray);
        });
    }*/

});

client.login(config.token);
