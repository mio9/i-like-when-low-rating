import { Ollama } from "./lib/ollama";
import { REST, Routes } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';

const env = {
    discordToken: process.env.DISCORD_TOKEN as string,
    clientId: process.env.DISCORD_CLIENT_ID as string
}

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(env.discordToken);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(env.clientId), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(env.discordToken);

const ollama = new Ollama({
    // model: "wizard-vicuna-uncensored:7b",
    model: "llama3.1:8b",
    // system: "Insert emojis in between words for following sentence, answer with result only.\n Input:\n",
    system: "Add several emojis between each words. Ass as much emoji as necessary. There can be 2 or more emojis in between words. Answer with result only",
    options : {
        mirostat: 2
    }
})

const result = await ollama.generate("")

console.log(result.response)