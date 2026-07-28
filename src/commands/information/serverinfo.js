const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Show server information.',

    callback: async (client, interaction) => {
        const guild = interaction.guild;

        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`📊 Server Info`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .addFields(
                {
                    name: '🏷️ Server Name',
                    value: guild.name,
                    inline: true,
                },
                {
                    name: '🆔 Server ID',
                    value: guild.id,
                    inline: true,
                },
                {
                    name: '👑 Owner',
                    value: `${owner.user.tag}`,
                    inline: true,
                },
                {
                    name: '👥 Members',
                    value: `${guild.memberCount}`,
                    inline: true,
                },
                {
                    name: '📅 Created',
                    value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
                    inline: true,
                },
                {
                    name: '💬 Channels',
                    value: `${guild.channels.cache.size}`,
                    inline: true,
                },
                {
                    name: '🎭 Roles',
                    value: `${guild.roles.cache.size}`,
                    inline: true,
                },
                {
                    name: '😀 Emojis',
                    value: `${guild.emojis.cache.size}`,
                    inline: true,
                }
            )
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });
    },
};