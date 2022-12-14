const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'hızır',
    description: "All the commands this bot has!",
    showHelp: false,

    execute({ client, message }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('Komut verirken dikkatli olalım, botuz diye ezilecek değiliz.')
        .addFields([ { name: `Emriniz - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'Cembot.', iconURL: message.member.avatarURL({ dynamic: true })});

        message.reply({ embeds: [embed] });
    },
};