const { EmbedBuilder } = require('discord.js'); 

module.exports = {
  name: 'creator',
  description: 'Linock Bot Creator',
  callback: async (client, interaction) => {
    
    const embed = new EmbedBuilder()
      .setTitle("LINOCK BOT'S CREATOR")
      .setDescription("Who's people behind the scenes?")
      .setColor('Random')
      .addFields(
        {
          name: 'YOUTUBE',
          value: '[Click Here](https://www.youtube.com/c/Kylan1940)',
          inline: true,
        },
        {
          name: 'INSTAGRAM',
          value: '[Click Here](https://instagram.com/nx.kyln)',
          inline: true,
        },
        {
          name: 'TWITTER',
          value: '[Click Here](https://twitter.com/nx_kyln)',
          inline: true,
        },
        {
          name: 'DISCORD COMMUNITY',
          value: '[Click Here](https://dsc.gg/kylancommunity)',
          inline: true,
        },
        {
          name: 'OFFICIAL WEBSITE',
          value: '[Click Here](https://direct.kylan1940.site)',
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
    
  }
}