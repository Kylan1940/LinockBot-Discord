const { ApplicationCommandOptionType, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
    name: "clearchat",
    description: "Menghapus pesan chat",
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
    options: [
        {
            name: "number",
            description: "The number of messages to delete or 'all' to delete all messages.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    callback: async (client, interaction) => {
        const jumlah = interaction.options.getString("number");

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "You don't have permission to manage messages.",
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });

        const channel = interaction.channel;

        // /clearchat all
        if (jumlah.toLowerCase() === "all") {
            let deleted = 0;

            while (true) {
                const messages = await channel.messages.fetch({
                    limit: 100
                });

                if (messages.size === 0) break;

                const result = await channel.bulkDelete(messages, true);

                deleted += result.size;

                if (result.size < 100) break;
            }

            return interaction.editReply(
                `Successfully deleted ${deleted} messages.`
            );
        }


        // /clearchat 50
        const amount = Number(jumlah);

        if (isNaN(amount)) {
            return interaction.editReply(
                "Please enter a valid number or use `all`."
            );
        }

        if (amount < 1 || amount > 1000) {
            return interaction.editReply(
                "The number must be between 1 and 1000."
            );
        }


        let deleted = 0;

        while (deleted < amount) {
            const messages = await channel.messages.fetch({
                limit: Math.min(100, amount - deleted)
            });

            if (messages.size === 0) break;

            const result = await channel.bulkDelete(messages, true);

            deleted += result.size;

            if (result.size === 0) break;
        }

        await interaction.editReply(
            `Successfully deleted ${deleted} messages.`
        );
    }
};