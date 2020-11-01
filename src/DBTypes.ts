export interface User {
    userid: string
    usercash: number
}

export interface Item {
    itemid: number
    itemname: string
    itemdescription: string
    itemrarityid: number
}

export interface Rarity {
    rarityid: number
    rarityname: string
    rarityrolerate: number
    raritycolor: string
}

export interface Case {
    caseid: number
    casename: string
    casedescription: string
}