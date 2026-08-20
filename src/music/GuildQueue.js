class GuildQueue {
  constructor({ guild, connection, player, textChannel, voiceChannel }) {
    this.guild = guild;

    this.connection = connection;

    this.player = player;

    this.textChannel = textChannel;

    this.voiceChannel = voiceChannel;

    /**
     * Song Queue
     */
    this.songs = [];

    /**
     * Current Song
     */
    this.current = null;

    /**
     * Player State
     */
    this.playing = false;

    this.paused = false;

    /**
     * Settings
     */
    this.volume = 100;

    this.loop = false;

    this.shuffle = false;

    /**
     * Disconnect Timer
     */
    this.timeout = null;
  }

  addSong(song) {
    this.songs.push(song);
  }

  nextSong() {
    return this.songs.shift();
  }

  peek() {
    return this.songs[0];
  }

  clear() {
    this.songs = [];
  }

  isEmpty() {
    return this.songs.length === 0;
  }
}

module.exports = GuildQueue;
