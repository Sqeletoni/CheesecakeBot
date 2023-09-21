const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows current song")
        .addNumberOption((option) =>
            option.setName("page")
                .setDescription("number of pages of queue")
                .setMinValue(1)
        ),
        run: async ({ client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
            if (!queue || !queue.isPlaying()){
                return await interaction.editReply("no songs in queeu")
            }

            const totalPages = Math.ceil(queue.tracks.length / 10) || 1
            const page = (interaction.options.getNumber("page") || 1) -1

            if (page > totalPages)
                return await interaction.editReply(`page not found, there are only ${totalPages} pages`)

            const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
                return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
            }).join("\n")

            const currentSong = queue.currentTrack

            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("**Currently Playing**\n" +
                            (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "none") +
                            `\n\n**Queue**\n${queueString}`
                        )
                        .setFooter({
                            text: `Page ${page + 1} of ${totalPages}`
                        })
                        .setThumbnail(currentSong.thumbnail)
                ]
            })
        }
}