const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rps",
  description: "Play Rock Paper Scissors",

  options: [
    {
      name: "choice",
      description: "Choose rock, paper, or scissors",
      type: 3,
      required: true,
      choices: [
        {
          name: "Rock",
          value: "rock",
        },
        {
          name: "Paper",
          value: "paper",
        },
        {
          name: "Scissors",
          value: "scissors",
        },
      ],
    },
  ],

  callback: async (client, interaction) => {
    const choices = {
      rock: "🪨 Rock",
      paper: "📄 Paper",
      scissors: "✂️ Scissors",
    };

    const userChoice = interaction.options.getString("choice");

    const botChoice = Object.keys(choices)[Math.floor(Math.random() * 3)];

    let result;

    if (userChoice === botChoice) {
      result = "🤝 Draw!";
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper")
    ) {
      result = "🎉 You Win!";
    } else {
      result = "🤖 Bot Win!";
    }

    const embed = new EmbedBuilder()
      .setTitle("🎮 Rock Paper Scissors")
      .setColor("Random")
      .addFields(
        {
          name: "Your Choice",
          value: choices[userChoice],
          inline: true,
        },
        {
          name: "Bot Choice",
          value: choices[botChoice],
          inline: true,
        },
        {
          name: "Result",
          value: result,
        },
      )
      .setFooter({
        text: `${client.user.username} • Requested by ${interaction.user.tag}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
