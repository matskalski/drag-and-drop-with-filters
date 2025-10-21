import { Component, input } from '@angular/core';
import { ColumnModel } from './column.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-column',
  imports: [MatCheckboxModule],
  templateUrl: './column.html',
  styleUrl: './column.css'
})
export class Column {
  column = input.required<ColumnModel>()
}
