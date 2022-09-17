module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `Paşam liste yok`, ephemeral: true });
        var success = null;
        if(queue.connection.paused){
            success = queue.setPaused(false);
            return message.reply({content: 'Durmadan devam edersem söz olur.', ephemeral: true})
        } 

        
        return message.reply({ content:success ? `${queue.current.title} kısa bir aranın ardından devam ediyor ✅` : `Bazen robotlar bile hata yapar, önemli olan aynı çukura birdaha düşmemek`});
    },
};
