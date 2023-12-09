import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { StateGeneratorService } from '../services/state-generator.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit, AfterViewInit {
  public indexOfLastCorrectState : number = -1; 
  constructor(private router: Router, private location : Location, private stateGeneratorService: StateGeneratorService ) {}

  ngOnInit() {
    this.indexOfLastCorrectState = this.stateGeneratorService.indexOfLastCorrectState;
   
  }

  ngAfterViewInit() {
    const video = document.getElementsByTagName('video')[0];
    video
      .play()
      ?.then()
      .catch((err) => {
        video.controls = true;
      });
  }

  public startGame() {
    setTimeout(() => this.router.navigate(['/new-state']), 3000);
  }
  
  public skip() {
    this.router.navigate(['/new-state']);
  }

  public goBack(){
    this.location.back();  }
}
