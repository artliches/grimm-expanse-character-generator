import { Component, OnInit } from '@angular/core';
import { GrimmIdentityComponent } from "./grimm-identity/grimm-identity.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { RandomNumberService } from './services/random-number.service';
import { Job } from './models/grimm-interfaces';
import { ADDITIONAL_JOBS, JOBS } from './assets/fonts/grimm.constants';
import { GrimmJobComponent } from "./grimm-job/grimm-job.component";
import { GrimmAbilitiesComponent } from "./grimm-abilities/grimm-abilities.component";
import { GrimmEquipmentComponent } from "./grimm-equipment/grimm-equipment.component";

@Component({
  selector: 'app-root',
  imports: [GrimmIdentityComponent, ToolbarComponent, GrimmJobComponent, GrimmAbilitiesComponent, GrimmEquipmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  currentJob: Job = {} as Job;
  jobsArray: Job[] = [];
  devoutWurm: string = '';
  inIFrame: boolean = false;

  ngOnInit(): void {
      this.random.shuffleArray(JOBS);
      this.jobsArray = JSON.parse(JSON.stringify(JOBS));

      this.getNewJob();

      this.inIFrame = window.self !== window.top;
  }

  getNewJob() {
    this.devoutWurm = '';
    let newIndex = this.jobsArray.findIndex(job => job.name === this.currentJob.name);
    const isEndOfArray = newIndex + 1 === this.jobsArray.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.currentJob = this.jobsArray[newIndex];
  }

  getWurmForEquipment(rawWurm: string) {
    this.devoutWurm = rawWurm.slice(rawWurm.indexOf('(') + 1, rawWurm.indexOf(')'));
  }

  print() {
    window.print();
  }

  enableExtraClasses(enabled: boolean) {
    if (!enabled) {
      this.random.shuffleArray(JOBS);
      this.jobsArray = JSON.parse(JSON.stringify(JOBS));
      this.getNewJob();

    } else {
      this.random.shuffleArray(ADDITIONAL_JOBS);
      Array.prototype.push.apply(this.jobsArray, ADDITIONAL_JOBS);
      this.random.shuffleArray(this.jobsArray);
    }
  }
}
