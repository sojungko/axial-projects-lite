import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container-fluid">
      <h1>{{title}}</h1>
      <nav>
        <ul class="nav nav-tabs">
        <li role="presentation"><a routerLink="/projects">Projects</a></li>
        <li role="presentation"><a routerLink="/create-new">Create New</a></li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent  {
  title = 'AXIAL PROJECTS LITE';


}

