const { relative } = require("path")

module.exports = {
    name: "Giveaway",
    description: "Créer un jeux concours",
    usage: '<time> <prix>',
    category: "Private",

    execute(message, args){
        let timev = message.content.slice(bot.prefix.length+9)
        if(!timev) return message.channel.send('You did not specify your time in MS!')
        let time = parseInt(timev,10)
        if(time<= 15000){
            return message.channel.send('Your time in MS has to be longuer than 15seconds!')
        }
        let prize = message.content.slice(bot.prefix.length+9+time.length)
        if(!prize) return message.channel.send("No prize was specified.")
    }
}