import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  posts: Post[];
  newMessageBody = '';

  constructor(
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    // this.getPosts();
    this.getPostsFromLocal();
  }
  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  genId(posts: Post[]): number {
    return this.posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }

  submit(body: string): void {
    const newPost = new Post();
    newPost.body = body;
    newPost.id = this.genId(this.posts);
    newPost.selected = false;
    this.postService.submitPost(newPost)
      .subscribe(post => {
        this.posts.push(post); this.savePostsToLocal();
      });
    console.log('this.posts.length: ' + this.posts.length);
    this.newMessageBody = '';
    console.log('newPost: ' + newPost.body);
    console.log('this.posts: ' + this.posts);
  }

  onResult(text: string) {
    this.newMessageBody = text;
  }

  // addToSelectedPosts(post: Post) {
  //  this.selectedPosts.push(post);
  // }

  selectAll(): void {
    for (const post of this.posts) {
      post.selected = true;
    }
  }

  deleteSelected(): void {
    for (const post of this.posts) {
      if (post.selected) {
        this.posts = this.posts.filter(p => p !== post); // 引数のpostオブジェクトでないものだけを、postsとして再定義
        this.postService.deletePost(post).subscribe();
        // alert(`deleted Message: ${post.body}`);
      }
    }
    this.savePostsToLocal();
  }
  savePostsToLocal(): void {
    localStorage.setItem('PostObjectList', JSON.stringify(this.posts));
    console.log('setItem実行直後のlocalStorage.getItemの返り値：' + JSON.parse(localStorage.getItem('PostObjectList')));
  }
  getPostsFromLocal(): void {
    console.log('getPostsFromLocal実行時のlocalStorage.getItemの返り値：' + JSON.parse(localStorage.getItem('PostObjectList')))
    if (localStorage.length >= 1) {
      this.posts = JSON.parse(localStorage.getItem('PostObjectList'));
    }
  }
}
