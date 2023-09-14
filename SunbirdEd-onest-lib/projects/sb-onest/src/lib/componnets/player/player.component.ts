import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { samplePlayerConfig } from './videoPlayerConfig';
import { playerConfig } from './pdfPlayerConfig';

@Component({
  selector: 'lib-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() searchContentList:any
  @ViewChild('video') video: any;
  @ViewChild('pdf') pdf: any;
  videoPlayer: any;
  constructor() { }

  ngOnInit(): void {
    console.log('ss',this.searchContentList)
  }

  ngAfterViewInit() {
    if(this.searchContentList.mimeType === 'video/mp4' || this.searchContentList.mimeType ==='video/webm') {
      this.loadVideoPlayer()
    } else if(this.searchContentList.mimeType === 'video/mp4') {
      this.loadPDFPlayer()
    } else {
      alert("unable to player ")
    }
  }

  loadPDFPlayer() {
    const pdfElement = document.createElement('sunbird-pdf-player');
    pdfElement.setAttribute('player-config', JSON.stringify(playerConfig));

    pdfElement.addEventListener('playerEvent', (event) => {
      console.log("On playerEvent", event);
    });

    pdfElement.addEventListener('telemetryEvent', (event) => {
      console.log("On telemetryEvent", event);
    });
    this.pdf.nativeElement.append(pdfElement);
  }

  loadVideoPlayer() {
    this.videoPlayer = document.createElement('sunbird-video-player');
    samplePlayerConfig.metadata = { 
        mimeType: this.searchContentList.mimeType,
        artifactUrl: this.searchContentList.artifactUrl,
        identifier: this.searchContentList.identifier,
        name: this.searchContentList.title,
        streamingUrl:this.searchContentList.artifactUrl,
        }
    this.videoPlayer.setAttribute('player-config',JSON.stringify(samplePlayerConfig) );

    this.videoPlayer.addEventListener('playerEvent', (event: any) => {
      console.log("On playerEvent", event);
    });

    this.videoPlayer.addEventListener('telemetryEvent', (event: any) => {
      console.log("On telemetryEvent", event);
    });
    this.video.nativeElement.append(this.videoPlayer);
  }

}
