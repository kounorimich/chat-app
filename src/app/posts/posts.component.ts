import { Component, OnInit } from '@angular/core';
import { Post} from '../post';
// import { POSTS} from '../mock-posts';
import { PostService } from '../post.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  onSelect(post: Post) {
    this.selectedPost = post;
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts);
  }

  submit(body: string): void {
    if (!body) { return; }
    console.log( 'submit関数の実行' + ({body} as Post).id);
    this.postService.submitPost( {body} as Post)
      .subscribe(post => {
        this.posts.push(post);
      });
  }
}
