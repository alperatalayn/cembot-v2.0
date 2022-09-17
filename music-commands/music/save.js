const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `No music currently playing ${message.member}... try again ? ❌`, ephemeral: true });

        message.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Duration:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Song by:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'Song URL:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`from the server ${message.member.guild.name}`, iconURL: message.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return message.reply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true });
        }).catch(error => {
            return message.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true });
        });
    },
};