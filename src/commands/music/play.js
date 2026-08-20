const {
  ApplicationCommandOptionType,
  MessageFlags,
  PermissionFlagsBits,
} = require("discord.js");
const { useQueue, QueryType } = require("discord-player");

module.exports = {
  name: "play",
  description: "Play a song from YouTube or a search query.",
  options: [
    {
      name: "query",
      description: "The song title or URL.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  botPermissions: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak],
  callback: async (client, interaction) => {
    if (
      !interaction.inGuild() ||
      !interaction.member ||
      !interaction.member.voice?.channel
    ) {
      await interaction.reply({
        content: "You must be in a voice channel to use this command.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.deferReply();

    const query = interaction.options.getString("query");

    try {
      const query = interaction.options.getString("query");

      let queue = useQueue(interaction.guild.id);

      const track = await client.player
        .search(query, {
          requestedBy: interaction.user,
        })
        .catch(() => null);

      if (!track || track.tracks.length === 0) {
        await interaction.editReply("No results found for that query.");
        return;
      }

      const song = track.tracks[0];

      if (!queue) {
        const newQueue = client.player.nodes.create(interaction.guild, {
          metadata: { channel: interaction.channel },
          volume: 100,
          leaveOnEmpty: true,
          leaveOnEmptyCooldown: 300000,
          leaveOnEnd: true,
          leaveOnEndCooldown: 300000,
        });

        await newQueue.connect(interaction.member.voice.channel);
        await newQueue.play(song);
      } else {
        queue.addTrack(song);
        if (!queue.isPlaying?.()) {
          await queue.play();
        }
      }

      await interaction.editReply(`✅ Added **${song.title}** to the queue.`);
    } catch (error) {
      console.error(error);
      await interaction.editReply("Failed to play the song.");
    }
  },
};
