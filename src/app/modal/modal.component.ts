import {Component, EventEmitter, Input, Output} from '@angular/core';


/** モーダルコンポーネント */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  /** モーダルディレクティブを保持する */
  @Input()
  modal: any;

  /** モーダルが閉じられた時のイベント */
  @Output()
  close: EventEmitter<string> = new EventEmitter<string>();

  /** 入力値を保持しておくプロパティ */
  text = '';

  /** OK ボタン押下時は (close) イベントを発火させつつモーダルを閉じる */
  onOk(): void {
    this.close.emit(this.text);  // 入力されたテキストを渡す
    this.modal.hide();
  }

  /** No ボタンや「×」ボタンなど : ただモーダルを閉じるだけ */
  closeModal(): void {
    this.modal.hide();
  }
}
