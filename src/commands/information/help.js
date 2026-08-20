const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all Linock Bot commands.",

  callback: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("🤖 Linock Bot - Help Menu")
      .setDescription(
        "List of available commands.\n" +
          "Use `/command` to execute a command.",
      )
      .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
      .addFields(
        {
          name: "❕ INFORMATION",
          value:
            "`/help` - Show this menu\n" +
            "`/creator` - Bot creator information\n" +
            "`/invitebot` - Invite Linock Bot\n" +
            "`/serverinfo` - Server information\n" +
            "`/userinfo` - User information",
          inline: false,
        },
        {
          name: "🛡️ MODERATION",
          value:
            "`/kick` - Kick a member\n" +
            "`/ban` - Ban a member\n" +
            "`/unban` - Unban a member\n" +
            "`/timeout` - Timeout a member\n" +
            "`/warn` - Warn a member\n" +
            "`/warnings` - View member warnings\n" +
            "`/clearwarnings` - Clear member warnings\n" +
            "`/lock` - Clear member warnings\n" +
            "`/unlock` - Unlock channel\n" +
            "`/clearchat` - Delete messages\n" +
            "`/slowmode` - Set channel slowmode",
          inline: false,
        },
        {
          name: "🎮 FUN",
          value:
            "`/coinflip` - Flip a coin\n" +
            "`/rps` - Rock Paper Scissors\n" +
            "`/tictactoe` - Play Tic Tac Toe\n" +
            "`/meme` - Get random memes",
          inline: false,
        },
        {
          name: "🎵 MUSIC",
          value:
            "`/play` - Play music\n" +
            "`/pause` - Pause music\n" +
            "`/resume` - Resume music\n" +
            "`/skip` - Skip current song\n" +
            "`/stop` - Stop music\n" +
            "`/queue` - Show queue\n" +
            "`/nowplaying` - Current song",
          inline: false,
        },
      )
      .setFooter({
        text: `${client.user.username} • Requested by ${interaction.user.tag}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });
  },
};
