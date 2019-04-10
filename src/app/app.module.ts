import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PostsComponent} from './posts/posts.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FormsModule} from '@angular/forms';

import {ButtonsModule, ModalModule, PopoverModule} from 'ngx-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {FocusDirective} from './focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostEditComponent,
    ModalComponent,
    FocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
