import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  show = false;

  click() {
    this.show = !this.show;
    console.log('press');
    
  }
}
