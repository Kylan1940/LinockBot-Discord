const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Unbans a user from this server.',
  options: [
    {
      name: 'target-user',
      description: 'The user ID you want to unban.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason you want to unban.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],

  callback: async (client, interaction) => {

    const targetUserId = interaction.options.get('target-user').value;
    const reason =
      interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUserRolePosition = targetUser.roles.highest.position; 
    const requestUserRolePosition = interaction.member.roles.highest.position; 
    const botRolePosition = interaction.guild.members.me.roles.highest.position; 

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't ban that user because they have the same/higher role than you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't ban that user because they have the same/higher role than me."
      );
      return;
    }

    // const bannedUser = await interaction.guild.bans
    //   .fetch(targetUserId)
    //   .catch(() => null);

    // if (!bannedUser) {
    //   await interaction.editReply("That user is not banned.");
    //   return;
    // }

    try {
      await interaction.guild.members.unban(targetUserId, reason);

      await interaction.editReply(
        `User <@${targetUserId}> was unbanned.\nReason: ${reason}`
      );

    } catch (error) {
      console.log(`There was an error when unbanning: ${error}`);
      await interaction.editReply("There was an error while unbanning this user.");
    }
  },
};
