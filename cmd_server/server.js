const Discord = require('discord.js');

module.exports = {
    name: 'server',
    aliases: ['infos-server', 'soclose-server'],
    description: 'Informations du serveur. ',
    guildOnly: true,

    execute(message) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')
        const channel = message.channel.guild.channels.cache.find(ch => ch.id === '710149160795373618');
        let serverEmbed = new Discord.MessageEmbed()
        serverEmbed.setColor("RANDOM")
            .setAuthor(message.author.username, message.guild.iconURL())
            .setTitle(`${this.description}`)
            .setThumbnail(message.guild.iconURL())
            .addFields({ name: 'Name:', value: message.guild.name, inline: true }, { name: 'Fondateur:', value: message.guild.owner, inline: true }, { name: 'Utilisateurs:', value: message.guild.memberCount, inline: true })
            .addFields({ name: 'Online:', value: message.guild.available, inline: true }, { name: 'ID Server:', value: message.guild.id, inline: true }, { name: 'Location:', value: message.guild.region, inline: true })
            .addField("Serveur créé le: ", message.guild.createdAt)
            .setTimestamp()
            .setFooter('Design By SoClose', 'https://cdn.discordapp.com/attachments/685431451147436043/685431635184975881/SoClose.jpg')

        message.channel.send(serverEmbed)
            // channel.send(`L'utilisateur ${message.author} à invoqué la commande \`${this.name}\`.`)

    }
}