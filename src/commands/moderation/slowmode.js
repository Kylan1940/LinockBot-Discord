const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "Set the slowmode delay for the current channel.",
  options: [
    {
      name: "seconds",
      description: "Slowmode delay in seconds. Use 0 to disable slowmode.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      minValue: 0,
      maxValue: 21600,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.ManageChannels],

  callback: async (client, interaction) => {
    const seconds = interaction.options.getInteger("seconds");

    await interaction.deferReply();

    try {
      await interaction.channel.setRateLimitPerUser(seconds);

      if (seconds === 0) {
        await interaction.editReply(
          `Slowmode has been disabled in ${interaction.channel}.`,
        );

        return;
      }

      await interaction.editReply(
        `Slowmode has been set to **${seconds} second${seconds === 1 ? "" : "s"}** in ${interaction.channel}.`,
      );
    } catch (error) {
      console.error("There was an error when setting slowmode:", error);

      await interaction.editReply("There was an error while setting slowmode.");
    }
  },
};
