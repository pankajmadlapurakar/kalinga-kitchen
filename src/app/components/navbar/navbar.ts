import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html'
})
export class NavbarComponent {
  // 1. The state variable (true = open, false = closed)
  isMobileMenuOpen = signal(false);

  // 2. Function to toggle the state
  toggleMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  // 3. Function to close menu when a link is clicked
  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}