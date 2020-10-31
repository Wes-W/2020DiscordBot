import { Message } from "discord.js";
import { Command } from "../CommandBase";
import { FetchItemByName } from "../../DBOp";
import { Item } from "../../User";
import { MessageEmbed} from "discord.js";

export default class CommandTest extends Command 
{
    name: string[] = ["test"];

    run(msg: Message, args: string[])
    {

    }
}