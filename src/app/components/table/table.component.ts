import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Observable, pipe, of, Subject } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { PageRow } from 'src/app/models/pagerow.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'university',
    // 'cipher',
    'prof',
    'doc',
    // 'proc',
    // 'stat',
    // 'akred',
    // 'date'
  ];
  size: Observable<number>;
  dataSource: Observable<PageRow[]>;
  searchWord: string = '';
  search$: Subject<void> = new Subject<void>();
  lastSize = 20;

  ngOnInit() {
    this.dataSource = this.httpClient.getPage(20, 0).pipe(tap(data => this.size = of(data.items)), map(data => data.rows));
    this.search$.pipe(debounceTime(500)).subscribe(() => {
      this.dataSource = this.httpClient.getPage(this.lastSize, 0, this.searchWord).pipe(tap(data => this.size = of(data.items)), map(data => data.rows));
    });
  }

  constructor(private httpClient: HttpClientService) { }

  changePage(e) {
    this.dataSource = this.httpClient.getPage(e.pageSize, e.pageIndex, this.searchWord).pipe(tap(data => this.size = of(data.items)), map(data => data.rows));
    this.lastSize = e.pageSize;
  }

  onKeyUp() {
    this.search$.next();
  }
}
