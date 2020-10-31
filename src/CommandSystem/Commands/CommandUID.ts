import { DiscordAPIError } from "discord.js";
import { Message } from "discord.js";
import { Command } from "../CommandBase";


export default class CommandUID extends Command 
{
    name: string[] = ["uid"];

    run(msg: Message)
    {
        msg.reply("Your User ID is "+msg.author.id);
    }
}