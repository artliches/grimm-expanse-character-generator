import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RandomNumberService } from '../services/random-number.service';
import { Identity, Job } from '../models/grimm-interfaces';
import { BOT_IDIOSYNCRASIES, BOT_SCARS, FLESH_SCARS, IDIOSYNCRASIES, NAMES, PERSONALITY } from '../assets/fonts/grimm.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grimm-identity',
  imports: [CommonModule],
  templateUrl: './grimm-identity.component.html',
  styleUrl: './grimm-identity.component.scss'
})
export class GrimmIdentityComponent implements OnInit, OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() currentJob: Job = {} as Job;
  @Input() rerollAllRecieved: boolean = false;

  identityObj: Identity = {
    name: '',
    personalityObj: {
      first: '',
      second: '',
    },
    isFlesh: true,
    scars: [],
    idiosyncrasies: '',
  };

  ngOnInit(): void {
    this.shuffleIdentityArrays();
    this.rerollName();
    this.getInitialPersonality();
    this.rerollIdiosyncrasies();
    this.getNewScars(0, true);
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes['rerollAllRecieved'] && !changes['rerollAllRecieved'].firstChange) {
        this.rerollAll();
      } else if (changes && changes['currentJob']) {
        if (changes['currentJob'].currentValue && changes['currentJob'].currentValue.name === 'Brutal Savage *') {
          this.identityObj.scars = [];
          for (let i = 0; i < 2; i++) {
            this.getNewScars(i, true);
          }
        } else if (changes['currentJob'].previousValue && changes['currentJob'].previousValue.name === 'Brutal Savage *') {
          this.identityObj.scars = [];
          this.getNewScars(0, true);
        }
      }
  }

  rerollAll() {
    const numScars = this.currentJob.name === 'Brutal Savage *' ? 2 : 1;

    this.rerollName();
    this.rerollPersonality('first');
    this.rerollPersonality('second');
    for (let i = 0; i < numScars; i++) {
      this.getNewScars(i, false);
    }
    this.rerollIdiosyncrasies();
  }

  rerollName() {
    let newIndex: number = NAMES.indexOf(this.identityObj.name);
    const isEndOfArray = newIndex + 1 === NAMES.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.identityObj.name = NAMES[newIndex];
  }

  rerollPersonality(sectionToReroll: string) {
    const indexesToSkip: number[] = [
      PERSONALITY.indexOf(this.identityObj.personalityObj.first),
      PERSONALITY.indexOf(this.identityObj.personalityObj.second),
    ];

    let newIndex = PERSONALITY.indexOf(this.identityObj.personalityObj[sectionToReroll as keyof typeof this.identityObj.personalityObj]);
    const isEndOfArray = newIndex + 1 === PERSONALITY.length;

    if (isEndOfArray) {
      newIndex = -1;
    }

    do {
      newIndex += 1;
    } while (indexesToSkip.includes(newIndex));

    this.identityObj.personalityObj[sectionToReroll as keyof typeof this.identityObj.personalityObj] = PERSONALITY[newIndex];
  }

  getNewScars(index: number, isNew: boolean) {
    const scarsTable: string[] = this.identityObj.isFlesh ? FLESH_SCARS : BOT_SCARS;
    let newIndex: number = scarsTable.indexOf(this.identityObj.scars[index]);
    const indexesToSkip: number[] = [];

    this.identityObj.scars.forEach(scar => {
      indexesToSkip.push(scarsTable.indexOf(scar));
    });

    do {
      newIndex ++;
    } while (indexesToSkip.includes(newIndex));

    if (newIndex + 1 >= scarsTable.length) {
      newIndex = 0;
    }

    if (isNew) {
      this.identityObj.scars.push(scarsTable[newIndex]);
    } else {
      this.identityObj.scars[index] = scarsTable[newIndex];
    }
  }

  rerollIdiosyncrasies() {
    const idiosyncrasiesTable = this.identityObj.isFlesh ? IDIOSYNCRASIES : BOT_IDIOSYNCRASIES;
    let newIndex: number = idiosyncrasiesTable.indexOf(this.identityObj.idiosyncrasies);
    const isEndOfArray = newIndex + 1 === idiosyncrasiesTable.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.identityObj.idiosyncrasies = idiosyncrasiesTable[newIndex];
  }

  private shuffleIdentityArrays() {
    this.random.shuffleArray(NAMES);
    this.random.shuffleArray(PERSONALITY);
    this.random.shuffleArray(BOT_SCARS);
    this.random.shuffleArray(FLESH_SCARS);
    this.random.shuffleArray(IDIOSYNCRASIES);
    this.random.shuffleArray(BOT_IDIOSYNCRASIES);
  }

  private getInitialPersonality() {
    this.identityObj.personalityObj.first = PERSONALITY[0];
    this.identityObj.personalityObj.second = PERSONALITY[1];
  }
}
