import { Component, OnInit, Input } from '@angular/core';
import { TrackModel } from "./track-model";
import {PlayerControlService} from "../../player/player-control.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() trackModel: TrackModel;

  constructor(private playerController: PlayerControlService) { }

  ngOnInit() {
  }

  isCurrentPlayingItem(): boolean {
    let self = this;
    return self.trackModel === self.playerController.currentPlayingTrack;
  }

  itemClicked(): void {
    let self = this;

    if(self.trackModel === self.playerController.currentPlayingTrack) {
      return;
    }

    self.playerController.currentPlayingTrack = self.trackModel;
  }
}
