import { Message } from "discord.js";
import { Command } from "../CommandBase";
import * as db from "../../DBOp";
import { User } from "../../User";

export default class CommandCash extends Command 
{
    name: string = "cash";

    run(msg: Message, args: string[])
    {
        db.fetchUserByUID(msg.author.id).then((user: User) => {
			msg.reply(user.cash);	
		}).catch((err: any) => {
			console.log(err);
		})
    }
}