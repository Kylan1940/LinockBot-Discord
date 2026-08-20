const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlock the current channel.",
  permissionsRequired: [PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.ManageChannels],

  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const everyoneRole = interaction.guild.roles.everyone;

      await interaction.channel.permissionOverwrites.edit(everyoneRole, {
        SendMessages: null,
      });

      await interaction.editReply(
        `🔓 ${interaction.channel} has been unlocked.`,
      );
    } catch (error) {
      console.error("There was an error when unlocking the channel:", error);

      await interaction.editReply(
        "There was an error while unlocking this channel.",
      );
    }
  },
};
