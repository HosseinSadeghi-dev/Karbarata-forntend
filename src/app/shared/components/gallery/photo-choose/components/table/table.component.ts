import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GalleryPhotoContext} from '@app/core/models';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
export interface TableData {
  multiple?: boolean,
  selected?: GalleryPhotoContext[],
  data?: GalleryPhotoContext[]
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewChecked {
  @Output() private selectedUpdated = new EventEmitter();
  @Input() set photos(value: TableData){
    // this.users = res;
    // let selectedPhotos: GalleryPhoto[] = [];
    //
    // this.data.selected.forEach(row => {
    //   selectedPhotos.push(value.data.find(i => i.id === row.id));
    // });
    this.dataSource = new MatTableDataSource<GalleryPhotoContext>(value.data);
    this.selection = new SelectionModel<GalleryPhotoContext>(value.multiple, value.selected);
  };
  // photos: GalleryPhoto[] = [];
  displayedColumns: string[] = ['select','image','name'];
  dataSource;
  selection;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() {}

  ngAfterViewChecked(): void {
    this.selectedUpdated.emit(this.selection.selected);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: GalleryPhotoContext): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
