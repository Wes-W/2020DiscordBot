import { Message } from "discord.js";

export class Command 
{
    name: string = "defaultname";
    

    run(msg: Message)
    {
      console.log("default run command");
    }
}