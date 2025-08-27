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

    // Check if the user has enough money
    if (!userBalances[userId] || userBalances[userId] < betAmount) {
      await interaction.reply(`You don't have enough money to place that bet. Your balance is $${userBalances[userId] || 0}.`);
      return;
    }
    
    // The "house" has a 50/50 chance with red/black
    const rouletteResult = Math.random() < 0.5 ? 'red' : 'black';
    let responseMessage;

    if (betColor === rouletteResult) {
      userBalances[userId] += betAmount;
      responseMessage = `🎉 The ball landed on **${rouletteResult}**! You win $${betAmount}. Your new balance is $${userBalances[userId]}.`;
    } else {
      userBalances[userId] -= betAmount;
      responseMessage = `🎲 The ball landed on **${rouletteResult}**. You lose your bet of $${betAmount}. Your new balance is $${userBalances[userId]}.`;
    }

    saveData(userBalances);
    await interaction.reply(responseMessage);
  },
};
      
