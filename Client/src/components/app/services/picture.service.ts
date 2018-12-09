import { Injectable } from '@angular/core';
import { Picture } from '../../../models/picture.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/config.model';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class PictureService extends ConfigService {
    config: IConfig;
    apiUrl: string;

    error;
    constructor(protected http: HttpClient) {
        super(http);
        // this.getConfig().subscribe((data: IConfig) => {
        //     this.config = {...data};
        //     this.apiUrl = this.config.baseUrl + this.config.pictureUrl;
        // });
        this.apiUrl = 'http://localhost:8081/pictures';
    }

    addPicture(picture: Picture): Observable<Picture> {
        return this.http.post<Picture>(this.apiUrl, picture, httpOptions)
                        .pipe(
                            catchError(this.handleError)
                        );
    }

    getPictures(): Observable<Picture[]> {
        return this.http.get<Picture[]>(this.apiUrl, httpOptions)
                        .pipe(
                            catchError(this.handleError)
                        );
    }
}
