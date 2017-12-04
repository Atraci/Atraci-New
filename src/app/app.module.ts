import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { MainViewModule } from './components/main-view/main-view.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';


import { YoutubeDalService } from './services/youtube-dal.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SidemenuComponent
  ],
  imports: [
    MainViewModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    YoutubeDalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
