import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import {
    map,
    switchMap,
    mergeMap,
    flatMap,
    debounceTime,
    filter,
    distinctUntilChanged,
    tap,
    catchError,
} from 'rxjs/operators';
import { Name } from '../models/name';
import { SearchService } from '../search.service';

@Component({
    selector: 'rxo-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements AfterViewInit {
    @ViewChild('searchBox') searchInput: ElementRef;
    result$: Observable<Name>;

    loading: boolean;
    errored: boolean;

    constructor(private searchService: SearchService) {}

    ngAfterViewInit(): void {
        this.searchInput.nativeElement.focus();

        this.result$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
            map((event) => event.target.value),
            debounceTime(250),
            filter((term) => term),
            distinctUntilChanged(),
            tap(() => {
                this.loading = true;
                this.errored = false;
            }),
            switchMap((name) =>
                this.searchService.search(name).pipe(
                    catchError((err) => {
                        this.errored = true;
                        return of(null);
                    })
                )
            ),
            tap(() => (this.loading = false))
        );
    }
}
