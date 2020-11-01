import * as sqlite3 from "sqlite3";
import { User, Item, Rarity, Case} from "./User";

//sqlite3 Connection
var db = new sqlite3.Database("DiscordDB.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) throw err;

	console.log("Sqlite3 Database Found!")
})

//NOTE UPDATED
/*
    Fetches a User from the Database
*/
export function FetchUserByUID(UserID: string): any {
	return new Promise((resolve: any, reject: any) => {
		db.get(`SELECT * FROM Users WHERE userid='${UserID}'`,(err, row) => {
			if (err) reject(err);

			if(row) {
				var _user: User = new User();

				_user.cash = row.usercash;
				_user.uid = row.userid;

				resolve(_user);

			} else {
				MakeNewUser(UserID).then((user: User) => {
					//Return new made user
					resolve(user);
					
				}).catch((err: any)=> {
					reject(err)
				})
			}
		});
	})
}

//NOTE Updated & Needs to be tested
/*
    Push User Data to the DataBase
*/
export function PushUser(User: User, UserID: string)
{
	return new Promise((resolve: any, reject: any) => {
		//see if user existes
		FetchUserByUID(User.uid).then((res: User) => {
			//User existes
			db.exec(`UPDATE Users SET usercash = ${User.cash} WHERE userid = ${User.uid}`, (err) => {
				if (err) {
					console.log(err)
					reject();
				} else {
					resolve();
				}

			})
	
		}).catch((err: any) => {
			console.log(err);
		})
	})
}

//NOTE UPDATED
function MakeNewUser(UserID: string): any
{
	return new Promise((resolve: any, reject: any) => {
		var _user: User = new User(UserID);
		
		db.exec(`INSERT INTO Users (userid, usercash) VALUES ('${_user.uid}', '${_user.cash}')`, function (err: any) {
			if (err) 
			{
				console.log(err);
				reject(err);
			} else {
				resolve(_user);
			}
		})
	})	
}

//NOTE Updated & need to be tested
export function FetchItemByName(ItemName: string): any
{
	return new Promise((resolve: any, reject: any) => 
	{
		db.get(`SELECT * FROM Items WHERE itemname='${ItemName}'`, function (err: any, result: any) {
			if(err)
			{
				console.log(err)
				reject(err);
			} else {

				FetchRarityByID(result.itemrarityid).then((res: any) => {
					var _item: Item = new Item()

					_item.itemid = result.itemid
					_item.name = result.itemname
					_item.description = result.itemdescription
					_item.rarity = res;
						
					resolve(_item);

				}).catch((err) => {
					console.log(err)
					reject()
				})
				
			}
		
		})
	})
}

//NOTE Updated & Needs tested
export function FetchRarityByID(ID: number)
{
	return new Promise((resolve: any, reject: any) => 
	{
		db.get(`SELECT * FROM Rarities WHERE rarityid = '${ID}'`, function (err: any, row: any) {
			if(err)
			{
				console.log(err)
				reject(err)
			} else {
				if(row)
				{
					var _rarity: Rarity = new Rarity()

					_rarity.name = row.rarityname
					_rarity.id = row.rarityid
					_rarity.RoleRate = row.rarityrolerate
					_rarity.color = row.raritycolor

					resolve(_rarity)
				} else {
					reject(null);
				}
				
			}
		})
	})
}

//NOTE Updated and needs to be tested
export function FetchPlayerInventory(UID: string)
{
	return new Promise((resolve: any, reject: any) => {
		db.all(`SELECT Items.itemname, itemamount FROM UserItems INNER JOIN Items ON UserItems.itemid=Items.itemid WHERE userid=${UID}`, function (err: any, result: any) {
			if(err)
			{
				console.log(err)
				reject();
			} else 
			{
				resolve(result);
			}
		})
	})
}

export function FetchCaseByID(ID: string)
{
	return new Promise((resolve: any, reject: any) => 
	{
		db.get(`SELECT * FROM Cases WHERE casename='${ID}'`, function (err: any, row: any) {
			if(err)
			{
				console.log(err)
				reject(err)
			} else
			{
				if(row)
				{
					var _case: Case = new Case(); 
					_case.id = row.caseid;
					_case.name = row.casename;
					_case.description = row.casedescription;

					resolve(_case);
				} else {
					reject(null);
				}		
			}
		})
	})
}

export function UserHasItem(UserID: string, ItemID: number)
{
	
}

export function GiveUserItem(UserID: string, ItemID: number)
{

}