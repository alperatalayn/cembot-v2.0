const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'remove',
    description: "remove a song from the queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to remove',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'the place in the queue the song is in',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ message }) { 
        const number = message.content.substring(message.content.indexOf(' ') + 1)

        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Yok ki nasıl sileyim`, ephemeral: true });
        if (!number) message.reply({ content: `Bana şarkının kaçıncı sırada olduğunu söyle sana kim olduğunu söyleyeyim`, ephemeral: true });

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index] ? queue.tracks[index].title : null

            if (!trackname) return message.reply({ content: `Emin misin, var mı böyle bişey?`, ephemeral: true });   

            queue.remove(index);
            
            return message.reply({ content: `${trackname}'ı kaldırdım gitti` });
        }


         
    }
}