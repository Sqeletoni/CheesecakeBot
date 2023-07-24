//return targets avatar
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('users avatar')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('target you want the avatar of.')),
    async execute(interaction){
        const user = interaction.options.getUser('target');
        if (user) return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
    },
};