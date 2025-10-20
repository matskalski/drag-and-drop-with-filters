import { Component, input } from '@angular/core';
import { ColumnModel } from './column.model';

@Component({
  selector: 'app-column',
  imports: [],
  templateUrl: './column.html',
  styleUrl: './column.css'
})
export class Column {
  protected user = input.required<ColumnModel>()
}
