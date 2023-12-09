import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { StateGeneratorService } from 'src/app/services/state-generator.service';
import { STATES_AND_UTS } from 'src/app/utils/states-and-uts';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent implements OnInit {
  public allStatesAndUts = STATES_AND_UTS;
  public selectedDestination: string = '';
  public currentState: string = '';

  constructor(
    private stateGeneratorService: StateGeneratorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentState = this.stateGeneratorService.getSelectedState();
  }

  fly() {
    this.stateGeneratorService.setSelectedState(this.selectedDestination);
    this.startAnimation();
    setTimeout(() => {
      this.router.navigate(['/new-state']);
    }, 10000);
  }

  startAnimation() {
    const takeOffAudio = document.getElementById('take-off-audio');
    (takeOffAudio as HTMLAudioElement).playbackRate = 1.5;
    (takeOffAudio as HTMLAudioElement).play();
    const currentStateOnMap =
      document.querySelectorAll("path[name='" + this.currentState + "']") || [];
      

    const boundingRectOfCurrentState = (
      currentStateOnMap[0] as SVGGraphicsElement
    )?.getBBox();
  
    const midXCoordinateOfCurrentState =
      boundingRectOfCurrentState.x + boundingRectOfCurrentState.height / 2;
    const midYCoordinateOfCurrentState =
      boundingRectOfCurrentState.y + boundingRectOfCurrentState.width / 2;
    const sourcePoint = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    sourcePoint.setAttribute('cx', midXCoordinateOfCurrentState.toString());
    sourcePoint.setAttribute('cy', midYCoordinateOfCurrentState.toString());
    sourcePoint.setAttribute('r', '5');
    sourcePoint.setAttribute('id', 'destinationPoint');
    sourcePoint.setAttribute('stroke-width', '3');

    const destinationStateOnMap =
      document.querySelectorAll(
        "path[name='" + this.selectedDestination + "']"
      ) || [];
    const boundingRectOfDestinationState = (
      destinationStateOnMap[0] as SVGGraphicsElement
    ).getBBox();
    const midXCoordinateOfDestinationState =
      boundingRectOfDestinationState.x +
      boundingRectOfDestinationState.height / 2;
    const midYCoordinateOfDestinationState =
      boundingRectOfDestinationState.y +
      boundingRectOfDestinationState.width / 2;
    const destinationPoint = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    destinationPoint.setAttribute(
      'cx',
      midXCoordinateOfDestinationState.toString()
    );
    destinationPoint.setAttribute(
      'cy',
      midYCoordinateOfDestinationState.toString()
    );
    destinationPoint.setAttribute('r', '5');
    destinationPoint.setAttribute('id', 'destinationPoint');
    destinationPoint.setAttribute('stroke-width', '3');

    const points = document.getElementById('points');
    points?.appendChild(destinationPoint);
    points?.appendChild(sourcePoint);
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', midXCoordinateOfCurrentState.toString());
    line.setAttribute('y1', midYCoordinateOfCurrentState.toString());
    line.setAttribute('x2', midXCoordinateOfDestinationState.toString());
    line.setAttribute('y2', midYCoordinateOfDestinationState.toString());
    line.setAttribute('stroke-width', '3');
    line.setAttribute('stroke', 'rgb(255,0,0');
    line.setAttribute('stroke-dasharray', '5,5');

    const animateX = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    );
    animateX.setAttribute('attributeName', 'x2');
    animateX.setAttribute(
      'values',
      midXCoordinateOfCurrentState.toString() +
        ';' +
        midXCoordinateOfDestinationState.toString()
    );

    animateX.setAttribute('dur', '10s');

    const animateY = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'animate'
    );
    animateY.setAttribute('dur', '10s');
    animateY.setAttribute('attributeName', 'y2');
    animateY.setAttribute(
      'values',
      midYCoordinateOfCurrentState.toString() +
        ';' +
        midYCoordinateOfDestinationState.toString()
    );

    line.appendChild(animateX);
    line.appendChild(animateY);

    const svg = document.getElementsByTagName('svg')[0];
 

    svg.appendChild(line);
    
  }
}
