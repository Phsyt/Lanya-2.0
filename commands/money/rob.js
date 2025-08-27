const { SlashCommandBuilder } = require('discord.js');
const { loadData, saveData } = require('../dataManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Attempt to rob the bank for a chance at more money! (20% chance to lose everything!)'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    let userBalances = loadData();
    
    // Initialize user balance if it doesn't exist
    if (!userBalances[userId]) {
      userBalances[userId] = 0;
    }

    const robSuccess = Math.random() > 0.2; // 80% chance of success
    const currentBalance = userBalances[userId];
    let responseMessage;

    if (robSuccess) {
      const stolenAmount = Math.floor(Math.random() * (currentBalance + 1)) + 1; // Example: Steal up to current balance
      userBalances[userId] += stolenAmount;
      responseMessage = `💰 You successfully robbed the bank and got away with $${stolenAmount}! Your new balance is $${userBalances[userId]}.`;
    } else {
      userBalances[userId] = 0; // Fail and lose all money
      responseMessage = `🚨 You failed the robbery and were caught by the police! You lost all your money. Your balance is now $0.`;
    }
    
    saveData(userBalances);
    await interaction.reply(responseMessage);
  },
};
