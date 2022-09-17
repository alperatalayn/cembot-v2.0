const ms = require('ms');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'skip back or foward in a song',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'time that you want to skip to',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.reply}... try again ? ❌`, ephemeral: true });

        const timeToMS = ms(message.content.substring(message.content.indexOf(' ') + 1));

        if (timeToMS >= queue.current.durationMS) return message.reply({ content:`The indicated time is higher than the total time of the current song ${message.member}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`, ephemeral: true });

        await queue.seek(timeToMS);

        message.reply({ content: `Time set on the current song **${ms(timeToMS, { long: true })}** ✅`});
    },
};