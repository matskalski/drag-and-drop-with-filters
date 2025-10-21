import { ColumnsService } from './column/columns.service';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ListFilterPipe } from './list-filter.pipe';
import { ColumnModel } from './column/column.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Column } from './column/column';

@Component({
  selector: 'app-root',
  imports: [
    Column,
    CdkDropList,
    CdkDrag,
    MatInputModule,
    ListFilterPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  nonDisplayedColumns: ColumnModel[] = [];
  displayedColumns: ColumnModel[] = [];

  nonDisplayeFilterText: string = '';
  displayedFilterText: string = '';

  //sztuczny twór konieczny do wymuszenia przeliczenia pipa za każdym razem
  //bez tego wpisanie drugi raz tej samej wartości, w tym pustej,
  //nie spowodowałoby trigerwania pipe'a
  triggerPipe = 0;

  private columnsService = inject(ColumnsService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.columnsService.getColumns()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(cols => {
        this.nonDisplayedColumns = cols.filter(col => !col.isDisplayed);
        this.displayedColumns = cols.filter(col => col.isDisplayed);
      });
  };


  drop(event: CdkDragDrop<ColumnModel[]>) {
    if (event.previousContainer === event.container) {
      //zmiana kolejności w obrębie jednej listy
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //przenoszenie między listami
      let itemId = event.previousContainer.data[event.previousIndex]
      console.log(itemId)

      let from: ColumnModel[];
      let to: ColumnModel[];

      if (event.previousContainer.id === 'nonDisplayedColumnsList') {
        from = this.nonDisplayedColumns;
        to = this.displayedColumns;
      }
      else {
        from = this.displayedColumns;
        to = this.nonDisplayedColumns;
      }

      let itemIndex = from.findIndex((x) => x == itemId);
      from.splice(itemIndex, 1);
      to.splice(event.currentIndex, 0, itemId);
    }

    this.triggerPipe++;
  }

  filterNonDisplayedColumns(e: Event) {
    this.nonDisplayeFilterText = (e.target as HTMLInputElement).value
  }

  filterDisplayedColumns(e: Event) {
    this.displayedFilterText = (e.target as HTMLInputElement).value
  }
}
