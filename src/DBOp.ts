import { createConnection } from "mysql";
import { User } from "./User";

//mysql Conneciton
var con = createConnection({
	host: "localhost",
	port: 3308,
    user: "discord",
    password: "ah+upAZ4D.,g/jc+s65sz:YX<7hMQjm6"
});

/*
    Fetches a User from the Database
*/
export function fetchUserByUID(UserID: string): any {
    return new Promise((resolve: any, reject: any) => {
		con.query(`SELECT * FROM discordDB.Users WHERE uid='${UserID}'`, function (err: any, result: any) {
			if (err) throw err;
            
            //Catch
			try {

                //Check to see if our user matches
				if(result[0].uid === UserID)
				{
					var _user: User = new User(UserID);
					
					_user.uid = result[0].uid;
					_user.cash = result[0].cash;

					resolve(_user);
                }
                

			} catch (TypeError) {
				//Error resolve false
				//Make new user

				MakeNewUser(UserID).then((user: User) => {
					//Return new made user
					resolve(user);
					
				}).catch((err: any)=> {
					reject(err)
				})
			}
		})
	});
}

/*
    Push User Data to the DataBase
*/
export function PushUser(User: User, UserID: string)
{
	//Check if use existes 
	return new Promise((resolve: any, reject: any) => {
		//Select to see if use existes
		con.query(`SELECT uid FROM discordDB.Users WHERE uid='${UserID}'`, function (err: any, result: any) {
			if (err) throw err;

			try {
				if(result[0].uid === UserID)
				{
					//Already a user
					con.query(`UPDATE discordDB.Users SET cash = '${User.cash}' WHERE (uid = '${User.uid}')`, function (err: any, result: any) {
						if (err) throw err;
						return true;
					})
		
				}
			} catch (any) {
				console.log(err);
			}
		})
	})
}


function MakeNewUser(UserID: string): any
{
	return new Promise((resolve: any, reject: any) => {
		var user: User = new User(UserID);
		
		con.query(`INSERT INTO discordDB.Users (uid, Cash) VALUES ('${user.uid}', '${user.cash}')`, function (err: any, result: any) {
				if (err) 
				{
					console.log(err);
					reject(err);
				} else {
					resolve(user);
				}

				
		})
	})	
}