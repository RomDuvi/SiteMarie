import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from 'src/models/picture.model';
import { PictureService } from '../app/services/picture.service';
import { AuthService } from '../app/services/guard/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {
  pictures: Observable<Picture[]>;
  isAdmin = false;

  constructor(protected pictureService: PictureService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdminLogged();
    this.route.params.subscribe(params => {
      this.pictures = this.pictureService.pictures;
      this.pictureService.getPictures(null, params.categoryId);
    });
  }

  displayPreview(index: number): void {
    this.router.navigate(['/preview'], { queryParams: { index: index }});
  }

}
