const { EmbedBuilder } = require('discord.js'); 

module.exports = {
  name: 'creator',
  description: 'Linock Bot Creator',
  callback: async (client, interaction) => {
    
    const embed = new EmbedBuilder()
      .setTitle("LINOCK BOT'S CREATOR")
      .setDescription("Discover the creator building and maintaining Linock Bot:")
      .setColor('Random')
      .addFields(
        {
          name: 'YOUTUBE',
          value: 'Watch on [YouTube](https://www.youtube.com/c/Kylan1940)',
          inline: false,
        },
        {
          name: 'GITHUB',
          value: 'View on [Github](https://github.com/Kylan1940)',
          inline: false,
        },
        {
          name: 'OFFICIAL WEBSITE',
          value: 'Visit [Official Website](https://kylan1940.netlify.app)',
          inline: false,
        },
        {
          name: 'SUPPORT THE CREATOR',
          value: 'Support on [Ko-Fi](https://ko-fi.com/kylan1940)',
          inline: false,
        }
      );

    interaction.reply({ embeds: [embed] });
    
  }
}