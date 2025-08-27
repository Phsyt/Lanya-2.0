const { SlashCommandBuilder } = require('discord.js');
const { loadData } = require('../dataManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bal')
    .setDescription('Checks your current balance.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    const userBalances = loadData();
    
    // Get the user's balance from the data object or default to 0
    const balance = userBalances[userId]?.balance || 0;
    
    await interaction.reply(`Your current balance is $${balance}.`);
  },
};
