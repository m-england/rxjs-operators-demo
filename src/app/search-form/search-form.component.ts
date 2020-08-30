import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, switchMap, mergeMap, flatMap } from 'rxjs/operators';
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
            flatMap((name) => this.searchService.search(name))
        );
    }
}
