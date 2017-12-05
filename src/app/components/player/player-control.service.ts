import { Injectable } from '@angular/core';
import { TrackModel } from "../main-view/track/track-model";
import {PlayerState} from "./player-state.enum";
import {Youtube} from "../../services/data-providers/youtube";
import {YoutubeDalService} from "../../services/youtube-dal.service";
import {PlayerAction} from "./player-action.enum";
import * as moment from "moment";

const Barn = require("barn");

@Injectable()
export class PlayerControlService {

  private _currentPlayingTrack: TrackModel = new TrackModel();

  public currentPlayerState: PlayerState = PlayerState.NONE;
  public playerProgress = {
    total: "00:00",
    current: "00:00",
    percent: 0
  };
  public barn;
  public timer;

  constructor(private yt: Youtube, private ytDal: YoutubeDalService) {
    this.barn = new Barn(localStorage);
  }

  set currentPlayingTrack(value: TrackModel) {
    let self = this;
    self.yt.doSearch(`${value.artist} - ${value.title}`).subscribe((res) => {
      let trackItems = self.yt.translateRequest(res),
        currentItem = trackItems[0];

      value.videoId = currentItem.videoId;
      self.ytDal.setVideo(value);
      self._currentPlayingTrack = value;

      // self.barn.sadd("history", JSON.stringify(value));
      // console.log(self.barn.smembers("history"));

      self.callToAction(PlayerAction.PLAY);
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
    let self = this;
    debugger;
    self.timer = setInterval(() => {
      //self.playerProgress.total = moment(self.ytDal.player.getDuration(), "mm").format("mm:ss");
      let duration = self.ytDal.player.getDuration();
      let current = self.ytDal.player.getCurrentTime();
      self.playerProgress.total = self.formatTime(duration);
      self.playerProgress.current = self.formatTime(current);

      if(duration && current) {
        self.playerProgress.percent = (current / duration) * 100;
      }
    }, 1000);
  }

  resetTimer() {
    let self = this;
    clearTimeout(self.timer);
  }

  formatTime(time: number) {
    time = Math.round(time);
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    let minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    let secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesFormatted}:${secondsFormatted}`
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
        self.resetTimer();
        break;

      case PlayerAction.PAUSE:
        self.ytDal.player["pauseVideo"]();
        self.state = PlayerState.PAUSED;
        self.resetTimer();
        break;
    }
  }

}
