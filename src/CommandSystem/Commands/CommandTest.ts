import { Message} from "discord.js";
import { Command } from "../CommandBase";
import { FetchUserByUID } from "../../DBOp";
import { Item, User} from "../../User";
import { MessageEmbed} from "discord.js";

export default class CommandTest extends Command 
{
    name: string[] = ["test"];

    run(msg: Message, args: string[])
    {
        FetchUserByUID(msg.author.id).then((res: User) => {
            msg.reply(res.cash);
        }).catch((err: any) => {
            console.log(err);
        })
    }
}