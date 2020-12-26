const {calculator} = require('../misc/functions')

module.exports = {
    name: 'calculatrice',
    description: 'Calculatrice du serveur.',
    category: 'Maths',

    execute(message, args) {
       if(!args[0]) return message.channel.send('Merci d entrer un premier nombre espacer d un signe espacer dun second nombre.')
        if(!args[1]) return message.channel.send('Merci d entrer un premier nombre espacer d un signe espacer dun second nombre.')
        if(!args[2]) return message.channel.send('Merci d entrer un premier nombre espacer d un signe espacer dun second nombre.')
        message.channel.send(calculator(args[0],args[1],args[2]))
    }
  }