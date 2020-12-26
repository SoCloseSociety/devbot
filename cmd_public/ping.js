module.exports = {
    name: 'ping',
    description: 'Ping!',
    category: 'Public',
    cooldown: 5,

    execute(message) {
        message.channel.send('Pong.');
    },
};