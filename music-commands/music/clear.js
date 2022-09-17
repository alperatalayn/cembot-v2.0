module.exports = {
    name: 'clear',
    description: 'clear all the music in the queue',
    voiceChannel: true,

    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        if (!queue.tracks[0]) return message.reply({ content: `No music in the queue after the current one ${message.member}... try again ? ❌`, ephemeral: true });

        await queue.clear();

        message.reply(`The queue has just been cleared 🗑️`);
    },
};