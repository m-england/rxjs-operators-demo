import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Name } from './models/name';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private http: HttpClient) {}

    search(name: string): Observable<Name> {
        return this.http.get<Name>(`${environment.apiUrl}z?name=${name}`).pipe(retry(1));
    }
}
