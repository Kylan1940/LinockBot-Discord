const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

const sql = require("../../database/database");

module.exports = {
  name: "warnings",

  description: "View warnings for a member.",

  options: [
    {
      name: "target-user",
      description: "The user whose warnings you want to view.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.ModerateMembers],

  botPermissions: [],

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;

    await interaction.deferReply();

    try {
      const targetUser = await interaction.guild.members.fetch(targetUserId);

      if (!targetUser) {
        await interaction.editReply("That user doesn't exist in this server.");
        return;
      }

      const warnings = await sql`
                SELECT
                    id,
                    moderator_id,
                    reason,
                    created_at
                FROM warnings
                WHERE guild_id = ${interaction.guild.id}
                AND user_id = ${targetUser.id}
                ORDER BY created_at ASC;
            `;

      if (warnings.length === 0) {
        await interaction.editReply(`${targetUser} has no warnings.`);
        return;
      }

      const description = warnings
        .map((warning, index) => {
          const timestamp = Math.floor(
            new Date(warning.created_at).getTime() / 1000,
          );

          return [
            `**Warning #${index + 1}**`,
            `> ID: \`${warning.id}\``,
            `> Reason: ${warning.reason}`,
            `> Moderator: <@${warning.moderator_id}>`,
            `> Date: <t:${timestamp}:R>`,
          ].join("\n");
        })
        .join("\n\n");

      const embed = new EmbedBuilder()
        .setTitle(`Warnings for ${targetUser.user.tag}`)
        .setDescription(description)
        .addFields({
          name: "Total Warnings",
          value: `${warnings.length}`,
          inline: true,
        })
        .setThumbnail(targetUser.displayAvatarURL())
        .setTimestamp();

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      console.error("There was an error when fetching warnings:", error);

      await interaction.editReply(
        "There was an error while fetching this user's warnings.",
      );
    }
  },
};
