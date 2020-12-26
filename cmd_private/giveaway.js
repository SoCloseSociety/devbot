// const { MessageEmbed } = require("discord.js")
// const { relative } = require("path")

// module.exports = {
//     name: "Giveaway",
//     description: "Créer un jeux concours",
//     usage: '<time> <prix>',
//     category: "Private",

//     execute(message, args, bot){
//         let timev = message.content.slice(bot.prefix.length+9)
//         if(!timev) return message.channel.send('You did not specify your time in MS!')
//         let time = parseInt(timev,10)
//         if(time<= 15000){
//             return message.channel.send('Your time in MS has to be longuer than 15seconds!')
//         }
//         let prize = message.content.split(`${time}`).join("").split(`${bot.prefix} giveaway `).join("")
//         if(!prize) return message.channel.send("No prize was specified.")
//         const Embed = new MessageEmbed()
//         .setTitle('New Giveaway !')
//         .setDescription(prize)
//         .setColor('RANDOM')
//         .setFooter(`This giveaway is ${ms(time)} long!`)

//         let msg = message.channel.send(Embed)
//         msg.react(':tada')

//         setTimeout(() => {
//            let winner = msg.reactions.cache.get(':tada:').users.cache.random().id
//            message.channel.send(`The winner is <@${winner}>`)
//         }, time);
//     }
// }