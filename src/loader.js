const { readdirSync } = require('fs');
const { Collection, EmbedBuilder } = require('discord.js');
const BlackList = require('../mongo/BlackList');
const {imam, help, asim, ali, kerbela, commands} = require("../fun-commands/general")
client.commands = new Collection();
CommandsArray = [];

const config = require('../config');


const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

async function isBlackListed(username) {
	const arr = await BlackList.list();
	return arr.some(function(el) {
	  return el.username === username;
	}); 
}
console.log(`Loading events...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`-> [Loaded Event] ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`Loading music commands...`);

readdirSync('./music-commands/').forEach(dirs => {
    const commands = readdirSync(`./music-commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../music-commands/${dirs}/${file}`);
        if (command.name && command.description) {
            CommandsArray.push(command);
            console.log(`-> [Loaded Command] ${command.name.toLowerCase()}`);
            client.commands.set(command.name.toLowerCase(), command);
            delete require.cache[require.resolve(`../music-commands/${dirs}/${file}`)];
        } else console.log(`[failed Command]`)//console.log(`[failed Command]  ${command.name.toLowerCase()}`)
    };
});

client.on('messageCreate', (message)=>{
    for(command of CommandsArray){
        if(message.content.startsWith(config.opt.prefix + command.name)){
            command.execute({client, message})
        }
    }
})

client.on('messageCreate', async (message) => {
	if (!message.guild) return;
	if (message.author.bot) return;
	if (!client.application?.owner) await client.application?.fetch();
	for (var i = 0; i < commands.length; i += 1) {
		if (message.content.toLowerCase() === commands[i].name) {
			await message.reply(commands[i].value);
		}
	}
	var isAuthorBlackListed = await isBlackListed(message.author.username);
	if (isAuthorBlackListed) {
		var i = getRandomInt(asim.length);
		await message.reply(asim[i].value);
	}
	if (message.content.toLowerCase() === 'ali') {
		var i = getRandomInt(ali.length);
		await message.reply(ali[i].value);
	} else if (
		message.content.toLowerCase() === '12 imam' ||
		message.content.toLowerCase() === 'on iki imam' ||
		message.content.toLowerCase() === '12imam'
	) {
		var i = getRandomInt(imam.length);
		await message.reply(imam[i].value);
	} 
})