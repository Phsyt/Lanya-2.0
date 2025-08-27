const { SlashCommandBuilder } = require('discord.js');
const { loadData, saveData } = require('../dataManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Attempt to rob the bank! (20% chance to fail and lose all money)'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    let userBalances = loadData();
    
    // Initialize user data if it doesn't exist
    if (!userBalances[userId]) {
      userBalances[userId] = { balance: 0 };
    }

    const robSuccess = Math.random() > 0.2; // 80% chance of success
    const currentBalance = userBalances[userId].balance;
    let responseMessage;

    if (robSuccess) {
      const stolenAmount = Math.floor(Math.random() * (currentBalance + 1)) + 1;
      userBalances[userId].balance += stolenAmount;
      responseMessage = `💰 You successfully robbed the bank and got away with $${stolenAmount}! Your new balance is $${userBalances[userId].balance}.`;
    } else {
      userBalances[userId].balance = 0;
      responseMessage = `🚨 You failed the robbery and were caught by the police! You lost all your money. Your balance is now $0.`;
    }
    
    saveData(userBalances);
    await interaction.reply(responseMessage);
  },
};
