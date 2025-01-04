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

  ngOnInit(): void {
      this.jobsArray = this.random.shuffleArray(JOBS);

      this.getNewJob();
  }

  getNewJob() {
    let newIndex = this.jobsArray.findIndex(job => job.name === this.currentJob.name);
    const isEndOfArray = newIndex + 1 === this.jobsArray.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.currentJob = this.jobsArray[newIndex];
  }

  print() {
    window.print();
  }

  enableExtraClasses(enabled: boolean) {
    this.random.shuffleArray(ADDITIONAL_JOBS);
    Array.prototype.push.apply(this.jobsArray, ADDITIONAL_JOBS);
    this.random.shuffleArray(this.jobsArray);
  }
}
