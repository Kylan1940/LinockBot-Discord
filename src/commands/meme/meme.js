const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "meme",
    description: "Get a random meme",

    callback: async (client, interaction) => {
        try {
            const { data } = await axios.get("https://meme-api.com/gimme");

            const embed = new EmbedBuilder()
                .setTitle(data.title)
                .setURL(data.postLink)
                .setImage(data.url)
                .setFooter({
                    text: `👍 ${data.ups} | r/${data.subreddit}`
                })
                .setColor("Random");

            await interaction.reply({
                embeds: [embed]
            });

        } catch (err) {
            await interaction.reply({
                content: "Failed to fetch a meme.",
                flags: 64
            });
        }
    }
};