import { CommandInteraction, SlashCommandBuilder, type SlashCommandOptionsOnlyBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder|SlashCommandOptionsOnlyBuilder,
    execute: (interaction: CommandInteraction) => Promise<any>
}