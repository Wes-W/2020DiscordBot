import { Command } from "./CommandBase";

export var CommandList: Command[] = [];


//SECTION Commands

//ANCHOR Register Commands Here

//NOTE Command to give use UID
import { default as CommandUID } from "./Commands/CommandUID";
CommandList.push(new CommandUID);

//NOTE Command to retrive cash for user
import { default as CommandCash } from "./Commands/CommandCash";
CommandList.push(new CommandCash);

//NOTE Search command
import { default as CommandSearch } from "./Commands/CommandSearch";
CommandList.push(new CommandSearch);

//NOTE Test Command
import { default as CommandTest } from "./Commands/CommandTest";
CommandList.push(new CommandTest);

//!SECTION
