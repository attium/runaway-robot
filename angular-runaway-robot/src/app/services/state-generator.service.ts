import { Injectable } from '@angular/core';
import { STATES_AND_UTS } from '../utils/states-and-uts';
import { STATE_WISE_CLUES } from '../utils/clues';
import { ClueWithInfo, StateAndClue } from '../utils/types';
import { of } from 'rxjs';
import { STATE_WISE_INFO } from '../utils/generic-state-info';

@Injectable({
  providedIn: 'root',
})
export class StateGeneratorService {

  private selectedState: string = '';
  private nextState: StateAndClue = {} as StateAndClue;
  private infoForCorrectState: string = '';

  private allStatesForGame: Array<StateAndClue> = [];

  public indexOfLastCorrectState = 0;

  constructor() {}

  async initializeGame() {
    //this.selectRandomState();
    // this.nextState = "Karnataka";
    this.selectedState = 'Karnataka';
    // sessionStorage.setItem('0',  this.selectedState);
    this.allStatesForGame.push({
      stateName: 'Karnataka',
      stateClueAndInfo: { clue: '', info: STATE_WISE_INFO['Karnataka'] },
    });
    await this.generateThreeStates();

    // sessionStorage.setItem('selectedState', this.selectedState);
    // sessionStorage.setItem()
  }

  generateThreeStates() {
    while (this.allStatesForGame.length < 4) {
      let nextState =
        STATES_AND_UTS[
          Math.trunc(Math.abs(Math.random() * STATES_AND_UTS.length - 1))
        ];
      if (
        this.allStatesForGame?.findIndex(
          (stateNameAndClue) => stateNameAndClue.stateName == nextState
        ) != -1
      )
        continue;
      console.log(nextState);
      const allCluesForNextState: Array<ClueWithInfo> =
        STATE_WISE_CLUES[nextState];
      const randomClue =
        allCluesForNextState[
          Math.trunc(Math.abs(Math.random() * allCluesForNextState.length - 1))
        ];

      this.allStatesForGame.push({
        stateName: nextState,
        stateClueAndInfo: randomClue,
      });
    }
    sessionStorage.setItem('allStates', String(this.allStatesForGame));
    sessionStorage.setItem('index', '0');

    return of(true);
  }

  getClueForState(): string {
  ;
    return this.allStatesForGame[this.indexOfLastCorrectState+1]?.stateClueAndInfo.clue;
  }

  setNextState() {
    this.nextState = this.allStatesForGame[this.indexOfLastCorrectState + 1];
  }

  private setStatesAndIndex(allStates: string, index: string): void {
    this.allStatesForGame = JSON.parse(allStates);
    this.indexOfLastCorrectState = parseInt(index);
  }

  canActivate() {
    const allStatesFromSessionStorage = sessionStorage.getItem('allStates');
    const indexOfLastCorrectStateInSessionStorage =
      sessionStorage.getItem('index');
    if (this.allStatesForGame.length == 4) return true;
    if (
      allStatesFromSessionStorage &&
      indexOfLastCorrectStateInSessionStorage
    ) {
      this.allStatesForGame = JSON.parse(allStatesFromSessionStorage);
      this.indexOfLastCorrectState = parseInt(
        indexOfLastCorrectStateInSessionStorage
      );
      return true;
    }
    return false;
  }

  selectRandomState() {
    // while (this.selectedState == this.nextState || this.nextState == '') {
    //   this.nextState =
    //     STATES_AND_UTS[
    //       Math.trunc(Math.abs(Math.random() * STATES_AND_UTS.length - 1))
    //     ];
    // }
    // return of(true);
  }

  getNextState() {
    return this.allStatesForGame[this.indexOfLastCorrectState];
  }

  getSelectedState() {
    return this.selectedState;
  }

  setSelectedState(state: string) {
    this.selectedState = state;
  }


  getInfoForCorrectState() {
    return STATE_WISE_INFO[''];
  }

  public incrementStateIndex() {
    this.indexOfLastCorrectState++;
  }
}
