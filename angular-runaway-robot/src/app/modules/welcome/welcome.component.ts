import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateGeneratorService } from 'src/app/services/state-generator.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent  {

  constructor(private stateGeneratorService : StateGeneratorService, private router : Router){}
  oldGameExists = false;

  startNewGame() {
    this.stateGeneratorService.initializeGame();

    this.router.navigate(['/story']);
  }

  loadExistingGame() {

  }

}
