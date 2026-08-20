const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "invitebot",
  description: "Generate Link for Invite Bot",
  callback: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("INVITE BOT")
      .setDescription(
        "[Click Here for Invite Bot](https://discord.com/oauth2/authorize?client_id=1471292358082429061&permissions=2886224984472694&integration_type=0&scope=bot)",
      )
      .setColor("Random")
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
