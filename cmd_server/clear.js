module.exports = {
    name: 'clear',
    aliases: ['delete', 'supp', 'prune'],
    description: 'Suppression de message de 1 à 99 messages.',
    guildOnly: true,

    execute(message, args) {
        if (!message.member.roles.cache.find(r => r.name === "TEAMSO")) return message.channel.send('Permission refusé.')
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('Valeur incorrecte.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('Entrez un nombre entre **1** et **99**.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('Erreur lors de l\'execution de la commande ** clear **');
        });
    }
}