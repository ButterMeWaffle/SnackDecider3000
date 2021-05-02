import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  // global styles handled in angular.json
})
export class AppComponent {
  title = 'SnackDecider3000';
  KonomiCode = () => {
    alert('I didnt get this far')
  }
}
