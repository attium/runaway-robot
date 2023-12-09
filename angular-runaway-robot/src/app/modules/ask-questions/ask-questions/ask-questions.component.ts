import { Component, OnInit } from '@angular/core';
import { StateGeneratorService } from 'src/app/services/state-generator.service';
import { ClueWithInfo } from 'src/app/utils/types';

@Component({
  selector: 'app-ask-questions',
  templateUrl: './ask-questions.component.html',
  styleUrls: ['./ask-questions.component.scss']
})
export class AskQuestionsComponent implements OnInit{
  public selectedState = '';
  public touristSaid = '';
  private correctState: ClueWithInfo = {} as ClueWithInfo;

  constructor(private stateGeneratorService : StateGeneratorService) {}

  ngOnInit(): void {
    this.selectedState = this.stateGeneratorService.getSelectedState();
    //this.correctState = this.stateGeneratorService.getNextState();
      this.touristSaid = this.stateGeneratorService.getClueForState();

    

  }

  public travel(){

  }

  public backToState(){

  }
}
