// import { Component, inject, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { toSignal } from '@angular/core/rxjs-interop';

// import { Timestamp } from '@angular/fire/firestore';
// import { SpecialsService } from '../../../services/specials-service';

// @Component({
//   selector: 'app-todays-specials',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <section class="py-12 bg-[#fff8f0]">
//       <div class="max-w-7xl mx-auto px-4">
//         <div class="text-center mb-10">
//           <h2 class="text-3xl md:text-4xl font-bold text-[#8B0000] mb-2"> Specials</h2>
//           <div class="w-24 h-1 bg-[#ee8c2b] mx-auto"></div>
//         </div>

//         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           @for (special of todaysSpecials(); track special.id) {
//             <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//               <div class="p-6">
//                 <div class="flex justify-between items-start mb-2">
//                   <h3 class="text-xl font-bold text-gray-800">{{ special.title }}</h3>
//                   <span class="text-[#8B0000] font-bold text-lg">\${{ special.price }}</span>
//                 </div>
//                 <p class="text-gray-600 mb-4">{{ special.description }}</p>
//                 <span class="text-xs font-semibold px-2 py-1 bg-[#ee8c2b] text-white rounded uppercase">
//                   {{ special.type }}
//                 </span>
//               </div>
//             </div>
//           } @empty {
//             <div class="col-span-full text-center text-gray-500">
//               Check back later for our daily updates!
//             </div>
//           }
//         </div>
//       </div>
//     </section>
//   `
// })
// export class TodaysSpecialsComponent {
//   private specialsService = inject(SpecialsService);
  
//   // Get raw list from service
//   private allSpecials = toSignal(this.specialsService.getUpcomingSpecials(), { initialValue: [] });

//   // Filter for Today + Future
//   todaysSpecials = computed(() => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     return this.allSpecials()
//       .filter(s => {
//         if (!s.date) return false;
//         // Handle Firestore Timestamp
//         const dateObj = s.date instanceof Timestamp ? s.date.toDate() : new Date(s.date as any);
//         dateObj.setHours(0, 0, 0, 0);
        
//         return dateObj.getTime() >= today.getTime();
//       })
//       .sort((a, b) => {
//         const dateA = a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date as any);
//         const dateB = b.date instanceof Timestamp ? b.date.toDate() : new Date(b.date as any);
//         return dateA.getTime() - dateB.getTime();
//       });
//   });
// }
import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Timestamp } from '@angular/fire/firestore';
import { SpecialsService } from '../../../services/specials-service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-todays-specials',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="py-20 bg-[#fff8f0] relative overflow-hidden">
      <!-- Decorative background element -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
         <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#ee8c2b] blur-3xl"></div>
         <div class="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-[#8B0000] blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <span class="inline-block py-1 px-3 rounded-full bg-[#ee8c2b]/10 text-[#ee8c2b] font-bold tracking-wider uppercase text-xs mb-3">
            Fresh from the Kitchen
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-[#2d2d2d] mb-4 font-serif">
            Today's <span class="text-[#8B0000]">Specials</span>
          </h2>
          <p class="text-stone-500 max-w-2xl mx-auto text-lg">
            Hand-picked daily favorites prepared with authentic spices and love.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (special of todaysSpecials(); track special.id) {
            <div class="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full overflow-hidden hover:-translate-y-2">
              <!-- Image Section -->
              <div class="relative h-64 overflow-hidden">
                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                @if (special.imageUrl) {
                  <img [src]="special.imageUrl" [alt]="special.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                } @else {
                  <div class="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">
                    <span class="material-icons text-6xl">restaurant_menu</span>
                  </div>
                }
                
                <!-- Date Badge -->
                <div class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm flex flex-col items-center border border-white/50">
                  <span class="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {{ getDate(special.date) | date:'MMM' }}
                  </span>
                  <span class="text-2xl font-black text-[#8B0000] leading-none mt-0.5">
                    {{ getDate(special.date) | date:'dd' }}
                  </span>
                </div>

                <!-- Type Badge -->
                 <div class="absolute top-4 right-4 z-20">
                  <span class="px-3 py-1.5 text-[10px] font-bold text-white rounded-full shadow-lg uppercase tracking-wider backdrop-blur-md"
                        [ngClass]="special.type === 'daily' ? 'bg-[#ee8c2b]/90' : 'bg-[#8B0000]/90'">
                    {{ special.type }}
                  </span>
                </div>
              </div>

              <!-- Content Section -->
              <div class="p-8 flex flex-col flex-grow relative">
                <!-- Price Tag Floating -->
                <div class="absolute -top-6 right-8 bg-[#8B0000] text-white px-4 py-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300 z-20">
                   <span class="font-bold text-lg">\${{ special.price }}</span>
                </div>

                <div class="mt-2 mb-4">
                  <h3 class="text-2xl font-bold text-gray-800 group-hover:text-[#8B0000] transition-colors font-serif mb-2">
                    {{ special.title }}
                  </h3>
                  <div class="w-12 h-1 bg-[#ee8c2b] rounded-full opacity-50 group-hover:w-20 transition-all duration-500"></div>
                </div>
                
                <p class="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
                  {{ special.description }}
                </p>

                <button (click)="addToCart(special)" class="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300
                             bg-stone-50 text-stone-700 border border-stone-200 
                             group-hover:bg-[#8B0000] group-hover:text-white group-hover:border-[#8B0000] group-hover:shadow-lg
                             flex items-center justify-center gap-2">
                  <span>Order Now</span>
                  <span class="material-icons text-sm transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                </button>
              </div>
            </div>
          } @empty {
            <div class="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <div class="w-24 h-24 bg-[#fff8f0] rounded-full flex items-center justify-center mb-6 shadow-inner">
                <span class="material-icons text-4xl text-[#ee8c2b]">restaurant</span>
              </div>
              <h3 class="text-2xl font-bold text-stone-800 mb-3 font-serif">Menu Updating...</h3>
              <p class="text-stone-500 max-w-md mx-auto text-lg">Our chefs are crafting something special. Please check back soon!</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Toast Notification -->
    @if (showToast()) {
      <div class="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 opacity-100">
        <div class="bg-green-500 rounded-full p-1 flex items-center justify-center">
          <span class="material-icons text-sm font-bold text-white">check</span>
        </div>
        <span class="font-medium">{{ toastMessage() }}</span>
      </div>
    }
    <!-- <section class="py-16 bg-gradient-to-b from-[#fff8f0] to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-[#ee8c2b] font-bold tracking-wider uppercase text-sm animate-fade-in">Fresh from the Kitchen</span>
          <h2 class="text-4xl md:text-5xl font-bold text-[#8B0000] mt-2 mb-4 font-serif">Upcoming Specials</h2>
          <div class="w-24 h-1.5 bg-[#ee8c2b] mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (special of todaysSpecials(); track special.id) {
            <div class="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full transform hover:-translate-y-1">
              
              <div class="relative h-56 overflow-hidden bg-gray-100">
                @if (special.imageUrl) {
                  <img [src]="special.imageUrl" [alt]="special.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                } @else {
                  <div class="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">
                    <span class="material-icons text-6xl">restaurant_menu</span>
                  </div>
                }
                
                
                <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-stone-100 flex flex-col items-center min-w-[60px]">
                  <span class="text-xs font-bold text-stone-500 uppercase tracking-wide">
                    {{ getDate(special.date) | date:'MMM' }}
                  </span>
                  <span class="text-xl font-black text-[#8B0000] leading-none">
                    {{ getDate(special.date) | date:'dd' }}
                  </span>
                </div>

                 <div class="absolute bottom-4 left-4">
                  <span class="px-3 py-1 text-[10px] font-bold text-white rounded-full shadow-sm uppercase tracking-wider"
                        [ngClass]="special.type === 'daily' ? 'bg-[#ee8c2b]' : 'bg-[#8B0000]'">
                    {{ special.type }}
                  </span>
                </div>
              </div>

              <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-xl font-bold text-gray-800 group-hover:text-[#8B0000] transition-colors line-clamp-1 font-serif">
                    {{ special.title }}
                  </h3>
                  <span class="text-[#8B0000] font-bold text-xl whitespace-nowrap ml-2">
                    \${{ special.price }}
                  </span>
                </div>
                
                <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {{ special.description }}
                </p>

                <button class="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300
                             bg-stone-50 text-stone-600 hover:bg-[#8B0000] hover:text-white hover:shadow-lg border border-stone-200 hover:border-[#8B0000] flex items-center justify-center gap-2 group-hover:bg-[#8B0000] group-hover:text-white">
                  <span>Order Now</span>
                  <span class="material-icons text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          } @empty {
            <div class="col-span-full flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-stone-200">
              <div class="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                <span class="material-icons text-3xl text-stone-400">soup_kitchen</span>
              </div>
              <h3 class="text-xl font-bold text-stone-700 mb-2">No Specials Available</h3>
              <p class="text-stone-500 max-w-md mx-auto">We're cooking up something delicious! Check back later for our daily updates.</p>
            </div>
          }
        </div>
      </div>
    </section> -->
  `
})
export class TodaysSpecialsComponent {
  private specialsService = inject(SpecialsService);
  private cartService = inject(CartService);

  showToast = signal(false);
  toastMessage = signal('');
  
  // Get raw list from service
  private allSpecials = toSignal(this.specialsService.getUpcomingSpecials(), { initialValue: [] });

  // Filter for Today + Future
  todaysSpecials = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.allSpecials()
      .filter(s => {
        if (!s.date) return false;
        // Handle Firestore Timestamp
        const dateObj = s.date instanceof Timestamp ? s.date.toDate() : new Date(s.date as any);
        dateObj.setHours(0, 0, 0, 0);
        
        return dateObj.getTime() >= today.getTime();
      })
      .sort((a, b) => {
        const dateA = a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date as any);
        const dateB = b.date instanceof Timestamp ? b.date.toDate() : new Date(b.date as any);
        return dateA.getTime() - dateB.getTime();
      });
  });

  addToCart(special: any) {
    this.cartService.addToCart({
      id: special.id,
      name: special.title,
      price: special.price,
      quantity: 1,
      details: 'Special'
    });
    this.toastMessage.set(`${special.title} added to cart!`);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  getDate(date: any): Date {
    if (date instanceof Timestamp) {
      return date.toDate();
    }
    return new Date(date);
  }
}