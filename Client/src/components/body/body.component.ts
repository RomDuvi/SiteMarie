import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Picture } from '../../models/picture.model';
import { PictureService } from '../app/services/picture.service';



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [PictureService]
})
export class BodyComponent implements OnInit {
  currentPath: string;
  pictures: Picture[];

  constructor(private pictureService: PictureService) {

  }

  ngOnInit() {
    this.pictureService.getPictures().subscribe((data: Picture[]) => {
      this.pictures = data;
    });
  }

  displayPreview(path: string): void {
    $('#preview').removeAttr('hidden');
    $('.card-columns').attr('hidden', 'hidden');
    this.currentPath = path;
  }

}
