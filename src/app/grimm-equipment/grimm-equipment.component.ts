import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { EquipmentObj, Job, TributesObj } from '../models/grimm-interfaces';
import { ARMORS, ENCRYPTED_TRIBUTES, HACKED_TRIBUTES, STARTING_EQUIPMENT, WEAPONS, WURMS } from '../assets/fonts/grimm.constants';

@Component({
  selector: 'app-grimm-equipment',
  imports: [],
  templateUrl: './grimm-equipment.component.html',
  styleUrl: './grimm-equipment.component.scss'
})
export class GrimmEquipmentComponent implements OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() currentJob: Job = {} as Job;
  skipSecondEquipment: string[] = [
    'The Lost Technomaniac',
    'The Devout',
    'The Harvester',
  ];
  equipmentObj: EquipmentObj = {
    starting: [],
    weapon: '',
    armor: '',
    tributesArray: [],
    wurmsArray: [],
  };

  trimmedWeaponTable: string[] = [];
  trimmedArmorTable: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes['currentJob']) {
        this.rerollAll();
      }
  }

  rerollAll() {
    this.shuffleTables();

    this.equipmentObj.armor = '';
    this.equipmentObj.weapon = '';
    this.equipmentObj.starting = [];
    this.equipmentObj.tributesArray = [];
    this.equipmentObj.wurmsArray = [];

    this.equipmentObj.starting.push(STARTING_EQUIPMENT[0][0]);
    if (!this.skipSecondEquipment.includes(this.currentJob.name)) {
      this.equipmentObj.starting.push(STARTING_EQUIPMENT[1][0]);
    }
    if (this.currentJob.name !== 'The Harvester') {
      this.equipmentObj.starting.push(STARTING_EQUIPMENT[2][0]);
    }
    this.equipmentObj.weapon = this.trimmedWeaponTable[0];
    this.equipmentObj.armor = this.trimmedArmorTable[0];

    //check and get tributes
    this.equipmentObj.starting.forEach((equip, index) => {
      if (equip.includes('Tribute')) {
        const tributeType = equip.slice(equip.indexOf('>') + 1, equip.indexOf('Tribute'));
        this.getTributes(tributeType, index);
      }
    });

    if (this.currentJob.gear.tributesObj) {
      let tributeIndex = 3;
      this.currentJob.gear.tributesObj.forEach(tribute => {
        if (tribute.type === 'random') {
          tribute.type = this.random.getRandomNumber(1, 2) === 1 ? 'Hacked' : 'Encrypted';
        }
        this.getTributes(tribute.type, tributeIndex);
        tributeIndex++;
      });
    }

    if (this.currentJob.gear.wurms) {
      this.random.shuffleArray(WURMS);
      for (let i = 0; i < this.currentJob.gear.wurms; i++) {
        this.equipmentObj.wurmsArray.push(WURMS[i]);
      }
    }
  }

  private shuffleTables() {
    STARTING_EQUIPMENT.forEach(equipArray => this.random.shuffleArray(equipArray));

    this.random.shuffleArray(HACKED_TRIBUTES);
    this.random.shuffleArray(ENCRYPTED_TRIBUTES);

    this.trimmedWeaponTable = JSON.parse(JSON.stringify(WEAPONS));
    let numberOfWeaponsToRemove = WEAPONS.length - this.currentJob.gear.weapons;
    while (numberOfWeaponsToRemove--) {
      this.trimmedWeaponTable.pop();
    };
    this.random.shuffleArray(this.trimmedWeaponTable);

    this.trimmedArmorTable = JSON.parse(JSON.stringify(ARMORS));
    let numberOfArmorsToRemove = ARMORS.length - this.currentJob.gear.armor;
    while (numberOfArmorsToRemove--) {
      this.trimmedArmorTable.pop();
    };
    this.random.shuffleArray(this.trimmedArmorTable);

  }

  rerollAllTributes() {
    this.equipmentObj.tributesArray.forEach(tribute => this.getTributes(tribute.type, tribute.index, true));
  }

  getTributes(tributeType: string, index: number, replaceTribute?: boolean) {
    const tributeArray = tributeType.trim() === 'Hacked' ? HACKED_TRIBUTES : ENCRYPTED_TRIBUTES;
    if (this.equipmentObj.tributesArray.length === 0) {
      const newTribute: TributesObj = {
        name: tributeArray[0].name,
        descrip: tributeArray[0].descrip,
        type: tributeType,
        index: index
      };

      this.equipmentObj.tributesArray.push(newTribute);
    } else if (replaceTribute) {
      const indexesToSkip: number[] = [];
      const currentTributeIndex = this.equipmentObj.tributesArray.findIndex(tribute => tribute.index === index);
      let newIndex = tributeArray.findIndex(x => x.name === this.equipmentObj.tributesArray[currentTributeIndex].name);

      this.equipmentObj.tributesArray.forEach(tribute => {
        indexesToSkip.push(tributeArray.findIndex(x => x.name === tribute.name));
      });

      if (newIndex + 1 >= tributeArray.length - 1) {
        newIndex = -1;
      }

      do {
        newIndex++;
      } while (indexesToSkip.includes(newIndex));

      const newTribute: TributesObj = {
        name: tributeArray[newIndex].name,
        descrip: tributeArray[newIndex].descrip,
        type: tributeType,
        index: index,
      };

      this.equipmentObj.tributesArray[currentTributeIndex] = newTribute;

    } else if (this.equipmentObj.tributesArray.length > 0) {
      const indexesToSkip: number[] = [];
      let newIndex = -1;

      this.equipmentObj.tributesArray.forEach(tribute => {
        indexesToSkip.push(tributeArray.findIndex(x => x.name === tribute.name));
      });

      do {
        newIndex++;
      } while (indexesToSkip.includes(newIndex));

      const newTribute: TributesObj = {
        name: tributeArray[newIndex].name,
        descrip: tributeArray[newIndex].descrip,
        type: tributeType,
        index: index,
      };

      this.equipmentObj.tributesArray.push(newTribute);
    }
  }

  rerollStartingEquipment(index: number) {
    //check if we need to remove a tribute
    if (this.equipmentObj.starting[index].includes('Tribute')) {
      const tributeToRemove = this.equipmentObj.tributesArray.findIndex(tribute => tribute.index === index);
      this.equipmentObj.tributesArray.splice(tributeToRemove, 1);
    }

    const startingEquipArray = STARTING_EQUIPMENT[index];
    let newIndex = startingEquipArray.indexOf(this.equipmentObj.starting[index]);

    if (newIndex + 1 === startingEquipArray.length) {
      newIndex = 0;
    } else {
      newIndex ++;
    }

    this.equipmentObj.starting[index] = startingEquipArray[newIndex];

    //check if we need to add a tribute
    if (this.equipmentObj.starting[index].includes('Tribute')) {
      const stringToParse = this.equipmentObj.starting[index];
      const tributeType = stringToParse.slice(stringToParse.indexOf('>') + 1, stringToParse.indexOf('Tribute'));

      this.getTributes(tributeType, index);
    }
  }

  rerollWeapon() {
    let newIndex = this.trimmedWeaponTable.indexOf(this.equipmentObj.weapon);

    if (newIndex + 1 === this.trimmedWeaponTable.length) {
      newIndex = 0;
    } else {
      newIndex ++;
    }

    this.equipmentObj.weapon = this.trimmedWeaponTable[newIndex];
  }

  rerollArmor() {
    let newIndex = this.trimmedArmorTable.indexOf(this.equipmentObj.armor);

    if (newIndex + 1 === this.trimmedArmorTable.length) {
      newIndex = 0;
    } else {
      newIndex ++;
    }

    this.equipmentObj.armor = this.trimmedArmorTable[newIndex];
  }

  rerollAllWurms() {
    for (let i = 0; i < this.equipmentObj.wurmsArray.length; i++) {
      this.rerollWurm(i);
    }
  }

  rerollWurm(index: number) {
    let newIndex = WURMS.indexOf(this.equipmentObj.wurmsArray[index]);
    let wurmsIndexToSkip: number[] = [];

    this.equipmentObj.wurmsArray.forEach(wurm => {
      wurmsIndexToSkip.push(WURMS.indexOf(wurm));
    });

    do {
      newIndex ++;
    } while (wurmsIndexToSkip.includes(newIndex));

    if (newIndex === WURMS.length) {
      newIndex = 0;
    }

    this.equipmentObj.wurmsArray[index] = WURMS[newIndex];
  }
}
