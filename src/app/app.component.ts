import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  posts: any = {
    id: 11,
    body: 'json書き出しテスト',
    selected: false
  };
}
