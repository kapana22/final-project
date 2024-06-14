import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input() pageSize = 5; // Default page size set to 5
  @Input() pageIndex = 1; // Default page index set to 1
  @Input() total = 0;
  @Input() sizeOptions: number[] = [5, 10, 15]; // Page size options

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageIndexChange = new EventEmitter<number>();

  previousPage() {
    if (this.pageIndex > 1) {
      this.pageIndexChange.emit(this.pageIndex - 1);
    }
  }

  nextPage() {
    if (this.pageIndex < this.lastPage()) {
      this.pageIndexChange.emit(this.pageIndex + 1);
    }
  }

  lastPage(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changePageSize() {
    this.pageSizeChange.emit(this.pageSize);
  }
}