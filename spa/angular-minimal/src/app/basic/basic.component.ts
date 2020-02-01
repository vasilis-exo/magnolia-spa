import { Component } from '@angular/core';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  secondaryAreaVisible = true;

  toggleArea() {
    this.secondaryAreaVisible = !this.secondaryAreaVisible;
  }
}
