const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("skips to specified song")
        .addNumberOption((option) =>
        option.setName("tracknumber")
            .setDescription("the trackk to skip to")
            .setMinValue(1)
            .setRequired(true)),
    run: async ({ client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue) return await interaction.editReply("There are no songs in the queue")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
                return await interaction.editReply("invalid track number")
        queue.skipTo(trackNum - 1)

        await interaction.editReply(`skipped ahead to song ${trackNum}`)
    }
}