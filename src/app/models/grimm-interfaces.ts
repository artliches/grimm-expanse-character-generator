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
    skillz: {title: string, descrip: string}[],
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

export interface DisplayedJob {
    detail: string,
    skillz: {
      title: string,
      descrip: string,
    }
};