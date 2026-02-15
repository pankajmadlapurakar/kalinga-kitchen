import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, Cart],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  cartService = inject(CartService);
  
  isMobileMenuOpen = signal(false);
  showCart = signal(false);

  toggleMenu() {
    this.isMobileMenuOpen.update(v => !v);
    // Close cart when opening mobile menu
    if (this.showCart()) {
      this.showCart.set(false);
    }
  }

  toggleCart() {
    this.showCart.update(v => !v);
    // Close mobile menu when opening cart
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
    }
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }

  closeCart() {
    this.showCart.set(false);
  }
}