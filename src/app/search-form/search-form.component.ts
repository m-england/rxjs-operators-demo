import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { Name } from '../models/name';

@Component({
    selector: 'rxo-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
    result: Name;
    input: string;
    loading: boolean;
    errored: boolean;

    constructor(private searchService: SearchService) {}

    async search(): Promise<void> {
        if (this.input) {
            this.loading = true;
            this.searchService.search(this.input).subscribe(
                (data) => {
                    this.result = data;
                    this.loading = false;
                },
                (err) => {
                    this.errored = true;
                    this.loading = false;
                }
            );
        }
    }
}
