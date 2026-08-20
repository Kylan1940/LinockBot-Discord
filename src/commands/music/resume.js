const { useQueue } = require("discord-player");

module.exports = {
  name: "resume",
  description: "Resume the current song.",

  callback: async (client, interaction) => {
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      return interaction.reply({
        content: "❌ No queue found.",
        flags: 64,
      });
    }

    if (!queue.node.isPaused()) {
      return interaction.reply({
        content: "❌ The player is not paused.",
        flags: 64,
      });
    }

    try {
      queue.node.resume();

      await interaction.reply({
        content: "▶️ Playback resumed.",
      });
    } catch (err) {
      console.error("[Resume] Error:", err);

      await interaction.reply({
        content: "❌ Failed to resume playback.",
        flags: 64,
      });
    }
  },
};
