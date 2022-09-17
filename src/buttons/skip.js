module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Paşam liste yok`, ephemeral: true });
    
    const success = queue.skip();

    return inter.reply({ content: success ? `Geçtim. ${queue.current.title} çalıyorum ✅` : `Olmadı bu sefer. Allahın izniyle o da olur. Sabreden derviş muradına ermiş.`, ephemeral: true});
}