const Discord = require('discord.js');

module.exports = {
    name: 'newrole',
    description: "Création d'un nouveau role à un utilisateur.",
    aliases: ['addrole', 'bonus'],
    cooldown: 2,
    guildOnly: true,

    execute(message) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')


        const role = member.roles.cache.find(role => role.name === 'TEAMSO');
        const member = message.mentions.members.first();
        if (member.roles.cache.some(role => role.name === 'TEAMSO')) {
            let embed = new Discord.MessageEmbed();
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
            embed.setTitle(`📣 L'utilisateur ${message.user.name.tag}à était promu par ${message.author.tag}!`);
            embed.setThumbnail(message.guild.iconURL());
            embed.setDescription("Félicitation à toi!");
            embed.setColor("RANDOM");
            embed.setTimestamp();
            embed.setFooter('Design By SoClose', 'https://cdn.discordapp.com/attachments/685431451147436043/685431635184975881/SoClose.jpg');

            message.channel.send(embed).member.roles.add(role);
        }
    }
}