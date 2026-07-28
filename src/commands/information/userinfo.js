const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Show user information.',

    options: [
        {
            name: 'user',
            description: 'User to check.',
            type: 6,
            required: false,
        },
    ],

    callback: async (client, interaction) => {
        const user =
            interaction.options.getUser('user') || interaction.user;

        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(() => null);

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`👤 User Info`)
            .setThumbnail(user.displayAvatarURL({ size: 1024 }))
            .addFields(
                {
                    name: 'Username',
                    value: user.tag,
                    inline: true,
                },
                {
                    name: 'User ID',
                    value: user.id,
                    inline: true,
                },
                {
                    name: 'Account Created',
                    value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
                    inline: true,
                },
                {
                    name: 'Joined Server',
                    value: member
                        ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
                        : 'Not in server',
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: member
                        ? member.roles.cache
                            .filter(role => role.name !== '@everyone')
                            .map(role => role.toString())
                            .join(', ') || 'No roles'
                        : 'None',
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