import { Component, OnInit } from '@angular/core';
import {PreloadService} from '../../core/service/preload.service';
import {RevealService} from '../../core/service/reveal.service';
import {LoadingService} from '../../core/service/loading.service';
import { HistoryService } from '../../core/service/history.service';

@Component({
  selector: 'app-extension-supplement',
  templateUrl: './extension-supplement.component.html',
  styleUrls: ['./extension-supplement.component.less']
})
export class ExtensionSupplementComponent implements OnInit {

  constructor(private preload: PreloadService,
              private reveal: RevealService,
              private loading: LoadingService,
              public history: HistoryService
  ) {
  }

  ngOnInit() {
  }
  start(times: number) {
    this.loading.show('加载资源中...', `0/${times * 4}`);
    this.preload.gacha(times,
      'extension',
      ({complete, total}) => this.loading.update('加载资源中...', `${complete}/${total}`))
      .subscribe(list => {
        this.reveal.show(list);
        this.loading.close();
      });
  }
}
