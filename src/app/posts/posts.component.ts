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
    // setTimeout(() => this.getPosts(), 5000);
    this.getPosts();
    // this.jumpToBottom();
    }

  genId(posts: Post[]): number {
    if (this.posts.length === 0) {
      return 1;
    } else {
      return Math.max(...posts.map(post => post.id)) + 1;
    }
    // return this.posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 11;
  }

  submit(body: string): void {
    const newPost = new Post();
    newPost.body = body;
    newPost.id = this.genId(this.posts);
    newPost.selected = false;
    console.log(`${newPost.body}をSubmitします`)
    this.postService.submitPost(newPost);
    if (this.posts == null) {
      this.posts = [newPost];
    } else {
      this.posts.push(newPost);
      }
    this.newMessageBody = '';
    this.getPosts();
  }

  onResult(text: string) {
    this.newMessageBody = text;
    this.submit(text);
  }

  selectAll(): void {
    for (const post of this.posts) {
      post.selected = true;
    }
  }

  deleteSelected(): void {
    for (const post of this.posts) {
      if (post.selected) {
        this.postService.deletePost(post);
      }
    }
    this.getPosts();
  }

  getPosts(): void {
    this.posts = this.postService.getPostsFromLocal();
  }

  jumpToBottom(): void {
    const a = document.documentElement;
    const y = a.scrollHeight - a.clientHeight;
    window.scroll(0, y);
  }

  // testAdd(): void {
  //   localStorage.setItem('111', '{"selected":false,"body":"testAdd1","id":111}');
  //   localStorage.setItem('222', '{"selected":false,"body":"testAdd2","id":222}');
  //   localStorage.setItem('333', '{"selected":false,"body":"testAdd2","id":333}');
  //   localStorage.setItem('444', '{"selected":false,"body":"testAdd2","id":444}');
  //   this.getPosts();
  // }
}
