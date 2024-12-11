import { Component, OnInit } from '@angular/core';
import { GrimmIdentityComponent } from "./grimm-identity/grimm-identity.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { RandomNumberService } from './services/random-number.service';
import { Job } from './models/grimm-interfaces';
import { JOBS } from './assets/fonts/grimm.constants';
import { GrimmJobComponent } from "./grimm-job/grimm-job.component";

@Component({
  selector: 'app-root',
  imports: [GrimmIdentityComponent, ToolbarComponent, GrimmJobComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  currentJob: Job = {} as Job;

  ngOnInit(): void {
      this.random.shuffleArray(JOBS);

      this.getNewJob();
  }

  getNewJob() {
    let newIndex = JOBS.findIndex(job => job.name === this.currentJob.name);
    const isEndOfArray = newIndex + 1 === JOBS.length;

    if (isEndOfArray) {
      newIndex = 0;
    } else {
      newIndex += 1;
    }

    this.currentJob = JOBS[newIndex];
  }

  print() {
    window.print();
  }
}
