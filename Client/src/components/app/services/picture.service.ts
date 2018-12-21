import { Injectable } from '@angular/core';
import { Picture } from '../../../models/picture.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from './config/config.service';

@Injectable()
export class PictureService extends ConfigService {
    apiUrl: string;
    private _pictures: BehaviorSubject<Picture[]>;
    private dataStore: {
        pictures: Picture[]
    };

    error;
    constructor(protected http: HttpClient, private sanitizer: DomSanitizer) {
        super();
        this.apiUrl = this.config.baseUrl + this.config.pictureUrl;
        this.dataStore = { pictures: [] };
        this._pictures = <BehaviorSubject<Picture[]>>new BehaviorSubject([]);
    }

    private assign() {
        this._pictures.next(Object.assign({}, this.dataStore).pictures);
    }

    addPicture(picture: Picture) {
        this.http.post<Picture>(this.apiUrl, picture, this.httpOptions).subscribe(data => {
            this.dataStore.pictures.push(data);
            this.assign();
        });
    }

    getPictures(callback?) {
        if (this.dataStore.pictures.length > 0) {
            this.assign();
            if (callback) {
                callback();
            }
            return;
        }
        this.http.get<Picture[]>(this.apiUrl, this.httpOptions)
                .subscribe(data => {
                    this.dataStore.pictures = data;
                    this.assign();
                    if (callback) {
                        callback();
                    }
                }, err => {throw new Error(err); });
    }

    getPictureFile(pictureId: string): Picture {
        const picture = this.dataStore.pictures.find(pic => pic.id === pictureId);
        if (picture.src) {
            return picture;
        }
        this.http.get(this.apiUrl + '/file/' + pictureId, this.httpOptions).subscribe(data => {
            const src = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${picture.type};base64,${data['file']}`);
            picture.src = src;
            picture.loaded = true;
        });
        return picture;
    }

    getPictureByIndex(index: number): Picture {
        return this.dataStore.pictures[index];
    }

    get pictures() { return this._pictures.asObservable(); }
}
