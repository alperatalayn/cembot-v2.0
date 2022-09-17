const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'filter',
    description: 'add a filter to your track',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'filter you want to add',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ message, client }) {
        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) return message.reply({ content: `Paşam liste yok`, ephemeral: true });

        const actualFilter = queue.getFiltersEnabled()[0];

        const infilter = message.content.substring(message.content.indexOf(' ') + 1);


        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase());

        if (!filter) return message.reply({ content: `Böyle bişey yok❌\n${actualFilter ? `Aktif filtre ${actualFilter}.\n` : ''}Olası filtreler ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.reply({ content: `${filter} şimdi **${queue.getFiltersEnabled().includes(filter) ? 'aktif' : 'pasif'}** ✅\n*Uzun ince bir yoldayım gidiyorum gündüz gece.*` });
    },
};