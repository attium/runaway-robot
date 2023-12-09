import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges, OnInit{

  @Input() selectedState : string = ""; 
  @Input() currentState : string = "";
  @Output() selectedStateChange : EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    const allStatesOnMap = document.querySelectorAll  ("path");
    allStatesOnMap.forEach(state => state.addEventListener('click', (ev) => this.selectedStateChange.emit((ev.target as HTMLElement).getAttribute('title') ||'')));
    this.disableCurrentState();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['selectedState']) {
      this.highlightState();

    }
  }

  highlightState() {
    this.removeHighlightFromAllStates();
    const selectedStateOnMap = document.querySelectorAll  ("path[title='"+this.selectedState + "']") || [];

    selectedStateOnMap[0]?.setAttribute("style" , "fill:blue");

  }

  removeHighlightFromAllStates(){

    const allStatesOnMap = document.querySelectorAll  ("path");
    
    allStatesOnMap.forEach(state => {
      if(state.getAttribute('title')!=this.currentState)
      state.setAttribute("style", "fill:transparent")}
      );

  }

  disableCurrentState() {
    const currentStateOnMap = document.querySelectorAll  ("path[title='"+this.currentState + "']") || [];
    currentStateOnMap[0]?.setAttribute('style', 'fill: lightgrey; pointer-events:none;');
  }

  selectState(){

  }

}
