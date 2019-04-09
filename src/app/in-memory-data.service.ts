import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      {id: 11, body: 'this is the first post!', selected: false},
      {id: 12, body: 'this is the second post!', selected: false},
      {id: 13, body: '3rd message', selected: false},
      {id: 14, body: 'added message', selected: false},
    ];
    return {posts};
  }

  genId(posts: Post[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }

  constructor() {
  }
}
