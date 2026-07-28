const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'coinflip',
    description: 'Flip a coin',

    callback: async (client, interaction) => {

        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        const embed = new EmbedBuilder()
            .setTitle('🪙 Coin Flip')
            .setColor('Random')
            .addFields(
                {
                    name: 'Result',
                    value: result,
                    inline: false
                }
            )
            .setFooter({
                text: `Flipped by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        await interaction.reply({embeds: [embed]});
    }
};