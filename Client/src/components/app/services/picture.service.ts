import { Injectable } from '@angular/core';
import { Picture } from '../../../models/picture.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from './config/config.service';
import { map, tap, last, catchError } from 'rxjs/operators';
import { ToastGeneratorService } from './toastGenerator.service';

@Injectable()
export class PictureService extends ConfigService {
    apiUrl: string;
    private _pictures: BehaviorSubject<Picture[]>;
    private dataStore: {
        pictures: Picture[]
    };

    error;
    constructor(
        protected http: HttpClient,
        private sanitizer: DomSanitizer,
        private toast: ToastGeneratorService
    ) {
        super();
        this.apiUrl = this.config.baseUrl + this.config.pictureUrl;
        this.dataStore = { pictures: [] };
        this._pictures = <BehaviorSubject<Picture[]>>new BehaviorSubject([]);
    }

    private assign() {
        this._pictures.next(Object.assign({}, this.dataStore).pictures);
    }

    addPicture(picture: Picture, progressCallback: any, lasCallback: any) {
        if (!picture.categories) {
            picture.categories = [];
        }
        const req = new HttpRequest('POST', this.apiUrl, picture, { reportProgress: true});
        this.http.request(req).pipe(
            map(event => this.getEventMessage(event, picture.displayName)),
            tap(message => progressCallback(message)),
            last(lasCallback())
          ).subscribe((x: any) => { this.toast.toastSucess('Picture Created', `The picture ${x.displayName} has been created`); } );
    }

    getPictures(callback?, categoryId?) {
        if (this.dataStore.pictures.length > 0) {
            this.assign();
            if (callback) {
                callback();
            }
            return;
        }
        this.http.get<Picture[]>(this.apiUrl, this.httpOptions)
                .subscribe(data => {
                    if (categoryId) {
                        this.dataStore.pictures = data.filter(pic => {
                            const cats = pic.categories.filter(cat => cat.id === +categoryId);
                            return cats.length > 0;
                        });
                    } else {
                        this.dataStore.pictures = data;
                    }
                    this.assign();
                    if (callback) {
                        callback();
                    }
                }, err => {throw new Error(err); });
    }

    getPictureFile(pictureId: number): Picture {
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

    deletePicture(picture: Picture) {
        this.http.post(this.apiUrl + '/delete', picture, this.httpOptions).subscribe((data: Picture) => {
            const index = this.dataStore.pictures.indexOf(data);
            this.dataStore.pictures.splice(index, 1);
            this.toast.toastSucess('Picture deleted', `The picture ${data.displayName} has bean deleted`);
        });
    }

    updatePicture(picture: Picture) {
        this.http.put(this.apiUrl, picture, this.httpOptions).subscribe((data: Picture) => {
            const index = this.dataStore.pictures.indexOf(data);
            this.dataStore.pictures[index] = data;
            this.toast.toastSucess('Picture updated', `The picture ${data.displayName} has bean updated`);
        });
    }


    private getEventMessage(event: HttpEvent<any>, fileName: string): any {
        switch (event.type) {
          case HttpEventType.Sent:
            return `Uploading "${fileName}"`;

          case HttpEventType.UploadProgress:
            // Compute and show the % done:
            const percentDone = Math.round(100 * event.loaded / event.total);
            return percentDone;

          case HttpEventType.Response:
            this.dataStore.pictures.push(event.body);
            this.assign();
            return `"${fileName}" was completely uploaded!`;

          default:
            return `"${fileName}" surprising upload event: ${event.type}.`;
        }
      }
}
