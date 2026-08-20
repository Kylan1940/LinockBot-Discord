const { useQueue } = require("discord-player");

module.exports = {
  name: "nowplaying",
  description: "Show the currently playing song.",

  callback: async (client, interaction) => {
    const queue = useQueue(interaction.guild.id);

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({
        content: "❌ No music is playing.",
        flags: 64,
      });
    }

    const track = queue.currentTrack;

    const progress = queue.node.createProgressBar({
      timecodes: true,
    });

    await interaction.reply({
      content:
        `🎶 **Now Playing**\n\n` +
        `🎵 **${track.title}**\n` +
        `👤 Requested by: ${track.requestedBy}\n` +
        `⏱️ ${progress}\n` +
        `🔗 ${track.url}`,
    });
  },
};
