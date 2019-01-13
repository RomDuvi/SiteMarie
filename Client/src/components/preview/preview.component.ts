import { Component, OnInit } from '@angular/core';
import { PictureService } from '../app/services/picture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Picture } from '../../models/picture.model';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  index = 0;
  pictures: Observable<Picture[]>;
  currentPicture: Picture = new Picture();

  constructor(
    protected pictureService: PictureService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.index = +this.activatedRoute.snapshot.queryParamMap.get('index');
    console.log(this.index);
    this.pictures = this.pictureService.pictures;
    this.pictureService.getPictures(() => this.loadPicture());
  }

  loadPicture() {
    const id = this.pictureService.getPictureByIndex(this.index).id;
    this.currentPicture = this.pictureService.getPictureFile(id);
  }

  next() {
    this.pictureService.pictures.subscribe(data => {
      if (this.index === data.length - 1) {
        return;
      }
      this.index ++;
      this.loadPicture();
    });
  }

  previous() {
    if (this.index === 0) {
      return;
    }
    this.index --;
    this.loadPicture();
  }

  close() {
    window.history.back();
  }
}
