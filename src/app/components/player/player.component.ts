import { Component, OnInit } from '@angular/core';
import { YoutubeDalService } from '../../services/youtube-dal.service';
import {PlayerControlService} from "./player-control.service";
import {PlayerState} from "./player-state.enum";
import {TrackModel} from "../main-view/track/track-model";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {

  public currentPlayingTrack: TrackModel;

  constructor(private youtubeDalService: YoutubeDalService, private playerControl: PlayerControlService) { }

  ngOnInit() {
    this.youtubeDalService.generate();
  }

  public play(): void {
    this.playerControl.state = PlayerState.PLAYING;
  }

  public stop(): void {
    this.playerControl.state = PlayerState.STOPPED;
  }

  public pause(): void {
    this.playerControl.state = PlayerState.PAUSED;
  }

  public next(): void {}
  public prev(): void {}
  public shuffle(): void {}
  public random(): void {}
  public loop(): void {}
  public addToPlaylist(): void {}
}
