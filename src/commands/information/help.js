const { EmbedBuilder } = require('discord.js'); 

module.exports = {
  name: 'help',
  description: 'Linock Bot All Commands',
  callback: async (client, interaction) => {
    
    const embed = new EmbedBuilder()
      .setTitle('LINOCK BOT')
      .setDescription('All Commands:')
      .setColor('Random')
      .addFields(
        {
          name: '❕ INFORMATION',
          value: 'help, creator, invitebot',
          inline: false,  
        },
        {
          name: '💻 MODERATION',
          value: 'kick, ban, timeout',
          inline: false,
        }
      );
      

    interaction.reply({ embeds: [embed] });
    
  }
}