import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { samplePlayerConfig } from './videoPlayerConfig';
import { playerConfig } from './pdfPlayerConfig';
import { BapService } from '../../service/Bap/bap.service';

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
  enableSBPlayer:boolean =false;
  enablePlayBtn:boolean=true;
  listItem:any = [];
  constructor(private bapService:BapService) { }

  ngOnInit(): void {
    this.listItem = this.searchContentList.tag;
    console.log('ss',this.searchContentList)
  }

  ngAfterViewInit() {
  }

  loadPDFPlayer() {
    const pdfElement = document.createElement('sunbird-pdf-player');
    playerConfig.metadata = {
      compatibilityLevel: 4,
      artifactUrl: this.searchContentList.artifactUrl,
      identifier: this.searchContentList.identifier,
      name: this.searchContentList.title,
      streamingUrl: this.searchContentList.artifactUrl,
    }
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
  onPlayBtnClick() {
    this.enableSBPlayer = true;
    this.enablePlayBtn = false;
    this.ngOnInit();
    this.onBAPSelectCall();

    if(this.searchContentList.mimeType === 'video/mp4' || this.searchContentList.mimeType ==='video/webm') {
      this.loadVideoPlayer()
    } else if(this.searchContentList.mimeType === 'application/pdf') {
      this.loadPDFPlayer()
    } else {
      alert("unable to player ")
    }
  }
  onBAPSelectCall() {
    let reqBody = {
      transaction_id: this.searchContentList?.transaction_id,
      bpp_uri: this.searchContentList?.bpp_uri,
      bpp_id: this.searchContentList.bpp_id,
      item_id: this.searchContentList.identifier,
      fulfillment_id: "prince123"
    }
    this.bapService.onBAPSelectCall('https://staging.sunbirded.org/onest/bap/select',reqBody).subscribe(x=> {
      console.log('seelct',x);
    });
  }

}
