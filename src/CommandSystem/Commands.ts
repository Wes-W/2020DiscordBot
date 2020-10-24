import { Command } from "./CommandBase";

export var CommandList: Command[] = [];


//SECTION Commands

//ANCHOR Register Commands Here

//NOTE Command to give use UID
import { default as CommandUID } from "./Commands/CommandUID";
CommandList.push(new CommandUID);

//Note Command to retrive cash for user
import { default as CommandCash } from "./Commands/CommandCash";
CommandList.push(new CommandCash);

//!SECTION
