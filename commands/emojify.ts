import {
    CommandInteraction,
    SlashCommandBuilder,
    type Interaction,
} from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("emojify")
        .setDescription("Emojify the message")
        .addStringOption((option) =>
            option
                .setName("message-id")
                .setDescription("The message to emojify")
        ),
    async execute(interaction: CommandInteraction) {
        const messageId = interaction.options.get("message-id")?.value

        if (!messageId) {
            // const lastMsg = interaction.channel?.lastMessage?.content
            const channel = interaction.channel
            const lastMsg = channel?.lastMessage
            await interaction.reply(`"Pongy!" ${lastMsg}`)
            return
        }

        
        await interaction.reply(`"Pongy!" ${messageId}`)
    },
}
