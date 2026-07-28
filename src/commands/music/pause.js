const { useQueue } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'Pause the current song.',

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

        if (queue.node.isPaused()) {
            return interaction.reply({
                content: '⏸️ The player is already paused.',
                flags: 64,
            });
        }

        try {
            queue.node.pause();

            await interaction.reply({
                content: '⏸️ Playback paused.',
            });
        } catch (err) {
            console.error('[Pause] Error:', err);

            await interaction.reply({
                content: '❌ Failed to pause playback.',
                flags: 64,
            });
        }
    },
};