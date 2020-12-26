const { MessageAttachment } = require('discord.js');

module.exports = {
    name: '#',
    description: '#.',
    category: 'Gif',
    cooldown: 10,

    execute(message) {
        const attachment = new MessageAttachment('#');
        message.channel.send(attachment);
  },
};