export interface Identity {
    name: string,
    personalityObj: {
        first: string,
        second: string,
    },
    isFlesh: boolean,
    scars: string[],
    idiosyncrasies: string,
}

export interface TitleDescripObj {
    title: string, 
    descrip: string,
};

export interface Job {
    name: string,
    descrip: string,
    details: {
        title: string,
        table: string[],
    },
    skillz?: TitleDescripObj[],
    skillzTable?: {
        title: string,
        descrip: string,
        table: TitleDescripObj[]
    },
    extras: string[],
    stats: {
        hp: number,
        strength?: number,
        agility?: number,
        presence?: number,
        tech?: number,
        credits: string,
        favors: number,
    },
    gear: {
        weapons: number,
        armor: number,
        tributesObj?: {
            type: string,
            amount: number,
        }[],
        wurms?: number,
    },
    isBot: boolean,
};

export interface DisplayedJob {
    detail: string,
    skillz: {
      title: string,
      descrip: string,
    }
};

export interface AbilityObj {
    name: string,
    descrip: string,
    value: number,
    rolledDice: number[],
    modifier: number,
};

export interface TributesObj {
    name: string,
    descrip: string,
    type: string,
    index: number,
};

export interface EquipmentObj {
    starting: string[],
    weapon: string,
    armor: string,
    tributesArray: TributesObj[];
    wurmsArray: string[];
};