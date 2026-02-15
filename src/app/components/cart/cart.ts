import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html'
})
export class Cart {
  cartService = inject(CartService);
  
  // Regular properties for ngModel (not signals)
  customerName = '';
  customerPhone = '';
  customerAddress = '';
  
  readonly businessNumber = '918830759329'; 

  isValid() {
    return this.customerName.trim() !== '' && 
           this.customerPhone.trim() !== '' && 
           this.cartService.items().length > 0;
  }

  placeOrder() {
    if (!this.isValid()) {
      return;
    }

    const itemsList = this.cartService.items().map(i => 
      `- ${i.quantity}x ${i.name} ${i.details ? '(' + i.details + ')' : ''}: $${(i.price * i.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `*New Order from Kalinga Kitchen App*\n--------------------------------\n*Customer:* ${this.customerName}\n*Phone:* ${this.customerPhone}\n*Address/Notes:* ${this.customerAddress}\n\n*Order Details:*\n${itemsList}\n\n*Total: $${this.cartService.total().toFixed(2)}*\n--------------------------------`;
    
    const url = `https://wa.me/${this.businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Optional: Clear cart and form after order
    // this.cartService.clearCart();
    // this.customerName = '';
    // this.customerPhone = '';
    // this.customerAddress = '';
  }
}