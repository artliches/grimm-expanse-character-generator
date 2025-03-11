import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { AbilityObj, Job } from '../models/grimm-interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grimm-abilities',
  imports: [CommonModule],
  templateUrl: './grimm-abilities.component.html',
  styleUrl: './grimm-abilities.component.scss'
})
export class GrimmAbilitiesComponent implements OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() currentJob: Job = {} as Job;

  showRolledStats: boolean = false;
  abilitiesObj: AbilityObj[] = [
    {
      name: 'agility',
      descrip: 'Defend, balance, float, swim, flee',
      value: 0,
      rolledDice: [],
      modifier: 0,
    },
    {
      name: 'presence',
      descrip: 'Perceive, aim, charm, wield Neuromancy',
      value: 0,
      rolledDice: [],
      modifier: 0,
    },
    {
      name: 'strength',
      descrip: 'Crush, lift, strike, grapple',
      value: 0,
      rolledDice: [],
      modifier: 0,
    },
    {
      name: 'tech',
      descrip: 'Hack systems, use alien technology, pilot',
      value: 0,
      rolledDice: [],
      modifier: 0,
    },
    {
      name: 'toughness',
      descrip: 'Resist poison/cold/heat, survive falling',
      value: 0,
      rolledDice: [],
      modifier: 0,
    }
  ];

  statsObj: any = [
    {
      name: 'hp',
      descrip: `
        <div>0: <span class="underline">Broken</span></div>
        <div>Negative: <strong>SUPER DEAD</strong></div>
      `,
      value: 0,
      rolledValue: 0,
      modifier: 0,
    },
    {
      name: 'credits',
      descrip: 'Spend it or be spaced with it',
      value: '',
      rolledValue: '',
      modifier: 0
    },
    {
      name: 'favors',
      descrip: 'Fortune favors the bold',
      value: '',
      dieSize: 0
    },
    {
      name: 'neuromancy',
      descrip: 'Activate strange Tributes',
      value: 0,
      rolledValue: 0,
      modifier: 0,
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes['currentJob']) {
        this.rerollAll();
      }
  }

  rerollAll() {
    this.rerollAllAbilities();

    this.statsObj.forEach((stat: any) => {     
      if (stat.name === 'hp') {
        this.rerollHP(stat);
      }
      if (stat.name === 'credits') {
        this.rerollCredits(stat);
      }
      if (stat.name === 'favors') {
        this.rerollFavors(stat);
      }
      if (stat.name === 'neuromancy') {
        this.rerollNP(stat);
      }
    });
  }

  routeStatReroll(statName: string) {
    const stat = this.statsObj.find((stat: { name: string; }) => stat.name === statName);
    switch (true) {
      case statName === 'hp': {
        this.rerollHP(stat);
        break;
      }
      case statName === 'credits': {
        this.rerollCredits(stat);
        break;
      }
      case statName === 'favors': {
        this.rerollFavors(stat);
        break;
      }
      case statName === 'neuromancy': {
        this.rerollNP(stat);
        break;
      }
    }
  }

  rerollNP(stat: any) {
    const presenceIndex = this.abilitiesObj.findIndex(ability => ability.name === 'presence');
    const presenceVal = this.abilitiesObj[presenceIndex].value;

    stat.value = 0;
    stat.rolledValue = 0;

    stat.modifier = presenceVal;
    stat.rolledValue = this.random.getRandomNumber(1, 4);
    stat.value = stat.rolledValue + stat.modifier > 0 ? stat.rolledValue + stat.modifier : 1;
  }

  rerollFavors(stat: any) {
    stat.value = '';
    stat.dieSize = 0;

    stat.dieSize = this.currentJob.stats.favors;
    stat.value = `${this.random.getRandomNumber(1, this.currentJob.stats.favors)} (d${stat.dieSize})`;
  }

  rerollCredits(stat: any) {
    stat.value = 0;
    stat.rolledValue = 0;

    const creditsToParse = this.currentJob.stats.credits;
    const numDie = Number(creditsToParse.slice(0, creditsToParse.indexOf('d')));
    const dieSize = Number(creditsToParse.slice(creditsToParse.indexOf('d') + 1, creditsToParse.indexOf('x')));
    const multiplier = Number(creditsToParse.slice(creditsToParse.indexOf('x') + 1));

    const roll = this.random.rollMultipleDie(numDie, dieSize);
    stat.rolledValue = `${roll} x ${multiplier}`;
    stat.value = `${roll * multiplier}CR`;
  }

  rerollHP(stat: any) {
    stat.value = 0;
    stat.rolledValue = 0;
    stat.modifier = 0;

    stat.modifier = this.abilitiesObj.find(ability => ability.name === 'toughness')!.value;
    stat.rolledValue = this.random.getRandomNumber(1, this.currentJob.stats.hp);
    stat.value = stat.rolledValue + stat.modifier > 0 ? stat.rolledValue + stat.modifier : 1;
  }

  rerollAbility(abilityName: string) {
    let ability = this.abilitiesObj.find(ability => ability.name === abilityName);
    
    ability!.rolledDice = [];
    for (let i = 0; i < 3; i++) {
      ability!.rolledDice.push(this.random.getRandomNumber(1, 6));
    }

    let rawNumber = ability!.rolledDice.reduce(
      (accumulator, currentValue) => accumulator + currentValue, ability!.modifier
    );

    this.convertRawNumberToAbilityMod(rawNumber, ability!);

    if (abilityName === 'toughness') {
      let hpObj = this.statsObj.find((stat: { name: string; }) => stat.name === 'hp');
      hpObj.modifier = ability!.value;
      hpObj.value = Number(hpObj.rolledValue) + hpObj.modifier > 0 ? Number(hpObj.rolledValue) + hpObj.modifier : 1;
    } else if (abilityName === 'presence') {
      let npObj = this.statsObj.find((stat: { name: string; }) => stat.name === 'neuromancy');
      npObj.modifier = ability!.value;
      npObj.value = Number(npObj.rolledValue) + npObj.modifier > 0 ? Number(npObj.rolledValue) + npObj.modifier : 1;
    }
  }

  private rerollAllAbilities() {
    this.abilitiesObj.forEach(ability => {
      ability.modifier = 0;
      ability.rolledDice = [];
      ability.value = 0;

      if (Object.hasOwn(this.currentJob.stats, ability.name)) {
        ability.modifier = Number(this.currentJob.stats[ability.name as keyof typeof this.currentJob.stats]);
      }

      for (let i = 0; i < 3; i++) {
        ability.rolledDice.push(this.random.getRandomNumber(1, 6));
      }

      let rawNumber = ability.rolledDice.reduce(
        (accumulator, currentValue) => accumulator + currentValue, ability.modifier
      );

      this.convertRawNumberToAbilityMod(rawNumber, ability);
    });
  }

  private convertRawNumberToAbilityMod(rawNumber: number, ability: AbilityObj) {
    switch (true) {
      case rawNumber <= 4: {
        ability.value = -3;
        break;
      }
      case rawNumber > 4 && rawNumber <= 6: {
        ability.value = -2;
        break;
      }
      case rawNumber > 6 && rawNumber <= 8: {
        ability.value = -1;
        break;
      }
      case rawNumber > 8 && rawNumber <= 12: {
        ability.value = 0;
        break;
      }
      case rawNumber > 12 && rawNumber <= 14: {
        ability.value = 1;
        break;
      }
      case rawNumber > 14 && rawNumber <= 16: {
        ability.value = 2;
        break;
      }
      case rawNumber > 16 && rawNumber <= 20: {
        ability.value = 3;
        break;
      }
    }
  }
}
