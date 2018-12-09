import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IConfig } from './config.model';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  configUrl = '../../../assets/config.json';

  constructor(protected http: HttpClient) { }

  getConfig() {
    return this.http.get<IConfig>(this.configUrl)
                .pipe(
                  retry(2),
                  catchError(this.handleError)
                );
  }

  getConfigResponse(): Observable<HttpResponse<IConfig>> {
    return this.http.get<IConfig>(
      this.configUrl, { observe: 'response' });
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
