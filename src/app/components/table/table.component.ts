import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Observable, of, Subject } from 'rxjs';
import { tap, debounceTime, pluck } from 'rxjs/operators';
import { PageRow } from 'src/app/models/pagerow.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';

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
    // 'akred',
    // 'date'
  ];
  size: Observable<number>;
  dataSource: Observable<PageRow[]>;
  searchWord: string = '';
  search$: Subject<void> = new Subject<void>();
  lastSize: number = 20;

  ngOnInit() {
    this.updateGrid(20, 0);
    this.search$.pipe(debounceTime(500)).subscribe(() => {
      this.updateGrid(this.lastSize, 0, this.searchWord);
    });
  }

  changePage(e) {
    this.updateGrid(e.pageSize, e.pageIndex, this.searchWord);
    this.lastSize = e.pageSize;
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

  private updateGrid(size: number, page: number, searchWord: string = '') {
    this.dataSource = this.httpClient.getPage(size, page, searchWord)
      .pipe(tap(data => this.size = of(data.items)), pluck('rows'));
  }
}
