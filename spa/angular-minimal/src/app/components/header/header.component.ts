import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() content: any;
}
