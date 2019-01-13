import { Component, OnInit, Input } from '@angular/core';
import { PictureService } from '../app/services/picture.service';
import { Picture } from '../../models/picture.model';
import { AuthService } from '../app/services/guard/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  picture: Picture;
  @Input() index = 0;
  @Input() id: number;
  isAdmin: boolean;

  constructor(protected pictureService: PictureService, protected authService: AuthService) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdminLogged();
    this.loadPicture();
  }

  loadPicture() {
    this.picture = this.pictureService.getPictureFile(this.id);
  }

  deletePicture($event: any) {
    $event.stopPropagation();
    if (!this.isAdmin) {
      return;
    }
    this.pictureService.deletePicture(this.picture);
  }

  editPicture($event: any) {
    $event.stopPropagation();
    if (!this.isAdmin) {
      return;
    }
  }
}
