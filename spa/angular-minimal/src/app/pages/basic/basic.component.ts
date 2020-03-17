import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  @Input() content: any;
}
