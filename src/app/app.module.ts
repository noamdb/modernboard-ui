import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // CreateThreadComponent,
    // BoardComponent,
    // HomeComponent,
    // ThreadListComponent,
    // ThreadDetailComponent,
    // CreatePostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    // MaterialModule,
    // FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

  entryComponents: []

})
export class AppModule {}


// ng xi18n --output-path locale
// ng serve --configuration=he
