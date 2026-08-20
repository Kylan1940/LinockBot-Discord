const { MessageFlags } = require("discord.js");
const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName,
    );

    if (!commandObject) return;

    if (!interaction.inGuild() || !interaction.member) {
      return await interaction.reply({
        content: "This command can only be used inside a server.",
        flags: MessageFlags.Ephemeral,
      });
    }

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        return await interaction.reply({
          content: "Only developers are allowed to run this command.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        return await interaction.reply({
          content: "This command cannot be ran here.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions?.has(permission)) {
          return await interaction.reply({
            content: "Not enough permissions.",
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild?.members?.me;

        if (!bot?.permissions?.has(permission)) {
          return await interaction.reply({
            content: "I don't have enough permissions.",
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "There was an error while running this command.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
};
