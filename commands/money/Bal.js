const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bal')
    .setDescription('Checks your current balance.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    const userData = await User.findOne({ userId });
    
    const balance = userData?.balance || 0;
    
    await interaction.reply(`Your current balance is $${balance}.`);
  },
};
