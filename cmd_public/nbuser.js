module.exports = {
    name: 'nbuser',
    description: 'Afficher le nombre d utilisateur du serveur.',
    category: 'Public',
    cooldown: 15,

    execute(message) {
        message.reply(`Le nombre total de membre sur le serveur est de ${message.guild.memberCount} !`);
  },
};