module.exports = {
    name: 'shuffle',
    description: 'shuffle the track',
    voiceChannel: true,

    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return message.reply({ content: `No music in the queue after the current one ${message.member}... try again ? ❌`, ephemeral: true });

        await queue.shuffle();

        return message.reply({ content:`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`});
    },
};