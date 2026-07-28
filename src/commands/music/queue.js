const { useQueue } = require('discord-player');

module.exports = {
    name: 'queue',
    description: 'Show the current music queue.',

    callback: async (client, interaction) => {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: '❌ No music is playing.',
                flags: 64,
            });
        }

        const currentTrack = queue.currentTrack;
        const tracks = queue.tracks.toArray();

        let message = `🎵 **Now Playing:**\n> ${currentTrack.title}\n\n`;

        if (tracks.length === 0) {
            message += '📭 Queue is empty.';
        } else {
            message += `📃 **Queue (${tracks.length} songs):**\n`;

            tracks.slice(0, 10).forEach((track, index) => {
                message += `${index + 1}. **${track.title}**\n`;
            });

            if (tracks.length > 10) {
                message += `\n...and ${tracks.length - 10} more songs.`;
            }
        }

        await interaction.reply({
            content: message,
        });
    },
};