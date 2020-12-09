// --------------------------------------------  DEPENDANCES  -------------------------------------------------//
// Library + Config générale :
const Discord = require('discord.js');
const { prefix, token } = require('./config.json'); // relier à config.json
const fs = require('fs'); // Lib Général Lint
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();


// --------------------------------------------  LOGS ALERT  -------------------------------------------------//
// Startup :
client.once('ready', () => {
    console.log('Ready!');
});


// --------------------------------------------  LIAISONS  -------------------------------------------------//
// Liaison des commandes avec le dossier Public :
const commandFiles = fs.readdirSync('./cmd_public').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmd_public/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
}

// Liaison des commandes avec le dossier Private :
const commandFiles1 = fs.readdirSync('./cmd_private').filter(file => file.endsWith('.js'));
for (const file of commandFiles1) {
    const command = require(`./cmd_private/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
}

// Liaison des commandes avec le dossier Webhook :
const commandFiles2 = fs.readdirSync('./cmd_webhook').filter(file => file.endsWith('.js'));
for (const file of commandFiles2) {
    const command = require(`./cmd_webhook/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
}

// Liaison des commandes avec le dossier Commerce :
const commandFiles3 = fs.readdirSync('./cmd_commerce').filter(file => file.endsWith('.js'));
for (const file of commandFiles3) {
    const command = require(`./cmd_commerce/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
}

// Liaison des commandes avec le dossier Server :
const commandFiles4 = fs.readdirSync('./cmd_server').filter(file => file.endsWith('.js'));
for (const file of commandFiles4) {
    const command = require(`./cmd_server/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
}


// --------------------------------------------  ACCUEIL-USERS  -------------------------------------------------//
// Création d'un événements d'accueil.
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '🔔-welcome'); // Détection du channel.
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`); // Réponse serveur.
});


// --------------------------------------------  ARGUMENTS  -------------------------------------------------//
// Détection des arguments + commandes : 
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Si non detecté return.

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // Liaisons aliases commandes.
    if (!command) return message.reply('Utilise `!help` pour découvrir les commandes.'); // Si différent commands return. 

    // --------------------------------------------  ARGUMENTS REPONSE ERROR  -------------------------------------------------//
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Only on server.'); // Exécution impossible en MP.
    }

    if (command.args && !args.length) {
        let reply = `Aucun argument détécté, ${message.author}!`; // Si aucun arguments détecté.
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``; // Usage infos commande.
        }
        return message.channel.send(reply).then(message => message.delete(1000)); // Réponse commande.
    }


    // --------------------------------------------  TIMER et SPAM DÉCLÉRATION  -------------------------------------------------//
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    try {
        command.execute(message, args);

    } catch (error) {
        console.error(error);
        message.reply('Erreur Console').then(message.delete(1000));
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    // --------------------------------------------  ARGUMENTS EXECUTION -------------------------------------------------//

});




// Token Bot
client.login(token); // Relier sur config.json