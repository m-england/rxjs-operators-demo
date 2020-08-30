import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [AppComponent, SpinnerComponent, SearchFormComponent],
    imports: [BrowserModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
