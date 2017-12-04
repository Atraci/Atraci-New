import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainViewComponent } from "./main-view.component";
import { MainViewRoutingModule } from "./main-view-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { Lastfm } from "../../services/data-providers/lastfm";
import { Youtube } from "../../services/data-providers/youtube";
import { Itunes } from "../../services/data-providers/itunes";
import { Soundcloud } from "../../services/data-providers/soundcloud";
import { FormsModule } from '@angular/forms';
import { TrackComponent } from './track/track.component';

@NgModule({
  imports: [CommonModule, MainViewRoutingModule, BrowserAnimationsModule, FormsModule],
  exports: [],
  declarations: [MainViewComponent, SearchComponent, TrackComponent],
  providers: [ Youtube, Lastfm, Itunes, Soundcloud ],
})
export class MainViewModule { }
