import { Component, OnInit } from '@angular/core';
import { YoutubeDalService } from '../../services/youtube-dal.service';
import {PlayerControlService} from "./player-control.service";
import {PlayerState} from "./player-state.enum";
import {TrackModel} from "../main-view/track/track-model";
import {PlayerAction} from "./player-action.enum";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {

  public currentPlayingTrack: TrackModel;
  public playerState = PlayerState;
  public playerAction = PlayerAction;

  constructor(private youtubeDalService: YoutubeDalService, private playerControl: PlayerControlService) { }

  ngOnInit() {
    this.youtubeDalService.generate();
  }

  callToAction(playerAction: PlayerAction) {
    let self = this;
    self.playerControl.callToAction(playerAction);
  }
}
