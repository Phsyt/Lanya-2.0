const { SlashCommandBuilder } = require('discord.js');
const { loadData, saveData } = require('../dataManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('Bet an amount on a color in roulette.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('The amount of money to bet.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('color')
        .setDescription('The color to bet on (red or black).')
        .setRequired(true)
        .addChoices(
          { name: 'Red', value: 'red' },
          { name: 'Black', value: 'black' },
        )),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    const betAmount = interaction.options.getInteger('amount');
    const betColor = interaction.options.getString('color');
    let userBalances = loadData();

    // Initialize user data if it doesn't exist
    if (!userBalances[userId]) {
      userBalances[userId] = { balance: 0 };
    }

    // Check if the user has enough money
    if (userBalances[userId].balance < betAmount) {
      await interaction.reply(`You don't have enough money to place that bet. Your balance is $${userBalances[userId].balance}.`);
      return;
    }
    
    // 50/50 chance for red or black
    const rouletteResult = Math.random() < 0.5 ? 'red' : 'black';
    let responseMessage;

    if (betColor === rouletteResult) {
      userBalances[userId].balance += betAmount;
      responseMessage = `🎉 The ball landed on **${rouletteResult}**! You win $${betAmount}. Your new balance is $${userBalances[userId].balance}.`;
    } else {
      userBalances[userId].balance -= betAmount;
      responseMessage = `🎲 The ball landed on **${rouletteResult}**. You lose your bet of $${betAmount}. Your new balance is $${userBalances[userId].balance}.`;
    }

    saveData(userBalances);
    await interaction.reply(responseMessage);
  },
};
