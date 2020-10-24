import { readFile } from "fs";
import * as Discord from  "discord.js";
import { CommandList } from "./CommandSystem/Commands";

const client = new Discord.Client();

//ANCHOR Config
var prefix: string = ".b";


//NOTE: Start of Discord Bot
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	console.log("Commands Registered: "+CommandList.length);

})

client.on('message', msg => {
	//Check if its a bot
	if(!msg.author.bot)
	{
		var input = msg.content.split(" ");

		//NOTE: Command Selector 
		if(input[0] == prefix)
		{
			CommandList.forEach((cmd) => {
				if(cmd.name == input[1])
				{
					cmd.run(msg);
				}
			})
		}
	
	}
})

//Read key.txt for discord bot key
readFile("./key.txt", (err, data) => {
	client.login(data.toString());
});

