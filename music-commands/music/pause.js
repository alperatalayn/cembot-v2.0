module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });
        var success = null;
        if(!queue.connection.paused){
            success = queue.setPaused(true);
            return message.reply({content: 'The track is currently paused!', ephemeral: true})
        } 
        
        return message.reply({ content: success ? `Current music ${queue.current.title} paused ✅` : `Something went wrong ${message.member}... try again ? ❌` });
    },
};
