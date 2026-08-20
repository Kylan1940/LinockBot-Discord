const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "lock",
  description: "Lock the current channel.",
  permissionsRequired: [PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.ManageChannels],

  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const everyoneRole = interaction.guild.roles.everyone;

      await interaction.channel.permissionOverwrites.edit(everyoneRole, {
        SendMessages: false,
      });

      await interaction.editReply(`🔒 ${interaction.channel} has been locked.`);
    } catch (error) {
      console.error("There was an error when locking the channel:", error);

      await interaction.editReply(
        "There was an error while locking this channel.",
      );
    }
  },
};
