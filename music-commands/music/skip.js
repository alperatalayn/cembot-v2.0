module.exports = {
    name: 'skip',
    description: 'stop the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

         if (!queue || !queue.playing) return message.reply({ content:`No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        const success = queue.skip();

        return message.reply({ content: success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.member}... try again ? ❌`});
    },
};