const { Player } = require("discord-player");

const MusicManager = require("./MusicManager");

const player = new Player();

player.extractors.loadDefault();

module.exports = {
  player,

  async play(queue) {
    if (!queue.playing) {
      try {
        await player.play(queue.connection, queue.current);
        queue.playing = true;
        queue.textChannel.send({
          content: `🎵 **Now Playing**\n**${queue.current.title}**`,
        });
      } catch (err) {
        console.error("[Player] Error:", err);
        queue.textChannel.send({
          content: `❌ Failed to play **${queue.current.title}**`,
        });
        queue.nextSong();
        this.play(queue);
      }
    }
  },

  pause(queue) {
    if (queue.playing) {
      player.pause(queue.connection);
      queue.paused = true;
    }
  },

  resume(queue) {
    if (queue.paused) {
      player.resume(queue.connection);
      queue.paused = false;
    }
  },

  skip(queue) {
    player.stop(queue.connection);
    queue.nextSong();
    if (!queue.isEmpty()) {
      this.play(queue);
    }
  },

  stop(queue) {
    player.stop(queue.connection);
    queue.clear();
    MusicManager.delete(queue.guild.id);
    queue.playing = false;
    queue.current = null;
    queue.textChannel.send({
      content: "👋 Disconnected.",
    });
  },
};
