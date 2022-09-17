const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'volume',
    description: 'adjust',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'the amount volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `Paşam şarkı yok`, ephemeral: true });
        const vol = parseInt(message.content.substring(message.content.indexOf(' ') + 1))

        if (queue.volume === vol) return message.reply({ content: `Olduğum yerdeyim.`, ephemeral: true });

        const success = queue.setVolume(vol);

        return message.reply({ content:success ? `Ses seviyesi: **${vol}**/**${maxVol}**% 🔊` : `Bişey oldu`});
    },
};