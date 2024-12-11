export interface Identity {
    name: string,
    personalityObj: {
        first: string,
        second: string,
    },
    isFlesh: boolean,
    scars: string,
    idiosyncrasies: string,
}

export interface Job {
    name: string,
    descrip: string,
    details: {
        title: string,
        table: string[],
    },
    skillz: string[],
    extras: string[],
    stats: {
        hp: number,
        strength?: number,
        agility?: number,
        presence?: number,
        credits: string,
        favors: number,
    },
    gear: {
        weapons: number,
        armor: number,
    }
};