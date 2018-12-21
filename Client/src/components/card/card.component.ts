import { Component, OnInit, Input } from '@angular/core';
import { PictureService } from '../app/services/picture.service';
import { Picture } from '../../models/picture.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  picture: Picture;
  @Input() index = 0;
  @Input() id: string;

  constructor(private pictureService: PictureService) {

  }

  ngOnInit() {
    this.loadPicture();
  }

  loadPicture() {
    this.picture = this.pictureService.getPictureFile(this.id);
  }
}
