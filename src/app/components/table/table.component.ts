import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Observable, of, Subject } from 'rxjs';
import { tap, debounceTime, pluck } from 'rxjs/operators';
import { PageRow } from 'src/app/models/pagerow.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private httpClient: HttpClientService, public dialog: MatDialog) { }

  displayedColumns: string[] = [
    'id',
    'university',
    // 'cipher',
    'prof',
    'doc',
    // 'proc',
    // 'stat',
    'akred',
    // 'date'
  ];
  size: Observable<number>;
  dataSource: Observable<PageRow[]>;
  searchWord: string = '';
  search$: Subject<void> = new Subject<void>();
  private lastSize: number = 20;
  private lastSortSettings: Sort = { direction: 'asc', active: 'id' };

  ngOnInit() {
    this.updateGrid(20, 0);
    this.search$.pipe(debounceTime(500)).subscribe(() => {
      this.updateGrid(this.lastSize, 0, this.searchWord, this.lastSortSettings.active, this.lastSortSettings.direction);
    });
  }

  changePage(e) {
    this.updateGrid(e.pageSize, e.pageIndex, this.searchWord, this.lastSortSettings.active, this.lastSortSettings.direction);
    this.lastSize = e.pageSize;
  }

  sortData(sortSettings: Sort) {
    this.lastSortSettings = sortSettings;
    this.updateGrid(this.lastSize, 0, this.searchWord, sortSettings.active, sortSettings.direction)
  }

  showModal(row: PageRow) {
    const dialogRef = this.dialog.open(ModalPopupComponent, {
      width: '600px',
      data: row
    });
  }

  onKeyUp() {
    this.search$.next();
  }

  private updateGrid(size: number, page: number, searchWord: string = '', sortOn: string = '', sortType: string = '') {
    this.dataSource = this.httpClient.getPage(size, page, searchWord, sortOn, sortType)
      .pipe(tap(data => this.size = of(data.items)), pluck('rows'));
  }
}
