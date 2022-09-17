const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Jumps to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'number',
            description: 'the place in the queue the song is in',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ message }) { 
        var number =  message.content.substring(message.content.indexOf(' ') + 1)
        number = parseInt(number)
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Paşam liste yok`, ephemeral: true });
        if (!number) return message.reply({ content: `Sayı bile sayamayanlar var aramızda. Bir gecede cahil kaldık.`, ephemeral: true });
        console.log(queue.tracks.length)
        if (number > queue.tracks.length || queue.tracks.length <= 0) return message.reply({ content: `Bak bakayım listede o kadar şarkı var mı?`, ephemeral: true });
        if (number) {
            const index = number - 1
            const trackname = queue.tracks[index].title
            if (!trackname) return message.reply({ content: `Murat gilin damından atlayamadım.`, ephemeral: true });   
            queue.skipTo(index);
            return message.reply({ content: `Atladım düştüm taştan -Sibel Can` });
        }
         
    }
}