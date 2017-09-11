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
        message.delete().catch(console.error);
        let files = fs.readdirSync("./images");
        let item, chosenImg;
        console.log(`Searching for ${args[0].toLowerCase()} in ./images/`);
        for (item in files) {
            if (files[item].substring(0, files[item].length - 4).toLowerCase().startsWith(args[0].toLowerCase())) {
                console.log(`Match found: ${files[item]}`);
                chosenImg = item;
                break;
            }
        }
        if (chosenImg !== undefined){
            message.channel.send(args.slice(1).join(" "), {file: `./images/${files[chosenImg]}`});
        }
        console.log("\n");
        return;
    }

    if (command === "imglist") {
        message.edit(`${client.user.username}'s self-bot speaking, your available images are:\n*${fs.readdirSync("./images").join("\n")}*`);
        console.log(`Delivered image list\n`);
        return;
    }

    //if command isn't identified, clean up the mess, it's probably me being an idiot
    message.delete().catch(console.error);

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
