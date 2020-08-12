const Discord = require('discord.js');
const { prefix } = require('../config.json'); // relier à config.json

module.exports = {
    name: 'vote',
    description: "Création d'un embed (post).",
    aliases: ['question', 'poll'],
    cooldown: 15,
    guildOnly: true,

    execute(message) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')

        let args = message.content.substring(prefix.length).split(" ");
        const Embed = new Discord.MessageEmbed()

        switch (args[0]) {
            case "vote":
                Embed.setColor("RANDOM")
                    .setDescription("Créer un vote! ** !vote <description> **")

                if (!args[1]) {
                    message.channel.send(Embed);
                }
                // eslint-disable-next-line no-case-declarations
                let msqgArgs = args.slice(1).join(" ");

                message.channel.send("📝 " + msqgArgs).then(messageReaction => {
                    messageReaction.react("✅");
                    messageReaction.react("❎");
                    message.delete(2000);
                });
                break;
        }
    }
}