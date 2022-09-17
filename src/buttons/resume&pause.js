module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Paşam şarkı yok`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `Durdum. ${queue.current.title} çalıyordum ✅` : `${queue.current.title} çalmaya devam ✅`}`, ephemeral: true});
}