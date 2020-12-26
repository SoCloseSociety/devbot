module.exports = {
    name: 'myinfos',
    description: 'Afficher les infos perso.',
    category: 'Public',
    cooldown: 15,

    execute(message) {
        message.reply(`Ton nom sur le serveur ${message.author.username} & ton ID ${message.author.id} !`);
  },
};