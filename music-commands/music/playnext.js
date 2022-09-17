const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "song you want to playnext",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to playnext',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ message }) { 
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        const song = message.content.substring(message.content.indexOf(' ') + 1);

        const res = await player.search(song, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply({ content: `No results found ${message.member}... try again ? ❌`, ephemeral: true });

       if (res.playlist) return message.reply({ content: `This command dose not support playlist's ${message.member}... try again ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await message.reply({ content:`Track has been inserted into the queue... it will play next 🎧`});

    }
}