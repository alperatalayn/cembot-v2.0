module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ client, message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Paşam liste yok`, ephemeral: true });

        if (!queue.previousTracks[1]) return message.reply({ content: `Benim geçmişim bir böplüktür. Çöplüğü sadece itler karıştırır`, ephemeral: true });

        await queue.back();

        message.reply({ content:`İnsan şimdi neyse geçmişinde de odur!`});
    },
};