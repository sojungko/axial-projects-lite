import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { ProjectService } from './project.service';
import { AppComponent } from './app.component';
import { CreateNewComponent } from './create-new.component';
import { ProjectsComponent } from './projects.component';
import { ProjectEditComponent } from './project-edit.component';
import { ShortCutDirective } from './shortcut.directive';
import { CommaSeparatedNumberPipe } from './numbers.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'create-new', component: CreateNewComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    InMemoryWebApiModule.forRoot(InMemoryDataService)  
  ],
  declarations: [
    AppComponent,
    CreateNewComponent,
    ProjectsComponent,
    ProjectEditComponent,
    ShortCutDirective,
    CommaSeparatedNumberPipe
  ],
  providers: [ ProjectService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
