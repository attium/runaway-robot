export interface ClueWithInfo {
  clue: string;
  info: string;
}

export interface CluesByState {
  [key: string]: ClueWithInfo[];
}

export interface StateAndClue {
  stateName: string;
  stateClueAndInfo : {
    clue : string, 
    info : string
  }; 
}
