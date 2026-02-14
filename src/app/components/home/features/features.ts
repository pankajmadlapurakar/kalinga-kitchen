import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../services/menu';

@Component({
  selector: 'app-features',
  imports: [RouterLink],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  private menuService = inject(MenuService);
  todaysSpecials = this.menuService.todaysSpecials;
}
