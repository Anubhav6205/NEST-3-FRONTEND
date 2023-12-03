// toast.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import './toast.component.css';25
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() visible: boolean = false;
  @Input() position: string = 'top-end'; // Add this line for the position
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() timer: EventEmitter<number> = new EventEmitter<number>();
  @Input() toastMessage:string=''
  @Input() headerMessage:string=''
  @Input() speed:number=25
  percentage: number = 0;

  onVisibleChange($event: boolean):void {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }
  onTimerChange($event: number):void {
    this.percentage = $event * this.speed;
  }
}
