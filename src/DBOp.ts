import * as sqlite3 from "sqlite3";
import * as DBTypes from "./DBTypes";


//sqlite3 Connection
var db = new sqlite3.Database("DiscordDB.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) throw err;

	console.log("Sqlite3 Database Found!")
})

/*
    Fetches a User from the Database
*/
export function FetchUserByUID(UserID: string): Promise<DBTypes.User> {
	return new Promise<DBTypes.User>((resolve, reject) => {
		db.get(`SELECT * FROM Users WHERE userid='${UserID}'`,(err, _user: DBTypes.User) => {
			if (err) reject(err);

			if(_user) {
				resolve(_user);

			} else {
				MakeNewUser(UserID).then((user: DBTypes.User) => {
					//Return new made user
					resolve(user);
					
				}).catch((err: any)=> {
					reject(err)
				})
			}
		});
	})
}

/*
    Push User Data to the DataBase
*/
export function PushUser(User: DBTypes.User, UserID: string): Promise<void>
{
	return new Promise<void>((resolve, reject) => {
		//see if user existes
		FetchUserByUID(User.userid).then((res: DBTypes.User) => {
			//User existes
			db.exec(`UPDATE Users SET usercash = ${User.usercash} WHERE userid = ${User.userid}`, (err) => {
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

function MakeNewUser(UserID: string): Promise<DBTypes.User>
{
	return new Promise<DBTypes.User>((resolve, reject) => {
		var _user: DBTypes.User
		_user.userid = UserID
		_user.usercash = 100;
		
		db.exec(`INSERT INTO Users (userid, usercash) VALUES ('${_user.userid}', '${_user.usercash}')`, function (err: any) {
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

export function FetchItemByName(ItemName: string): Promise<DBTypes.Item>
{
	return new Promise<DBTypes.Item>((resolve, reject) => 
	{
		db.get(`SELECT * FROM Items WHERE itemname='${ItemName}'`, function (err: any, _item: DBTypes.Item) {
			if(err)
			{
				console.log(err)
				reject(err);
			} else {	
				if(_item)
				{
					resolve(_item);
				}
			}
		})
	})
}

export function FetchRarityByID(ID: number): Promise<DBTypes.Rarity>
{
	return new Promise<DBTypes.Rarity>((resolve, reject) => 
	{
		db.get(`SELECT * FROM Rarities WHERE rarityid = '${ID}'`, function (err: any, _Rarity: DBTypes.Rarity) {
			if(err)
			{
				console.log(err)
				reject(err)
			} else {
				if(_Rarity)
				{
					resolve(_Rarity)
				} else {
					reject(null);
				}
				
			}
		})
	})
}

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

export function FetchCaseByID(ID: string): Promise<DBTypes.Case>
{
	return new Promise<DBTypes.Case>((resolve, reject) => 
	{
		db.get(`SELECT * FROM Cases WHERE casename='${ID}'`, function (err: any, _case: DBTypes.Case) {
			if(err)
			{
				console.log(err)
				reject(err)
			} else
			{
				if(_case)
				{
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

export function GiveUserItem(UserID: string, ItemID: number, Amount: number)
{

}
