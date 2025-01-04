import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DisplayedJob, Job, TitleDescripObj } from '../models/grimm-interfaces';
import { CommonModule } from '@angular/common';
import { RandomNumberService } from '../services/random-number.service';
import { CLOWN_SKILLZ, WURMS } from '../assets/fonts/grimm.constants';

@Component({
  selector: 'app-grimm-job',
  imports: [CommonModule],
  templateUrl: './grimm-job.component.html',
  styleUrl: './grimm-job.component.scss'
})
export class GrimmJobComponent implements OnChanges {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() currentJob: Job = {} as Job;
  @Output() newJobEmitter: EventEmitter<boolean> = new EventEmitter();
  displayedJob: DisplayedJob = {
    detail: '',
    skillz: {
      title: '',
      descrip: '',
    },
  };
  wurms: string[] = WURMS;
  currentWurm: string = '';

  showClownButton: boolean = false;
  clownModeActive: boolean = false;
  jobsThatCanClown: string[] = [
    'Brutal Savage *',
    'Merciless Mercenary *',
    'Plunderluster *',
    'Salty Dog *'
  ];
  unClownedSkillz: TitleDescripObj[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.random.shuffleArray(this.currentJob.details.table);
    if (this.currentJob.skillz) {
      this.random.shuffleArray(this.currentJob.skillz);
      this.rerollSkillz();
    } else {
      this.displayedJob.skillz = {
        title :'',
        descrip: ''
      };
    }
    this.rerollDetail();

    this.clownModeActive = false;
    this.showClownButton = this.jobsThatCanClown.includes(this.currentJob.name);
  }

  emitNewJob() {
    this.newJobEmitter.emit(true);
  }

  toggleClownMode() {
    this.clownModeActive = !this.clownModeActive;

    if (this.clownModeActive) {
      if (this.currentJob.skillz) {
        this.unClownedSkillz = this.currentJob.skillz; 
      }
      this.random.shuffleArray(CLOWN_SKILLZ);
      this.currentJob.skillz = CLOWN_SKILLZ;
    } else {
      this.currentJob.skillz = this.unClownedSkillz;
      this.random.shuffleArray(this.currentJob.skillz);
    }
    
    this.rerollSkillz();
  }

  rerollDetail() {
    let newIndex = this.currentJob.details.table.indexOf(this.displayedJob.detail);
    const isEndOfArray = newIndex + 1 === this.currentJob.details.table.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.displayedJob.detail = this.currentJob.details.table[newIndex];
  }

  rerollSkillz() {
    if (this.currentJob.skillz) {
      let newIndex = this.currentJob?.skillz.findIndex(skill => skill.title === this.displayedJob.skillz.title);
      const isEndOfArray = newIndex + 1 === this.currentJob?.skillz.length;
  
      if (isEndOfArray) {
        newIndex = 0;
      } else {
        newIndex += 1;
      }
  
      this.displayedJob.skillz = this.currentJob?.skillz[newIndex];

      if (this.displayedJob.skillz.descrip.includes('[type]')) {
        this.random.shuffleArray(this.wurms);
        const chosenWurmIndex = this.random.getRandomNumber(0, this.wurms.length - 1);
        this.currentWurm = this.wurms[chosenWurmIndex];
        this.displayedJob.skillz.descrip = this.displayedJob.skillz.descrip.replace('[type]', this.currentWurm);
      }
    }
  }

  rerollWurm() {
    let newIndex = this.wurms.indexOf(this.currentWurm);
    const oldWurm = this.currentWurm;

    if (newIndex + 1 === this.wurms.length) {
      newIndex = -1;
    }
    newIndex ++;

    this.currentWurm = this.wurms[newIndex];
    this.displayedJob.skillz.descrip = this.displayedJob.skillz.descrip.replace(oldWurm, this.currentWurm);
  }
}
