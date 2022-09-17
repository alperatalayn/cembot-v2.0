const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'enable or disable looping of song\'s or the whole queue',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'what action you want to preform on the loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Paşam liste yok.`, ephemeral: true });
        switch (message.content.substring(message.content.indexOf(' ') + 1)) {
            case 'queue': {
                if (queue.repeatMode === 1) return message.reply({ content:`Allah bir kapıyı kapatır diğerini açar.`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return message.reply({ content:success ? `Dönüyorum semazen gibi, bütün listeyi.` : `Dönemedim, bağışla.` });
                break
            }
            case 'disable': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return message.reply({ content:success ? `Pervane gibi döndüm, yeter artık dost dediler.`: `Duramadım, bağışla.` });
                break
            }
            case 'song': {
                if (queue.repeatMode === 2) return message.reply({ content:`Allah bir kapıyı kapatır diğerini açar.`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return message.reply({ content:success ? `Dönüyorum semazen gibi, çalan şarkıyı.` : `Dönemedim, bağışla.` });
                break
            }
            default:{ 
                if (queue.repeatMode === 1 || queue.repeatMode === 2) {
                    const success = queue.setRepeatMode( QueueRepeatMode.OFF);
                    return message.reply({ content:success ? `Pervane gibi döndüm, yeter artık dost dediler.` : `Duramadım, bağışla` });
                }
                
                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);
                return message.reply({ content:success ? `Dönüyorum semazen gibi, bütün listeyi.` : `Dönemedim, bağışla.`});
                break
            }
        }
       
    },
};