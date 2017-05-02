import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container-fluid">
      <h1>{{title}}</h1>
      <nav>
        <a routerLink="/projects">Projects</a>
        <a routerLink="/create-new">Create New</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent  {
  title = 'AXIAL PROJECTS LITE';


}
