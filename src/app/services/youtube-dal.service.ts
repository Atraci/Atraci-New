import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeDalService {

  private readonly url: string = "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

  private readonly authScopes: string = "https://www.googleapis.com/auth/youtube.readonly";

  constructor() {

  }

  generate() {
    //return;
    // let tag = document.createElement('script');
    //
    // tag.src = "https://www.youtube.com/iframe_api";
    // let firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //
    // // 3. This function creates an <iframe> (and YouTube player)
    // //    after the API code downloads.
    // let player;
    // window["onYouTubeIframeAPIReady"] = function() {
    //   player = new window["YT"].Player('player', {
    //     height: '390',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE',
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    //   });
    // }
    //
    // // 4. The API will call this function when the video player is ready.
    // function onPlayerReady(event) {
    //   //event.target.playVideo();
    // }
    //
    // // 5. The API calls this function when the player's state changes.
    // //    The function indicates that when playing a video (state=1),
    // //    the player should play for six seconds and then stop.
    // let done = false;
    // function onPlayerStateChange(event) {
    //   if (event.data == window["YT"].PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    //   }
    // }
    // function stopVideo() {
    //   player.stopVideo();
    // }
  }

}
