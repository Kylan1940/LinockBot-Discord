const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const games = new Map();

module.exports = {
  name: "tictactoe",
  description: "Play Tic Tac Toe against bot",

  callback: async (client, interaction) => {
    if (games.has(interaction.user.id)) {
      return interaction.reply({
        content: "You already have an active game!",
        flags: MessageFlags.Ephemeral,
      });
    }

    const game = {
      board: Array(9).fill("⬜"),
      player: "❌",
      bot: "⭕",
    };

    games.set(interaction.user.id, game);

    const embed = new EmbedBuilder()
      .setTitle("❌ Tic Tac Toe")
      .setDescription(renderBoard(game.board) + "\n\nYour turn!")
      .setColor("Random")
      .setFooter({
        text: `${client.user.username} • Requested by ${interaction.user.tag}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      components: createButtons(),
    });

    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({
      time: 60000,
    });

    collector.on("collect", async (button) => {
      if (button.user.id !== interaction.user.id) {
        return button.reply({
          content: "This is not your game!",
          flags: MessageFlags.Ephemeral,
        });
      }

      const index = Number(button.customId);

      if (game.board[index] !== "⬜") {
        await button.reply({
          content: "❌ That spot is already used!",
          flags: 64,
        });
        return;
      }

      game.board[index] = game.player;

      if (checkWin(game.board, "❌")) {
        return endGame(button, "🎉 You win!", game, collector);
      }

      if (!game.board.includes("⬜")) {
        return endGame(button, "🤝 Draw!", game, collector);
      }

      botMove(game);

      if (checkWin(game.board, "⭕")) {
        return endGame(button, "🤖 Bot wins!", game, collector);
      }

      await button.update({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Tic Tac Toe")
            .setDescription(renderBoard(game.board) + "\n\nYour turn!")
            .setColor("Random")
            .setFooter({
              text: `${client.user.username} • Requested by ${interaction.user.tag}`,
              iconURL: client.user.displayAvatarURL(),
            })
            .setTimestamp(),
        ],
        components: createButtons(),
      });
    });

    collector.on("end", () => {
      games.delete(interaction.user.id);
    });
  },
};

function createButtons() {
  const rows = [];

  for (let i = 0; i < 3; i++) {
    const row = new ActionRowBuilder();

    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;

      row.addComponents(
        new ButtonBuilder()
          .setCustomId(String(index))
          .setLabel("⬜")
          .setStyle(ButtonStyle.Secondary),
      );
    }

    rows.push(row);
  }

  return rows;
}

function renderBoard(board) {
  return `
${board[0]} | ${board[1]} | ${board[2]}
---------
${board[3]} | ${board[4]} | ${board[5]}
---------
${board[6]} | ${board[7]} | ${board[8]}
`;
}

function botMove(game) {
  const available = game.board
    .map((v, i) => (v === "⬜" ? i : null))
    .filter((v) => v !== null);

  const move = available[Math.floor(Math.random() * available.length)];

  game.board[move] = game.bot;
}

function checkWin(board, symbol) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return wins.some((combo) => combo.every((index) => board[index] === symbol));
}

async function endGame(button, text, game, collector) {
  games.delete(button.user.id);
  collector.stop();

  await button.update({
    embeds: [
      new EmbedBuilder()
        .setTitle("❌ Tic Tac Toe")
        .setDescription(renderBoard(game.board) + `\n\n${text}`)
        .setColor("Random"),
    ],
    components: [],
  });
}
