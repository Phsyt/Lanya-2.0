const { SlashCommandBuilder } = require('discord.js');
let userBalances = {}; // In-memory storage for user balances

module.exports = {
  data: new SlashCommandBuilder()
    .setName('job')
    .setDescription('Applies for a job with a 50% chance of success.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    
    // Initialize user's balance if it doesn't exist
    if (!userBalances[userId]) {
      userBalances[userId] = 0;
    }
    
    const jobSuccess = Math.random() < 0.5;
    let earnings = 0;
    let responseMessage;

    if (jobSuccess) {
      earnings = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
      userBalances[userId] += earnings;
      responseMessage = `Congratulations, you got the job and earned $${earnings}! Your new balance is $${userBalances[userId]}.`;
    } else {
      responseMessage = "Unfortunately, you did not get the job. You earned $0.";
    }

    await interaction.reply(responseMessage);
  },
};

