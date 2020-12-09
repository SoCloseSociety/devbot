const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: "Création d'un embed (post).",
    aliases: ['post', 'alert'],
    cooldown: 15,
    guildOnly: true,

    execute(message) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')
        const channel = message.channel.guild.channels.cache.find(ch => ch.id === '710149160795373618');

        let embedContent = message.content.substring(7);
        let embed = new Discord.MessageEmbed();
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        embed.setTitle("📣 Notifications");
        embed.setThumbnail(message.guild.iconURL());
        embed.setDescription(embedContent);
        embed.setColor("RANDOM");
        embed.setTimestamp();
        embed.setFooter('Design By SoClose', 'https://cdn.discordapp.com/attachments/685431451147436043/685431635184975881/SoClose.jpg');

        message.channel.send(embed);
        // channel.send(`L'utilisateur ${message.author} à invoqué la commande \`${this.name}\`.`);
    }
}