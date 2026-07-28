const { useQueue } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'Skip the current song.',

    callback: async (client, interaction) => {
        const queue = useQueue(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: '❌ No queue found.',
                flags: 64,
            });
        }

        if (!queue.isPlaying()) {
            return interaction.reply({
                content: '❌ Nothing is currently playing.',
                flags: 64,
            });
        }

        const currentTrack = queue.currentTrack;

        try {
            const success = queue.node.skip();

            if (!success) {
                return interaction.reply({
                    content: '❌ Failed to skip the current song.',
                    flags: 64,
                });
            }

            await interaction.reply({
                content: `⏭️ Skipped **${currentTrack?.title ?? 'Unknown'}**.`,
            });
        } catch (err) {
            console.error('[Skip] Error:', err);

            await interaction.reply({
                content: '❌ Failed to skip playback.',
                flags: 64,
            });
        }
    },
};