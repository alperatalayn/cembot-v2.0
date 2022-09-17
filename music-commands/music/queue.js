const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Get the songs in the queue',
    voiceChannel: true,

    execute({ client, message }) {
        const queue = player.getQueue(message.guildId);

        if (!queue) return message.reply({ content: `Paşam liste yok`, ephemeral: true });

        if (!queue.tracks[0]) return  message.reply({ content: `Bak bakalım listede şarkı var mı?`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.length;

        const nextSongs = songs > 5 ? `Ve daha niceleri` : `toplam **${songs}** yapıyor sanırım`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (${track.requestedBy.username} istedi)`)

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Sıradaki - ${message.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Şimdi çalıyor... ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'İmam Hüseyin susamıştı, bir yudum su aramıştı, ana yüreği yanmıştı, kerbelada, kerbelada...', iconURL: message.member.avatarURL({ dynamic: true })})

        message.reply({ embeds: [embed] });
    },
};