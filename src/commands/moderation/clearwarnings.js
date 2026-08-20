const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const sql = require("../../database/database");

module.exports = {
  name: "clearwarnings",

  description: "Remove one or all warnings from a member.",

  options: [
    {
      name: "target-user",
      description: "The user whose warnings you want to remove.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },

    {
      name: "warning",
      description: 'The warning ID or "all" to remove all warnings.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.ModerateMembers],

  botPermissions: [],

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;

    const warningInput = interaction.options.get("warning").value.toLowerCase();

    await interaction.deferReply();

    try {
      const targetUser = await interaction.guild.members.fetch(targetUserId);

      if (!targetUser) {
        await interaction.editReply("That user doesn't exist in this server.");
        return;
      }

      if (warningInput === "all") {
        const result = await sql`
                    DELETE FROM warnings
                    WHERE guild_id = ${interaction.guild.id}
                    AND user_id = ${targetUser.id}
                    RETURNING id;
                `;

        if (result.length === 0) {
          await interaction.editReply(`${targetUser} has no warnings.`);
          return;
        }

        await interaction.editReply(
          `Removed **${result.length}** warning(s) from ${targetUser}.`,
        );

        return;
      }

      const warningId = Number(warningInput);

      if (!Number.isSafeInteger(warningId)) {
        await interaction.editReply("Invalid warning ID.");
        return;
      }

      const result = await sql`
                DELETE FROM warnings
                WHERE id = ${warningId}
                AND guild_id = ${interaction.guild.id}
                AND user_id = ${targetUser.id}
                RETURNING id, reason;
            `;

      if (result.length === 0) {
        await interaction.editReply(
          `Warning \`${warningId}\` was not found for ${targetUser}.`,
        );
        return;
      }

      await interaction.editReply(
        `Warning \`${warningId}\` for ${targetUser} has been removed.\n` +
          `**Reason:** ${result[0].reason}`,
      );
    } catch (error) {
      console.error("There was an error when clearing warnings:", error);

      await interaction.editReply(
        "There was an error while clearing this user's warnings.",
      );
    }
  },
};
