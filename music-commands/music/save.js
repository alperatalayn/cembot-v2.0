const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `Paşam şarkı yok`, ephemeral: true });

        message.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Süre:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Eserin sahibi:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Görüntülenme :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'Bağlantı:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`${message.member.guild.name}'den geldim. Bunu sana gönderdiler.`, iconURL: message.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return message.reply({ content: `Dm bak güzellik ✅`, ephemeral: true });
        }).catch(error => {
            return message.reply({ content: `Sana giden yolları yezid kapatmış`, ephemeral: true });
        });
    },
};