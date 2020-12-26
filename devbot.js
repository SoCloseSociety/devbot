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
    console.log('❤️  DevBot is Online!');
});


// --------------------------------------------  LIAISONS  -------------------------------------------------//
// Liaison des commandes avec le dossier Public :
const commandFiles = fs.readdirSync('./cmd_public').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmd_public/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
}
// Liaison des commandes avec le dossier Private :
const commandFiles1 = fs.readdirSync('./cmd_private').filter(file => file.endsWith('.js'));
for (const file of commandFiles1) {
    const command = require(`./cmd_private/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
}
// Liaison des commandes avec le dossier Webhook :
const commandFiles2 = fs.readdirSync('./cmd_webhook').filter(file => file.endsWith('.js'));
for (const file of commandFiles2) {
    const command = require(`./cmd_webhook/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
}
// Liaison des commandes avec le dossier Commerce :
const commandFiles3 = fs.readdirSync('./cmd_commerce').filter(file => file.endsWith('.js'));
for (const file of commandFiles3) {
    const command = require(`./cmd_commerce/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
}
// Liaison des commandes avec le dossier Server :
const commandFiles4 = fs.readdirSync('./cmd_server').filter(file => file.endsWith('.js'));
for (const file of commandFiles4) {
    const command = require(`./cmd_server/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
}
// Liaison des commandes avec le dossier Gif :
const commandFiles5 = fs.readdirSync('./cmd_gif').filter(file => file.endsWith('.js'));
for (const file of commandFiles5) {
    const command = require(`./cmd_gif/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
}
// Liaison des commandes avec le dossier Maths :
const commandFiles6 = fs.readdirSync('./cmd_maths').filter(file => file.endsWith('.js'));
for (const file of commandFiles6) {
    const command = require(`./cmd_maths/${file}`); // Variable du dossier.
    client.commands.set(command.name, command);
    console.log('✅ ',file);
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
    if (!command)  {
        message.reply('Utilise `!help` pour découvrir les commandes.'); // Si différent commands return. 
        return message.delete({ timeout: 5000 })
    }
     

    // --------------------------------------------  ARGUMENTS REPONSE ERROR  -------------------------------------------------//
    if (command.guildOnly && message.channel.type !== 'text') {

         message.reply('Uniquement sur le serveur.'); // Exécution impossible en MP.
        return message.delete({ timeout: 5000 })
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
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

   try {
        command.execute(message, args);
        message.delete({ timeout: 1000 })
    } catch (error) {
        console.error(error);
       // message.reply('Erreur Console');
    }
});




// Token Bot
client.login(token); // Relier sur config.json