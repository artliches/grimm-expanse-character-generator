import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../models/grimm-interfaces';
import { CommonModule } from '@angular/common';
import { RandomNumberService } from '../services/random-number.service';

@Component({
  selector: 'app-grimm-job',
  imports: [CommonModule],
  templateUrl: './grimm-job.component.html',
  styleUrl: './grimm-job.component.scss'
})
export class GrimmJobComponent implements OnInit {
  constructor(
    private random: RandomNumberService
  ) {}

  @Input() currentJob: Job = {} as Job;
  displayedJob: {
    detail: string,
  } = {
    detail: ''
  };

  ngOnInit(): void {
      this.random.shuffleArray(this.currentJob.details.table);

      this.rerollDetail();
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
}
