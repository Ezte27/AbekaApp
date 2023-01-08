import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello! I am an Angular application 🔥</h1>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Abeka_App';
}
