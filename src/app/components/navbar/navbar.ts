import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../cart/cart';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,Cart],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  cartService = inject(CartService);
  
  isMobileMenuOpen = signal(false);
  showCart = signal(false);

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}