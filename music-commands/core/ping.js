const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Get the ping of the bot!",
    async execute({ client, message }) {

        const m = await message.reply("Ping?")
        message.reply(`Pong! API Latency is ${Math.round(client.ws.ping)}ms 🛰️, Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`)

    },
};