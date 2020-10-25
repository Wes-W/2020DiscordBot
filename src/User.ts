export class User
{
    uid: string;
    cash: number = 100;
    item: Item[];
    
    constructor(Uid: string)
    {
        this.uid = Uid;
    }
}

export class Item 
{
    itemid: number;
    name: string;
    description: string;
    rarity: Rarity;
}

export class Rarity
{
    id: number;
    name: string;
    RoleRate: number;
    color: string;
}