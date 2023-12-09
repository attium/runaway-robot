import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateGeneratorService } from 'src/app/services/state-generator.service';
import { STATE_WISE_INFO } from 'src/app/utils/generic-state-info';
import { StateAndClue } from 'src/app/utils/types';

@Component({
  selector: 'app-new-state',
  templateUrl: './new-state.component.html',
  styleUrls: ['./new-state.component.scss'],
})
export class NewStateComponent implements OnInit, AfterViewInit {
  public imgUrl: string = '';
  showAnimation: boolean = true;
  constructor(
    public stateGeneratorService: StateGeneratorService,
    private router: Router
  ) {}

  public selectedState: string = '';

  private correctState: StateAndClue = {} as StateAndClue;

  public showPopUp = true;

  public showCluePopUp = false;

  public isStateCorrect: boolean = false;

  public stateInfo: string = '';

  public cluePopUpContent: string = '';

  public speechBubbleContent: string = '';

  /*
   * Variable to track which screen to show on right side
   * true -> State Info
   * false -> Ask Questions
   */
  public showStateInfo: boolean = true;

  ngOnInit() {
    this.selectedState = this.stateGeneratorService.getSelectedState();
    this.correctState = this.stateGeneratorService.getNextState();
    if (this.selectedState == this.correctState.stateName) {
      this.isStateCorrect = true;
    } else {
      this.showAnimation = false;
    }

    this.imgUrl = 'assets/states/' + this.selectedState + '.png';
  }

  ngAfterViewInit() {
    this.checkStateAndGenerateNextState();
  }

  async showTravelingRobotAnimation() {
    this.showAnimation = true;
    const gif = document.getElementById('traveling-robot-gif');
    const animationFinishedPromise = gif?.getAnimations()[0].finished;

    Promise.resolve(animationFinishedPromise).then((finished) => {
      this.showAnimation = false;
    });
  }

  private checkStateAndGenerateNextState() {
    // if (this.correctState.stateName.length > 0) {
    if (this.isStateCorrect) {
      this.showTravelingRobotAnimation();
      this.stateInfo = this.correctState.stateClueAndInfo.info;
      this.speechBubbleContent = this.stateGeneratorService.getClueForState();
      this.stateGeneratorService.incrementStateIndex();
      
      // console.log('Next state is', this.stateGeneratorService.getNextState());
    } else {
      console.log('wrong state');
      this.stateInfo = STATE_WISE_INFO[this.selectedState];
      this.speechBubbleContent = "I haven't seen a robot here!";
    }

    if (this.stateGeneratorService.indexOfLastCorrectState == 4) {
      this.showRelaxingRobotAnimation();
    }
    // } else {
    //   //this.stateGeneratorService.selectRandomState();
    //   this.stateInfo = STATE_WISE_INFO[this.selectedState];
    //   this.showTravelingRobotAnimation();
    //   // this.speechBubbleContent =
    //   //   this.stateGeneratorService.getClueForState();
    // }
  }
  showRelaxingRobotAnimation() {
  this.router.navigate(['\story']);
  }

  public hidePopUp() {
    // this.showPopUp = false;
    // this.popUpInfo = "";
  }

  public travel() {
    this.router.navigate(['/travel']);
  }

  public askQuestions() {
    //add audios for right & wrong state

      setTimeout(() => {this.showStateInfo = false}, 1000);
  }

  backToState() {
    this.showStateInfo = true;
  }
}
