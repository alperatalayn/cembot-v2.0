const maxVol = client.config.opt.maxVol;

module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Paşam şarkı yok`, ephemeral: true });

        const vol = Math.floor(queue.volume - 5)

        if (vol < 0 ) return inter.reply({ content: `Sesimizi kısmaya çalışanın alnını karışlarız!`, ephemeral: true })
        
        if (queue.volume === vol) return inter.reply({ content: `Aynı nehirde iki defa yıkanılmaz.`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `Ses seviesi: **${vol}**/**${maxVol}**% 🔊` : `Başaramadım.`, ephemeral: true});
}