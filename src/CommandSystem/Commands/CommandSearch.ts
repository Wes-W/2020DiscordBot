import { Message } from "discord.js";
import { Command } from "../CommandBase";
import { MessageEmbed } from "discord.js";
import { FetchCaseByID, FetchItemByName } from "../../DBOp";
import { Item, Case } from "../../User";
import { prefix } from "../../index";


export default class CommandSearch extends Command 
{
    name: string[] = ["s","search"];

    run(msg: Message, args: string[])
    {
        switch (args[2]) {
            case "item":
                var _prelength = (prefix + args[1] + "item").length + 3;

                var _itemname = msg.content.slice(_prelength);
        
                FetchItemByName(_itemname).then((res: Item)=> {

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
            case "case":
                var _prelength = (prefix + args[1] + "case").length + 3;

                var _casename = msg.content.slice(_prelength);

                FetchCaseByID(_casename).then((res: Case) => {
                    try
                    {   //Found
                        const embed = new MessageEmbed()
                                        .setColor("#ff0000")
                                        .setTitle("Case Search")
                                        .addFields({name: "Name", value: res.name},{name: "Description", value: res.description})
        
                        msg.reply(embed);
                    } catch(TypeError)
                    {
                        //Not Found
                        const embed2 = new MessageEmbed()
                                        .setColor("#ff0000")
                                        .setTitle("Case Search")
                                        .addFields({name: "Uh Oh!", value: "No Case with that name was found!"})
        
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