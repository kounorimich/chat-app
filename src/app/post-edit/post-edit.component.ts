import { Component, OnInit, Input } from '@angular/core';
import {Post} from '../post';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  @Input() post: Post;
  posts: Post[];
  constructor(private  route: ActivatedRoute,
              private postService: PostService,
              private location: Location
  ) { }

  ngOnInit() {
    this.getPost();
    this.getPosts();
  }
  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => {
        console.log('getPostの実行 id : ' + post.id + '  ' + post.body);
        this.post = post;
      });
  }
  getPosts(): void {
    this.postService.getPosts().subscribe( posts => this.posts = posts);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.postService.updatePost(this.post)
      .subscribe(() => this.goBack());
  }
  delete(post: Post): void {
    this.posts = this.posts.filter( p => p !== post); // 引数のpostオブジェクトでないものだけを、postsとして再定義
    this.postService.deletePost(post).subscribe();
    alert(`deleted Message: ${post.body}`);
  }
}