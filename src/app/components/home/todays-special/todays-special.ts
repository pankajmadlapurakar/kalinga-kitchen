import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // Modern Signal Bridge
import { MenuService } from '../../../services/menu';


@Component({
  selector: 'app-todays-special',
  standalone: true,
  template: `
    <!-- @if (special(); as item) {
      <section class="py-20 bg-primary/5">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <span class="text-primary font-bold tracking-widest uppercase text-sm">Chef's Recommendation</span>
            <h2 class="text-4xl font-bold text-stone-900 mt-2">Today's Special</h2>
          </div>

          <div class="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div class="md:w-1/2 h-64 md:h-auto relative">
              <img [src]="item.imageUrl" [alt]="item.title" class="w-full h-full object-cover">
            </div>
            
            <div class="md:w-1/2 p-10 flex flex-col justify-center">
              <h3 class="text-3xl font-bold text-stone-900 mb-2">{{ item.title }}</h3>
              <p class="text-stone-600 text-lg mb-6">{{ item.description }}</p>
              <div class="flex items-center gap-6">
                <span class="text-3xl font-bold text-deep-red">\${{ item.price }}</span>
                <button class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    } -->
  `
})
export class TodaysSpecialComponent {
  private menuService = inject(MenuService);
  // Converts Observable to Signal automatically
  // special = toSignal(this.menuService.getTodaysSpecial());
}