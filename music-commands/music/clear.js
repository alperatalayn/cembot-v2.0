module.exports = {
    name: 'clear',
    description: 'clear all the music in the queue',
    voiceChannel: true,

    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Paşam liste yok`, ephemeral: true });

        if (!queue.tracks[0]) return message.reply({ content: `Sonunu düşünen kahraman olamaz`, ephemeral: true });

        await queue.clear();

        message.reply(`Liste sütten çıkmış ak kaşık gibi pür-i pak oldu`);
    },
};