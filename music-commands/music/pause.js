module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `Paşam liste yok`, ephemeral: true });
        var success = null;
        if(!queue.connection.paused){
            success = queue.setPaused(true);
            return message.reply({content: 'Çoktan durdum bekliyorum', ephemeral: true})
        } 
        
        return message.reply({ content: success ? `${queue.current.title} durdu ✅` : `Bişey oldu` });
    },
};
