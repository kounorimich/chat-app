import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { FormsModule} from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
