import { Message } from "discord.js";
import { Command } from "../CommandBase";
import * as db from "../../DBOp";
import { User } from "../../DBTypes";

export default class CommandCash extends Command 
{
    name: string[] = ["cash"];

    run(msg: Message, args: string[])
    {
        db.FetchUserByUID(msg.author.id).then((user: User) => {
			msg.reply(user.usercash);	
		}).catch((err: any) => {
			console.log(err);
		})
    }
}