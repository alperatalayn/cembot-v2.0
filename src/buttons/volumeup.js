const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Paşam şarkı yok.`, ephemeral: true });

    const vol = Math.floor(queue.volume + 5)

    if (vol > maxVol ) return inter.reply({ content: `Şükürler olsun var sesimle haykırıyorum.`, ephemeral: true })

    if (queue.volume === vol) return inter.reply({ content: `Aynı nehirde iki defa yıkanılmaz.`, ephemeral: true });

    const success = queue.setVolume(vol);

    return inter.reply({ content:success ? `Ses seviyesi: **${vol}**/**${maxVol}**% 🔊` : `Başım belada.`, ephemeral: true});
}