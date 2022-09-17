module.exports = {
    name: 'stop',
    description: 'stop the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content:`Paşam şarkı yok`, ephemeral: true });

        queue.destroy();

        message.reply({ content: `Bitirdim gidiyorum. Hızır yoldaşın olsun!`});
    },
};