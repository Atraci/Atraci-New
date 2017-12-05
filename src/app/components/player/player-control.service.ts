import { Injectable } from '@angular/core';
import { TrackModel } from "../main-view/track/track-model";
import {PlayerState} from "./player-state.enum";
import {Youtube} from "../../services/data-providers/youtube";
import {YoutubeDalService} from "../../services/youtube-dal.service";
import {PlayerAction} from "./player-action.enum";

@Injectable()
export class PlayerControlService {

  private _currentPlayingTrack: TrackModel = new TrackModel();

  public currentPlayerState: PlayerState = PlayerState.NONE;
  public timer;

  constructor(private yt: Youtube, private ytDal: YoutubeDalService) {

  }

  set currentPlayingTrack(value: TrackModel) {
    let self = this;
    self.yt.doSearch(`${value.artist} - ${value.title}`).subscribe((res) => {
      let trackItems = self.yt.translateRequest(res),
        currentItem = trackItems[0];

      value.videoId = currentItem.videoId;
      self.ytDal.setVideo(value);
      self._currentPlayingTrack = value;

      self.state = PlayerState.PLAYING;
    });
  }

  get currentPlayingTrack() {
    return this._currentPlayingTrack;
  }

  set state(state: PlayerState) {
    switch(state) {
      case PlayerState.STOPPED :
        this.ytDal.player["stopVideo"]();
        break;
    }
    this.currentPlayerState = state;
  }

  get state() {
    return this.currentPlayerState;
  }

  initTimer() {
    debugger;
    let self = this;
    // while(true) {
    //   console.log("self.ytDal.videoLoadingDone", self.ytDal.videoLoadingDone);
    //   //self.timer = self.ytDal.player;
    // }
  }

  callToAction(action: PlayerAction) {
    let self = this;
    switch(action) {
      case PlayerAction.PLAY:
        self.ytDal.player["playVideo"]();
        self.state = PlayerState.PLAYING;
        self.initTimer();
        break;

      case PlayerAction.STOP:
        self.ytDal.player["stopVideo"]();
        self.state = PlayerState.STOPPED;
        break;

      case PlayerAction.PAUSE:
        self.ytDal.player["pauseVideo"]();
        self.state = PlayerState.PAUSED;
        break;
    }
  }

}
