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
          value: 'kick, ban, unban,timeout',
          inline: false,
        },
        {
          name: '🎮 FUN',
          value: 'coinflip, rps, tictactoe',
          inline: false,
        },
        {
          name: '😂 MEME',
          value: 'meme',
          inline: false,
        },
        {
          name: '🎵 MUSIC',
          value: 'play, pause, resume, skip, stop, queue, nowplaying',
          inline: false,
        },
      );
      

    interaction.reply({ embeds: [embed] });
    
  }
}