const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'jump',
    description: "Jumps to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to jump to',
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
        var number =  message.content.substring(message.content.indexOf(' ') + 1)
        number = parseInt(number)
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });
        if (!number) return message.reply({ content: `You have to type a number to jump to a song ${message.member}... try again ? ❌`, ephemeral: true });
        console.log(queue.tracks.length)
        if (number > queue.tracks.length || queue.tracks.length <= 0) return message.reply({ content: `You have to type a valid index to jump to a song ${message.member}... try again ? ❌`, ephemeral: true });
        if (number) {
            const index = number - 1
            const trackname = queue.tracks[index].title
            if (!trackname) return message.reply({ content: `This track dose not seem to exist ${message.member}...  try again ?❌`, ephemeral: true });   
            queue.skipTo(index);
            return message.reply({ content: `Jumped to ${trackname}  ✅` });
        }
         
    }
}