import { Component, OnInit } from '@angular/core';
import { YoutubeDalService } from '../../services/youtube-dal.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private youtubeDalService: YoutubeDalService) { }

  ngOnInit() {
    this.youtubeDalService.generate();
  }

}
