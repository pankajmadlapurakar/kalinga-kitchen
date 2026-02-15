import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {

    id: string;      // Unique ID (e.g., 'curry-chicken-large')
  name: string;    // e.g., 'Chicken Curry'
  price: number;   // e.g., 12.50
  quantity: number;
  details?: string; // e.g., 'Large', 'Spicy'
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal to hold the list of items in the cart
  readonly items = signal<CartItem[]>([]);

  // Computed signal to automatically calculate the total price
  readonly total = computed(() => 
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  // Computed signal for the total number of items (useful for a cart badge)
  readonly count = computed(() => 
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(item: CartItem) {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        // If item exists, just increment quantity
        return currentItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      // Otherwise add new item
      return [...currentItems, { ...item, quantity: 1 }];
    });
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.items.update(items => items.filter(i => i.id !== itemId));
      return;
    }
    this.items.update(items => items.map(i => i.id === itemId ? { ...i, quantity } : i));
  }

  clearCart() {
    this.items.set([]);
  }
}