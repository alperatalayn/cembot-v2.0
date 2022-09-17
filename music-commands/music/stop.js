module.exports = {
    name: 'stop',
    description: 'stop the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content:`No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        queue.destroy();

        message.reply({ content: `Music stopped in this server, see you next time ✅`});
    },
};