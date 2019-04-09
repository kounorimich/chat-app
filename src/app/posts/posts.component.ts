import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {not} from 'rxjs/internal-compatibility';
import {PostEditComponent} from '../post-edit/post-edit.component';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  posts: Post[];
  result = '';
  selectedPosts: Post[];

  constructor(
    private postService: PostService,
  ) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  getNumberOfPosts(): number {
    return this.posts.length;
  }

  genId(posts: Post[]): number {
    return this.getNumberOfPosts() > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }

  submit(body: string): void {
    if (!body) {
      return;
    }

    const newPost = new Post();
    newPost.body = body;
    newPost.id = this.genId(this.posts);
    newPost.selected = false;
    this.postService.submitPost(newPost) // ( {body} as Post)
      .subscribe(post => {
        this.posts.push(post);
      });
    this.result = '';
  }

  onResult(text: string) {
    this.result = text;
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
        alert(`deleted Message: ${post.body}`);
      }
    }
  }
}
