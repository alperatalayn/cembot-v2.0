module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ client, message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return message.reply({ content: `There was no music played before ${message.member}... try again ? ❌`, ephemeral: true });

        await queue.back();

        message.reply({ content:`Playing the **previous** track ✅`});
    },
};