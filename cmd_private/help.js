const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Infos à propos des commandes.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,

    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')
        if (!args.length) {
            data.push('|--> Liste des commandes :');
            data.push(commands.map(command => command.name).join(' | '));
            data.push(`|--> Tu peux envoyer \`${prefix}help [command name]\` pour plus d'infos!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Tu viens de recevoir les commandes en MP! 😙');
                })
                .catch(error => {
                    console.error(`Erreur message non envoyé ${message.author.tag}.\n`, error);
                    message.reply('Je ne peux pas vous répondre!');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        let exampleEmbed = new Discord.MessageEmbed();

        if (!command) {
            // return message.reply('that\'s not a valid command!');
            exampleEmbed.setDescription('La commande n\'existe pas!')
            message.channel.send(exampleEmbed);
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    }
};