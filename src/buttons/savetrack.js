const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.playing) return inter.reply({ content: `Paşam şarkı yok`, ephemeral: true });

    inter.member.send({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle(`:arrow_forward: ${queue.current.title}`)
                .setURL(queue.current.url)
                .addFields(
                    { name: ':hourglass: Süre:', value: `\`${queue.current.duration}\``, inline: true },
                    { name: 'Üstad:', value: `\`${queue.current.author}\``, inline: true },
                    { name: 'Görüntülenme sayısı :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                    { name: 'Bağlantı:', value: `\`${queue.current.url}\`` }
                )
                .setThumbnail(queue.current.thumbnail)
                .setFooter({ text: `${inter.member.guild.name}'den geliyorum bunu sana göncderdiler`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
        ]
    }).then(() => {
        return inter.reply({ content: `DM bak güzellik ✅`, ephemeral: true });
    }).catch(error => {
        return inter.reply({ content: `Kınama hallarımı, açık et yollarımı`, ephemeral: true });
    });


}
