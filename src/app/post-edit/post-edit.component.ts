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

  constructor(private  route: ActivatedRoute,
              private postService: PostService,
              private location: Location,
  ) {
  }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.post = this.postService.getPost(id);
  }

  goBack(): void {
    this.location.back();
  }

  update(post: Post): void {
    this.postService.updatePost(post);
  }

  delete(post: Post): void {
    this.postService.deletePost(post);
    this.goBack();
  }
}
