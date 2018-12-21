import { Component } from '@angular/core';
import { PictureService } from './services/picture.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PictureService]
})
export class AppComponent {
  constructor() {

  }

}
