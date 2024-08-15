import { Client, Collection } from 'discord.js'
import type { Command } from '../lib/command'

export class CommandedClient extends Client {
    commands: Collection<string, Command>

    constructor(options: any, commands: Collection<string, Command>) {
        super(options)
        this.commands = commands
    }
}
