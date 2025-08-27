const { SlashCommandBuilder } = require('discord.js');
let userBalances = {}; // In-memory storage for user balances

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bal')
    .setDescription('Checks your current balance.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    
    // Get the user's balance or default to 0
    const balance = userBalances[userId] || 0;
    
    await interaction.reply(`Your current balance is $${balance}.`);
  },
};
