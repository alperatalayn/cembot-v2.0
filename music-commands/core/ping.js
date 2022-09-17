const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Get the ping of the bot!",
    async execute({ client, message }) {
        message.reply(`Pong! ${Math.round(client.ws.ping)}ms geç kaldım kusura bakmayın`)

    },
};