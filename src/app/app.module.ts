import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MaterialModule } from './modules/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { SearchhistoryComponent } from './components/searchhistory.component';
import { SearchparamsComponent } from './components/searchparams.component';
import { ResultsComponent } from './components/results.component';
import { Searchsvc } from './searchHistory';


const ROUTES: Routes = [
  {path: '', component: MainComponent},
  {path: 'searchhistory', component: SearchhistoryComponent},
  {path: 'searchparams', component: SearchparamsComponent},
  {path: 'search/:type/:q', component: ResultsComponent},
  {path: '**', redirectTo: "/", pathMatch: 'full'},
]

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchhistoryComponent,
    SearchparamsComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [Searchsvc],
  bootstrap: [AppComponent]
})
export class AppModule { }
