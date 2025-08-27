const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User.js');

const COOLDOWN_TIME = 60 * 60 * 1000; // 1 hour

module.exports = {
  data: new SlashCommandBuilder()
    .setName('beg')
    .setDescription('Beg for money with a 1-hour cooldown.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    let userData = await User.findOne({ userId });

    // Initialize user data if it doesn't exist
    if (!userData) {
      userData = new User({ userId });
    }

    const now = Date.now();
    const timeRemaining = COOLDOWN_TIME - (now - userData.lastBeg);

    if (timeRemaining > 0) {
      const minutesRemaining = Math.ceil(timeRemaining / (60 * 1000));
      return interaction.reply({
        content: `You need to wait ${minutesRemaining} minutes before you can beg again.`,
        ephemeral: true
      });
    }

    const earnedAmount = Math.floor(Math.random() * 250) + 1;
    userData.balance += earnedAmount;
    userData.lastBeg = now;

    await userData.save();

    await interaction.reply(`You begged and received $${earnedAmount}! Your new balance is $${userData.balance}.`);
  },
};
