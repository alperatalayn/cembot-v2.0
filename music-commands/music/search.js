const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'search a track',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to search',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, message }) {
        const song = message.content.substring(message.content.indexOf(' ') + 1)

        const res = await player.search(song, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply({ content: `No results found ${message.member}... try again ? ❌`, ephemeral: true });

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: `Results for ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** ⬇️`)
        .setTimestamp()
        .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: message.member.avatarURL({ dynamic: true })})

        message.reply({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === message.member.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.reply({ content: `Durdum tamam ✅`, ephemeral: true }), collector.stop();

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) return message.reply({ content: ` **1** le **${maxTracks.length}** arasında bir sayı girmezsen gece rüyana girerim. Ya da kapat gidelim ❌`, ephemeral: true });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guildId);
                return message.reply({ content: `Lanet olsun yezide!`, ephemeral: true });
            }

            await message.reply(`Yoldayım geliyorum az daha dayan`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.reply({ content:`Haydi Abbas vakit tamam`, ephemeral: true })
        });
    },
};