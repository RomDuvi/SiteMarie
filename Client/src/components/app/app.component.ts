import { Component } from '@angular/core';
import { PictureService } from './services/picture.service';
import { CategoryService } from './services/category.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PictureService, CategoryService]
})
export class AppComponent {
  constructor() {

  }

}
