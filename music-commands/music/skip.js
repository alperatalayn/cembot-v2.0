module.exports = {
    name: 'skip',
    description: 'stop the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

         if (!queue || !queue.playing) return message.reply({ content:`Paşam şarkı yok`, ephemeral: true });

        const success = queue.skip();

        return message.reply({ content: success ? `Geçtim ${queue.current.title} çalıyorum ✅` : `Bazen botlar bile hata yapar. Önemli olan aynı çukura birdaha düşmemek!`});
    },
};