const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'creator',
    description: 'Show Linock Bot creator information.',

    callback: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('👨‍💻 Linock Bot Creator')
            .setDescription(
                'Meet the developer behind **Linock Bot**.\n' +
                'Building, maintaining, and improving the bot with new features.'
            )
            .setThumbnail('https://kylan1940.netlify.app/favicon.ico')
            .addFields(
                {
                    name: '🎥 YouTube',
                    value: '[Kylan1940](https://www.youtube.com/c/Kylan1940)',
                    inline: true,
                },
                {
                    name: '💻 GitHub',
                    value: '[Kylan1940](https://github.com/Kylan1940)',
                    inline: true,
                },
                {
                    name: '🌐 Official Website',
                    value: '[kylan1940.netlify.app](https://kylan1940.netlify.app)',
                    inline: true,
                },
                {
                    name: '☕ Support Creator',
                    value: '[Ko-fi](https://ko-fi.com/kylan1940)',
                    inline: true,
                }
            )
            .setFooter({
                text: `Linock Bot`,
                iconURL: client.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};