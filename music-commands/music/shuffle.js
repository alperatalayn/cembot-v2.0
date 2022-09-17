module.exports = {
    name: 'shuffle',
    description: 'shuffle the track',
    voiceChannel: true,

    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Paşam liste yok`, ephemeral: true });

        if (!queue.tracks[0]) return message.reply({ content: `Yok bundan sonra şarkı filan. Ne haliniz varsa görün.`, ephemeral: true });

        await queue.shuffle();

        return message.reply({ content:`Ortalık karıştı düzen bozuldu, yetiş ya Muhammed, yetiş ya ALİ`});
    },
};