const { SlashCommandBuilder } = require('discord.js');
const { loadData, saveData } = require('../dataManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('job')
    .setDescription('Applies for a job with a 50% chance of success.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    let userBalances = loadData();
    
    // Initialize user's data object if it doesn't exist
    if (!userBalances[userId]) {
      userBalances[userId] = { balance: 0 };
    }
    
    const jobSuccess = Math.random() < 0.5;
    let earnings = 0;
    let responseMessage;

    if (jobSuccess) {
      earnings = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
      userBalances[userId].balance += earnings;
      responseMessage = `Congratulations, you got the job and earned $${earnings}! Your new balance is $${userBalances[userId].balance}.`;
    } else {
      responseMessage = "Unfortunately, you did not get the job. You earned $0.";
    }

    saveData(userBalances);
    await interaction.reply(responseMessage);
  },
};
