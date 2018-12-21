import { Component, OnInit, ViewChild } from '@angular/core';
import { Picture } from '../../models/picture.model';
import { PictureService } from '../app/services/picture.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pictures: Observable<Picture[]>;

  constructor(private pictureService: PictureService, private router: Router) {

  }

  ngOnInit() {
    this.pictures = this.pictureService.pictures;
    this.pictureService.getPictures();
  }

  displayPreview(index: number): void {
    this.router.navigate(['/preview'], { queryParams: { index: index }});
  }

}
