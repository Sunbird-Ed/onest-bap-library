import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { BapService } from '../../service/Bap/bap.service';
@Component({
  selector: 'lib-sb-onest',
  templateUrl: './sb-onest.component.html',
  styleUrls: ['./sb-onest.component.css']
})
export class SbOnestComponent implements OnInit {
  @ViewChild('searchbar') searchbar!: ElementRef
  searchText = '';
  searchQuery = '';
  baseUrl = '';
  toggleSearch: boolean = false;
  isPlayerInit: boolean = false;
  isContentInit: boolean = true;
  loading: boolean = false;
  selCardData: any;
  searchMessage: any;
  searchContext: any;
  landingImg = '';
  // serachList;
  searchContentList: any[] = []
  constructor(private http: HttpClient, private bapService: BapService, private onestSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.searchContentList = []
    this.searchMessage = {};
    this.searchContext = {};
  }
  searchBasedQuery() {
    console.log('searchBasedQuery', this.searchQuery)
    this.onBAPSearchCall();
  }
  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
  onClick($: any, data: any) {
    console.log($, data)

  }
  onBAPSearchCall() {
    let itemsList;
    let providerName = '';
    this.searchContentList = [];
    this.loading = true;
    this.bapService.onBAPSearchCall('https://staging.sunbirded.org/onest/bap/search?keyword=' + this.searchQuery + `&t=${Date.now()}`).subscribe((res: any) => {
      let itemsListSunbird = res.data.filter((resData: any) => resData?.message?.catalog?.providers[0]?.id === "sunbird-ed-bpp")
      let itemsListEnableIndia = res.data.filter((resData: any) => resData?.message?.catalog?.providers[0]?.id === "enable-india-bpp")
      itemsList = [...itemsListSunbird, ...itemsListEnableIndia]
      console.log(itemsList)
      if (!itemsList) {
        this.loading = false;
        this.onestSnackBar.open('No Provider found !!!', 'Close', {
          duration: 3000,
        });
      }

      this.searchContext = itemsList[0]?.context;
      this.searchMessage = itemsList[0]?.message;
      if (itemsList?.length || itemsList !== undefined) {
        providerName = itemsList[0]?.message?.catalog?.providers[0]?.id;
        itemsList = itemsList[0]?.message?.catalog?.providers[0]?.items;
        console.log('provider:', providerName);
        itemsList.map((contentRes: any) => {
          let mimeType = contentRes?.descriptor?.media_files[0]['mimetype']
          let content = {
            identifier: contentRes?.id,
            title: contentRes?.descriptor?.name,
            subTitle: contentRes?.descriptor?.sort_desc,
            img: contentRes?.descriptor?.images[0]?.url,
            price: contentRes.price.currency + ' : ' + contentRes.price.value,
            itemId: contentRes?.id,
            // artifactUrl: contentRes?.descriptor?.media,
            artifactUrl: contentRes?.descriptor.media_files[0]['value'],
            mimeType,
            provider: providerName,
            tag: contentRes?.tags[0]?.list,
            transaction_id: this.searchContext?.transaction_id,
            bpp_uri: this.searchContext?.bpp_uri,
            bpp_id: this.searchContext.bpp_id
          }
          this.searchContentList.push(content);
        })
        this.loading = false;
      }
      else {
        this.loading = false;
        this.onestSnackBar.open('No Provider found !!!', 'Close', {
          duration: 3000,
        });

      }

    }, (error) => {
      console.log(error);
      this.onestSnackBar.open('No data found', 'Close', {
        duration: 3000,
      });
      this.loading = false;

    }
    );
  }
  onBAPInitCall(cardData: any) {
    let resBody = {
      //sample
      bppUri: 'https://bpp.dsep.samagra.io',
      itemId: cardData.itemId,
      fulfillmentId: this.searchContext.bpp_uri
    }
    this.searchContentList = [];
    this.loading = true;
    this.http.post('http://localhost:3004/bap/init', resBody).subscribe((res: any) => {
      console.log('resData', res.data.responses[0].message.catalog.providers[0].items);
      let itemsList = res.data.responses[0].message.catalog.providers[0].items;
      console.log('itemsList', itemsList);
      if (itemsList) {

        this.loading = false;
      }

    }, (error) => {
      console.log(error);
      this.loading = false;

    }
    );
  }

  openPlayerPage(cardList: any) {
    // this.onBAPInitCall(cardList);
    // this.onBAPSelectCall(cardList)
    this.selCardData = cardList;
    console.log(cardList, 'test');
    this.isPlayerInit = true;
    this.isContentInit = false;
  }
  exitPlayerPage() {
    this.isPlayerInit = false;
    this.isContentInit = true;
  }

  // onBAPSelectCall(cardList: any) {
  //   let reqBody = {
  //     transaction_id: this.searchContext?.transaction_id,
  //     bpp_uri: this.searchContext?.bpp_uri,
  //     bpp_id: this.searchContext.bpp_id,
  //     item_id: cardList?.itemId,
  //     fulfillment_id: "prince123"
  //   }
  //   this.bapService.onBAPSelectCall('https://staging.sunbirded.org/onest/bap/select',reqBody).subscribe(x=> {
  //     console.log('seelct',x);
  //   });
  // }

}
