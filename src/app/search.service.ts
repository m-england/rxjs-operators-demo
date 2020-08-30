import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retryWhen, delay } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Name } from './models/name';
import { genericRetryStrategy } from './rxjs-utils/generic-retry-strategy';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private http: HttpClient) {}

    search(name: string): Observable<Name> {
        return this.http
            .get<Name>(`${environment.apiUrl}?name=${name}`)
            .pipe(retryWhen(genericRetryStrategy({ maxRetryAttempts: 2, scalingDuration: 500 })));
    }
}
