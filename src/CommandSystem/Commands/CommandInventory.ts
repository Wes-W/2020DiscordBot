import { Message } from "discord.js";
import { Command } from "../CommandBase";
import { MessageEmbed } from "discord.js";
import { FetchPlayerInventory, FetchItemByName } from "../../DBOp";
import { Item } from "../../User";


export default class CommandInventory extends Command 
{
    name: string[] = ["inventory", "i", "inv"];


    run(msg: Message, args: string[])
    {
        switch (args[2]) {
            case "show":
                FetchPlayerInventory(msg.author.id).then((res: any) => {    
                    var tempmsg: string = "";

                    res.forEach((element: any) => {
                       tempmsg += `${element.name} x${element.Amount} \n`;
                    });
                    
                    msg.reply("```ml\nInventory:\n"+tempmsg+"```")

                }).catch((err) => {
                    console.log("Something went wrong!")
                })

                break;
        
            default:
                msg.reply("Error in commmand")
                break;
        }

        //1st Subcommand is show all

        //ItemName, "x"Amount
    }
}