import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services-shop',
  standalone: true,
  imports: [CommonModule,NgClass,NgFor],
  templateUrl: './services-shop.component.html',
  styleUrl: './services-shop.component.css'
})
export class ServicesShopComponent {

}
