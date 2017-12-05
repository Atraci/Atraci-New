import { Injectable } from '@angular/core';
import { TrackModel } from "../main-view/track/track-model";
import {PlayerState} from "./player-state.enum";

@Injectable()
export class PlayerControlService {

  public currentPlayingTrack: TrackModel = new TrackModel();
  private currentPlayerState: PlayerState = PlayerState.NONE;

  constructor() {

  }
  set state(state: PlayerState) {
    console.log("Player state changed:", state);
    this.currentPlayerState = state;
  }

  get state() {
    return this.currentPlayerState;
  }

}
