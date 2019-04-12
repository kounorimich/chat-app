import {Injectable} from '@angular/core';
import {Post} from './post';


@Injectable({
  providedIn: 'root'
})


export class PostService {
  constructor() {}

  getPostsFromLocal(): Post[] {
    const posts: Post[] = [];
    const keys: number[] = [];
    for (let i = 0; i < (localStorage.length); i++) { // いったん、ローカルストレージのキーを取り出して昇順にソート
      const numberizedKey: number = localStorage.key(i) as unknown as number;
      keys.push(numberizedKey);
      keys.sort((a, b) => a - b);
      console.log(keys);
    }
    for (const i of keys) { // 昇順にソートした配列でローカルストレージの値を取得
        const key = `${i}`;
        const post = JSON.parse((localStorage.getItem(key)));
        if (!isNaN(post.id)) {
          posts.push(post);
        }
      }
    return posts;
  }


  getPost(id: string): Post {
    let post = new Post();
    post = JSON.parse(localStorage.getItem(`${id}`));
    return post;
  }

  updatePost(post: Post): void {
    localStorage.setItem(`${post.id}`, JSON.stringify(post));
  }

  submitPost(post): void {
    localStorage.setItem(`${post.id}`, JSON.stringify(post));
    console.log('submitPost実行！ post.id :    ' + post.id + post.body);
  }

  deletePost(post): void {
    localStorage.removeItem(`${post.id}`);
  }
}
