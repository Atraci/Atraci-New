import { Injectable } from '@angular/core';
import {TrackModel} from "../components/main-view/track/track-model";

@Injectable()
export class YoutubeDalService {

  public player;
  public videoLoadingDone: boolean = false;

  private eventRegistrations = {
    1: [], // PLAYING
    2: []  // PAUSED
  };

  constructor() {

  }

  setVideo(track: TrackModel) {
    let self = this;
    if(self.player) {
      this.player.loadVideoById(track.videoId);
    }
  }

  generate() {
    let self = this;
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window["onYouTubeIframeAPIReady"] = function() {
      self.player = new window["YT"].Player('player', {
        height: '146',
        width: '240',
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          'modestbranding': 1,
          'showinfo' : 0,
          'iv_load_policy' : 3,
          'rel' : 0
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };

    function onPlayerReady(event) {}

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    self.videoLoadingDone = false;
    function onPlayerStateChange(event) {
      if (event.data == window["YT"].PlayerState.PLAYING && !self.videoLoadingDone) {
        self.videoLoadingDone = true;
      }

      self.callToEventRegisters(event.data);
    }

    function stopVideo() {
      self.player.stopVideo();
    }
  }

  callToEventRegisters(event) {
    let self = this;
    let currentEvent = self.eventRegistrations[event];
    if(currentEvent) {
      for(let f in currentEvent) {
        currentEvent[f]();
      }
    }
  }

  registerToYTEvent(event, callback: Function) {
    let self = this;
    if(!self.eventRegistrations[event]) {
      self.eventRegistrations[event] = [];
    }

    self.eventRegistrations[event].push(callback);
  }

}
