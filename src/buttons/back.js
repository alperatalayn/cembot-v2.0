module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Paşam şarkı yok`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Bizim listede aksayan bir taraf var. Mesela ben bundan önce şarkı olduğuna inanmıyorum. \n Beni burda tutan şey şarkı çalmak vecdi mi? Sanmıyorum... `, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Çaldım çalacağın bütün şarkıları`, ephemeral: true});
}
