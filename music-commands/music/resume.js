module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });
        var success = null;
        if(queue.connection.paused){
            success = queue.setPaused(false);
            return message.reply({content: 'The track is already running!', ephemeral: true})
        } 

        
        return message.reply({ content:success ? `Current music ${queue.current.title} resumed ✅` : `Something went wrong ${message.member}... try again ? ❌`});
    },
};
