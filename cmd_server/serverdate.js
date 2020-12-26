const Discord = require('discord.js');

module.exports = {
    name: 'serverdate',
    aliases: ['sd', 'serverd'],
    description: 'Date d activitée du serveur.',
    category: 'Server',
    guildOnly: true,

    execute(message) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')
        const channel = message.channel.guild.channels.cache.find(ch => ch.id === '710149160795373618');
        let serverEmbed = new Discord.MessageEmbed()
        serverEmbed.setColor("RANDOM")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle(`${this.description}`)
            .setThumbnail(message.guild.iconURL())
            .setDescription("", message.guild.setTimestamp)
            .addField("Serveur créé le: ", message.guild.createdAt)
            .setTimestamp()
            .setFooter('Design By SoClose', 'https://cdn.discordapp.com/attachments/685431451147436043/685431635184975881/SoClose.jpg')

        message.channel.send(serverEmbed)
            // channel.send(`L'utilisateur ${message.author} à invoqué la commande \`${this.name}\`.`)

    }
}