import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, timer } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    switchMap,
    tap,
    timeout,
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
            tap(() => (this.loading = true)),
            switchMap((name) =>
                this.searchService.search(name).pipe(
                    timeout(2500),
                    catchError((err) => {
                        this.errored = true;
                        timer(2000).subscribe(() => (this.errored = false));
                        return of(null);
                    })
                )
            ),
            tap(() => (this.loading = false))
        );
    }
}
