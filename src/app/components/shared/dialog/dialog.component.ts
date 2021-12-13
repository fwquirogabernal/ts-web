import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Output() confirmAction: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  close():void {
    
  }
  confirm():void{
    
    this.confirmAction.emit();
  }
  ngOnInit(): void {
  }

}
