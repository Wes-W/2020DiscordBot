import { Message } from "discord.js";
import { Command } from "../CommandBase";
import { MessageEmbed } from "discord.js";
import { FetchCaseByID, FetchItemByName, FetchRarityByID } from "../../DBOp";
import { Item, Case } from "../../DBTypes";
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
        
                FetchItemByName(_itemname).then((_item: Item)=> {

                    FetchRarityByID(_item.itemrarityid).then((_rarity) => {
                        try
                        {   //Found
                            const embed = new MessageEmbed()
                                            .setColor(_rarity.raritycolor)
                                            .setTitle("Item Search")
                                            .addFields({name: "Name", value: _item.itemname},{name: "Description", value: _item.itemdescription},{name: "Rarity", value: _rarity.rarityname})
            
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
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err: any) => {
                    console.log(err)
                })

                break;

            case "case":
                var _prelength = (prefix + args[1] + "case").length + 3;

                var _casename = msg.content.slice(_prelength);

                FetchCaseByID(_casename).then((_case: Case) => {
                    try
                    {   //Found
                        const embed = new MessageEmbed()
                                        .setColor("#ff0000")
                                        .setTitle("Case Search")
                                        .addFields({name: "Name", value: _case.casename},{name: "Description", value: _case.casedescription})
        
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