import {Component, OnInit} from '@angular/core';
import {Post} from '../post';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {PostService} from '../post.service';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  posts: Post[];
  result = '';

  constructor(private  route: ActivatedRoute,
              private postService: PostService,
              private location: Location,
  ) {
  }

  ngOnInit() {
    this.getPost();
    this.getPosts();
  }

  getPost(): void {
    // console.log('test');
    // console.log(this.route.snapshot.paramMap.get('id'));
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
      .subscribe(post => {
        console.log('post-editコンポーネント：' + post.id + post.body);
        this.post = post;
      });
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.postService.updatePost(this.post)
      .subscribe(() => this.goBack());
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(p => p !== post); // 引数のpostオブジェクトでないものだけを、postsとして再定義
    this.postService.deletePost(post).subscribe();
    alert(`deleted Message: ${post.body}`);
  }
}
