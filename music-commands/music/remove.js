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

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });
        if (!number) message.reply({ content: `You have to type a number to remove a song ${message.member}... try again ? ❌`, ephemeral: true });

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index] ? queue.tracks[index].title : null

            if (!trackname) return message.reply({ content: `This track dose not seem to exist ${message.member}...  try again ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return message.reply({ content: `removed ${trackname} from the queue ✅` });
        }


         
    }
}