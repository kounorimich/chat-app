import {Injectable} from '@angular/core';
import {Post} from './post';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postsUrl = 'api/posts';

  constructor(
    private http: HttpClient,
  ) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`; // 求めたいpostのIDを含んだURLを生成
    console.log('サービスファイルのgetPost:' + this.http.get<Post>(url));
    return this.http.get<Post>(url);
    // return of(POSTS.find(post => post.id === id));
  }

  updatePost(post: Post): Observable<any> {
    return this.http.put(this.postsUrl, post, httpOptions);
  }

  submitPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
    // this.saveToLocalStorage();
  }

  deletePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, httpOptions);
  }
}

