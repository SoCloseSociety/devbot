module.exports = {
    name: 'ban',
    description: 'Ban un membre.',
    guildOnly: true,
    cooldown: 10,

    execute(message) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')
            // if the message content starts with "!ban"
        if (message.content.startsWith('!ban')) {
            // Assuming we mention someone in the message, this will return the user
            // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
            const user = message.mentions.users.first();
            const channel = message.channel.guild.channels.cache.find(ch => ch.id === '707374131464634378');
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    /**
                     * Ban the member
                     * Make sure you run this on a member, not a user!
                     * There are big differences between a user and a member
                     * Read more about what ban options there are over at
                     * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
                     */
                    member
                        .ban({
                            reason: 'They were bad!',
                        })
                        .then(() => {
                            // We let the message author know we were able to ban the person
                            message.reply(`Success Ban! ${user.tag}`);
                            channel.send(`L'utilisateur ${message.author} à invoqué la commande \`${this.name}\` et ban ${user.tag}.`)
                        })
                        .catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to ban the member,
                            // either due to missing permissions or role hierarchy
                            message.reply('Impossible de Ban!');
                            // Log the error
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("Membre pas dans la guile!");
                    channel.send(`L'utilisateur ${message.author} à invoqué la commande \`${this.name}\`.`)
                }
            } else {
                // Otherwise, if no user was mentioned
                message.reply("Aucun utilisateur mentioné!");
                channel.send(`L'utilisateur ${message.author} à invoqué la commande \`${this.name}\`.`)
            }
        }
    },
}