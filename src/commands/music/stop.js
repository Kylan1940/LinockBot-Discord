const { useQueue } = require("discord-player");

module.exports = {
  name: "stop",
  description: "Stop playing and clear the queue.",
  callback: async (client, interaction) => {
    const queue = useQueue(interaction.guild.id);

    if (!queue) {
      await interaction.reply({
        content: "❌ No queue found.",
        flags: 64,
      });
      return;
    }

    try {
      queue.delete();

      await interaction.reply({
        content: "👋 **Stopped** - Queue cleared and disconnected.",
      });
    } catch (err) {
      console.error("[Stop] Error:", err);
      await interaction.reply({
        content: "❌ Failed to stop playback.",
        flags: 64,
      });
    }
  },
};
