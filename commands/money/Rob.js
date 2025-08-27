const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Attempt to rob the bank! (20% chance to fail and lose all money)'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    let userData = await User.findOne({ userId });
    
    if (!userData) {
      userData = new User({ userId });
    }

    const robSuccess = Math.random() > 0.2; // 80% chance of success
    const currentBalance = userData.balance;
    let responseMessage;

    if (robSuccess) {
      const stolenAmount = Math.floor(Math.random() * (currentBalance + 1)) + 1;
      userData.balance += stolenAmount;
      responseMessage = `💰 You successfully robbed the bank and got away with $${stolenAmount}! Your new balance is $${userData.balance}.`;
    } else {
      userData.balance = 0;
      responseMessage = `🚨 You failed the robbery and were caught by the police! You lost all your money. Your balance is now $0.`;
    }
    
    await userData.save();
    await interaction.reply(responseMessage);
  },
};
