import {Component, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {PostsComponent} from '../posts/posts.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  modalRef: BsModalRef;
  text: string;

  constructor(private modalService: BsModalService,
              private  postComponent: PostsComponent) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onOk(): void {
    this.postComponent.onResult(this.text);  // 入力されたテキストを渡す
    this.modalRef.hide();
    this.text = '';
  }
}
