import { Ollama } from "./lib/ollama"
import {
    Collection,
    REST,
    Routes,
    type RESTPostAPIApplicationGuildCommandsJSONBody,
} from "discord.js"
import { Client, GatewayIntentBits } from "discord.js"

import pingCommand from "./commands/ping"
import emojifyCommand from "./commands/emojify"
import { CommandedClient } from "./types/commandClient"
import type { Command } from "./lib/command"

const env = {
    discordToken: process.env.DISCORD_TOKEN as string,
    clientId: process.env.DISCORD_CLIENT_ID as string,
}
const args = process.argv.slice(2)
const guildId = "1219700027312701581"

const rest = new REST({ version: "10" }).setToken(env.discordToken)

const commands = new Collection<string, Command>()

const client = new CommandedClient(
    { intents: [GatewayIntentBits.Guilds] },
    commands
)

// register commands
client.commands.set("ping", pingCommand)
client.commands.set("emojify", emojifyCommand)

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const ranCommand = client.commands.get(interaction.commandName)

    if (!ranCommand) {
        await interaction.reply("Command not found")
        return
    }

    const result = await ranCommand.execute(interaction)
    console.log(result)
})

console.log(args)
// refresh commands onto discord if -r is passed
if (args[0] === "-r") {
    try {
        console.log("Started refreshing application (/) commands.")

        const restCommands: RESTPostAPIApplicationGuildCommandsJSONBody[] = []

        commands.forEach((com) => {
            restCommands.push(com.data.toJSON())
        })

        // console.log(restCommands)

        await rest.put(Routes.applicationGuildCommands(env.clientId, guildId), {
            body: restCommands,
        })

        console.log("Successfully reloaded application (/) commands.")
    } catch (error) {
        console.error(error)
    }
}

client.login(env.discordToken)

const ollama = new Ollama({
    // model: "wizard-vicuna-uncensored:7b",
    model: "llama3.1:8b",
    // system: "Insert emojis in between words for following sentence, answer with result only.\n Input:\n",
    system: "Add several emojis between each words. Ass as much emoji as necessary. There can be 2 or more emojis in between words. Answer with result only",
    options: {
        mirostat: 2,
    },
})

const result = await ollama.generate("")

console.log(result.response)
