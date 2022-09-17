const { QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'play',
    description: "play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ message }) {
        const song = message.content.substring(message.content.indexOf(' ') + 1);
        const res = await player.search(song, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply({ content: `No results found ${message.member}... try again ? ❌`, ephemeral: true });

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel,
            spotifyBridge: client.config.opt.spotifyBridge,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guildId);
            return message.reply({ content: `I can't join the voice channel ${message.member}... try again ? ❌`, ephemeral: true});
        }

       await message.reply({ content:`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};