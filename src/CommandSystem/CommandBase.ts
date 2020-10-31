import { Message } from "discord.js";

export class Command 
{
    name: string[] = ["defaultname"];
    

    run(msg: Message, args: string[])
    {
      console.log("default run command");
    }
}