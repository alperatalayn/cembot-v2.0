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

        if (!queue || !queue.playing) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });
        switch (message.content.substring(message.content.indexOf(' ') + 1)) {
            case 'queue': {
                if (queue.repeatMode === 1) return message.reply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${message.member}... try again ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return message.reply({ content:success ? `Repeat mode **enabled** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${message.member}... try again ? ❌` });
                break
            }
            case 'disable': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return message.reply({ content:success ? `Repeat mode **disabled**` : `Something went wrong ${message.member}... try again ? ❌` });
                break
            }
            case 'song': {
                if (queue.repeatMode === 2) return message.reply({ content:`You must first disable the current music in the loop mode (/loop Disable) ${message.member}... try again ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return message.reply({ content:success ? `Repeat mode **enabled** the current song will be repeated endlessly (you can end the loop with /loop disable)` : `Something went wrong ${message.member}... try again ? ❌` });
                break
            }
            default:{ 
                if (queue.repeatMode === 1 || queue.repeatMode === 2) {
                    const success = queue.setRepeatMode( QueueRepeatMode.OFF);
                    return message.reply({ content:success ? `Repeat mode **disabled**` : `Something went wrong ${message.member}... try again ? ❌` });
                }
                
                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);
                return message.reply({ content:success ? `Repeat mode **enabled** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${message.member}... try again ? ❌` });
                break
            }
        }
       
    },
};