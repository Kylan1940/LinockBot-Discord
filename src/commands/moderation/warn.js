const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const sql = require("../../database/database");

module.exports = {
  name: "warn",

  description: "Warn a member in this server.",

  options: [
    {
      name: "target-user",
      description: "The user you want to warn.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },

    {
      name: "reason",
      description: "The reason for the warning.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.ModerateMembers],

  botPermissions: [],

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;

    const reason = interaction.options.get("reason").value;

    await interaction.deferReply();

    try {
      const targetUser = await interaction.guild.members.fetch(targetUserId);

      if (!targetUser) {
        await interaction.editReply("That user doesn't exist in this server.");
        return;
      }

      if (targetUser.id === interaction.guild.ownerId) {
        await interaction.editReply("You can't warn the server owner.");
        return;
      }

      if (targetUser.id === interaction.user.id) {
        await interaction.editReply("You can't warn yourself.");
        return;
      }

      if (targetUser.user.bot) {
        await interaction.editReply("You can't warn a bot.");
        return;
      }

      const targetRolePosition = targetUser.roles.highest.position;

      const moderatorRolePosition = interaction.member.roles.highest.position;

      if (targetRolePosition >= moderatorRolePosition) {
        await interaction.editReply(
          "You can't warn a member with the same or higher role than you.",
        );
        return;
      }

      const result = await sql`
                INSERT INTO warnings (
                    guild_id,
                    user_id,
                    moderator_id,
                    reason
                )
                VALUES (
                    ${interaction.guild.id},
                    ${targetUser.id},
                    ${interaction.user.id},
                    ${reason}
                )
                RETURNING id;
            `;

      const warningId = result[0].id;

      const countResult = await sql`
                SELECT COUNT(*)::int AS count
                FROM warnings
                WHERE guild_id = ${interaction.guild.id}
                AND user_id = ${targetUser.id};
            `;

      const warningCount = countResult[0].count;

      await interaction.editReply(
        `${targetUser} has been warned.\n` +
          `**Warning ID:** \`${warningId}\`\n` +
          `**Reason:** ${reason}\n` +
          `**Total Warnings:** ${warningCount}`,
      );
    } catch (error) {
      console.error("There was an error when warning a user:", error);

      await interaction.editReply(
        "There was an error while warning this user.",
      );
    }
  },
};
