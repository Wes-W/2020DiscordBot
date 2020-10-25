import { Message } from "discord.js";
import { Command } from "../CommandBase";
import { MessageEmbed} from "discord.js";
import { SearchItemByName } from "../../DBOp";
import { Item } from "../../User";


export default class CommandSearch extends Command 
{
    name: string = "s";

    run(msg: Message, args: string[])
    {
        switch (args[2]) {
            case "item":
                SearchItemByName(args[3]).then((res: Item)=> {

                    //NOTE null == undefined -> true
                    try
                    {   //Found
                        const embed = new MessageEmbed()
                                        .setColor(res.rarity.color)
                                        .setTitle("Item Search")
                                        .addFields({name: "Name", value: res.name},{name: "Description", value: res.description},{name: "Rarity", value: res.rarity.name})
        
                        msg.reply(embed);
                    } catch(TypeError)
                    {
                        //Not Found
                        const embed2 = new MessageEmbed()
                                        .setColor("#ff0000")
                                        .setTitle("Item Search")
                                        .addFields({name: "Uh Oh!", value: "No item with that name was found!"})
        
                        msg.reply(embed2);
                    }     
                }).catch((err: any) => {
                    console.log(err)
                })
                break;
        
            default:
                msg.reply("Error in commmand");
        }
    }
}