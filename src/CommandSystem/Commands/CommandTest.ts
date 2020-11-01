import { Message} from "discord.js";
import { Command } from "../CommandBase";
import { FetchRarityByID} from "../../DBOp";
import { Rarity } from "../../DBTypes";
import { MessageEmbed} from "discord.js";

export default class CommandTest extends Command 
{
    name: string[] = ["test"];

    run(msg: Message, args: string[])
    {

    }
}