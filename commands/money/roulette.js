const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('Bet an amount on a color in roulette.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('The amount of money to bet.')
        .setRequired(true)
        .setMinValue(1)) // Bet must be at least 1
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
    let userData = await User.findOne({ userId });

    if (!userData) {
      userData = new User({ userId });
    }

    if (userData.balance < betAmount) {
      return interaction.reply(`You don't have enough money to place that bet. Your balance is $${userData.balance}.`);
    }
    
    const rouletteResult = Math.random() < 0.5 ? 'red' : 'black';
    let responseMessage;

    if (betColor === rouletteResult) {
      userData.balance += betAmount;
      responseMessage = `🎉 The ball landed on **${rouletteResult}**! You win $${betAmount}. Your new balance is $${userData.balance}.`;
    } else {
      userData.balance -= betAmount;
      responseMessage = `🎲 The ball landed on **${rouletteResult}**. You lose your bet of $${betAmount}. Your new balance is $${userData.balance}.`;
    }

    await userData.save();
    await interaction.reply(responseMessage);
  },
};
    
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
