import { Component, signal, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';

interface Pricing {
  s?: number; m?: number; l?: number;
  unit?: string; price?: number;
}

interface MenuItem {
  name: string;
  pricing?: Pricing;
  description?: string;
  image?: string; 
}

interface MenuCategory {
  id: string;
  title: string;
  icon: string;
  type: 'sized' | 'list' | 'piece';
  items: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styles: [`
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    html { scroll-behavior: smooth; }
  `]
})
export class MenuComponent {
  private scroller = inject(ViewportScroller);

  scrollTo(id: string) {
    this.scroller.setOffset([0, 180]);
    this.scroller.scrollToAnchor(id);
  }

  // COMPLETE MENU DATA FROM PDF
  menuCategories = signal<MenuCategory[]>([
    {
      id: 'appetizers-tray', title: 'Appetizers (Trays)', icon: 'tapas', type: 'sized',
      items: [
        { name: 'Chilli Chicken', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Chicken 65', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Chilli Paneer', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Chilli Mushroom', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Gobi Manchurian', pricing: { s: 50, m: 90, l: 130 } },
        { name: 'Veggie Noodles', pricing: { s: 50, m: 80, l: 120 } },
        { name: 'Chicken Noodles', pricing: { s: 50, m: 80, l: 120 } },
        { name: 'Chicken Pakoda', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Veggie Pakoda', pricing: { s: 40, m: 60, l: 90 } },
        { name: 'Punugulu', pricing: { s: 50, m: 90, l: 130 } },
        { name: 'Chilli Babycorn', pricing: { s: 50, m: 90, l: 130 } }
      ]
    },
    {
      id: 'appetizers-piece', title: 'By The Piece', icon: 'restaurant_menu', type: 'piece',
      items: [
        { name: 'Aloo Chop', pricing: { price: 1.5, unit: 'ea' }, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=200', description: 'Spiced potato fritters' },
        { name: 'Egg Chop', pricing: { price: 2, unit: 'ea' }, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=200', description: 'Deep fried egg cutlet' },
        { name: 'Vegetable Chop', pricing: { price: 4, unit: '2 pcs' }, image: 'https://images.unsplash.com/photo-1605888969139-42eca627c24f?q=80&w=200', description: 'Beetroot & peanut cutlet' },
        { name: 'Green Matar Kachuri', pricing: { price: 4, unit: '2 pcs' }, image: 'https://images.unsplash.com/photo-1606491956689-2ea28c674675?q=80&w=200', description: 'Peas stuffed bread' },
        { name: 'Mutton Chop', pricing: { price: 7, unit: '2 pcs' }, image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=200', description: 'Spiced minced mutton' },
        { name: 'Chicken Cutlets', pricing: { price: 6, unit: '3 pcs' }, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=200' },
        { name: 'Chicken 65 Puffs', pricing: { price: 5, unit: '2 pcs' }, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=200' },
        { name: 'Fish Cutlets', pricing: { price: 6, unit: '3 pcs' }, image: 'https://images.unsplash.com/photo-1535568846380-4927df8dd82d?q=80&w=200' },
        { name: 'Chicken Momo', pricing: { price: 10, unit: '10 pcs' }, image: 'https://images.unsplash.com/photo-1625223007374-dbd69b66c7ce?q=80&w=200' },
        { name: 'Dahi Vada', pricing: { price: 5, unit: '5 pcs' }, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=200' },
        { name: 'Vadapav', pricing: { price: 5, unit: '2 pcs' }, image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?q=80&w=200' }
      ]
    },
    {
      id: 'veg', title: 'Veg Entrees', icon: 'eco', type: 'sized',
      items: [
        { name: 'Malai Kofta', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Tawa Fry', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Mix Veg Curry', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Parwal Curry', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Jackfruit Curry', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Okra Masala', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Chole', pricing: { s: 50, m: 90, l: 130 } },
        { name: 'Ghanta Tarkari', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Dal Makhni', pricing: { s: 50, m: 90, l: 130 } },
        { name: 'Aloo Dum', pricing: { s: 50, m: 90, l: 130 } },
        { name: 'Butter Paneer', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Palak Paneer', pricing: { s: 60, m: 100, l: 140 } }
      ]
    },
    {
      id: 'non-veg', title: 'Non-Veg', icon: 'kebab_dining', type: 'sized',
      items: [
        { name: 'Fish Curry (Rohu)', pricing: { s: 70, m: 110, l: 150 } },
        { name: 'Shrimp Malai Curry', pricing: { s: 70, m: 110, l: 150 } },
        { name: 'Chicken Curry', pricing: { s: 60, m: 100, l: 140 } },
        { name: 'Chicken Masala', pricing: { s: 70, m: 110, l: 150 } },
        { name: 'Palak Chicken', pricing: { s: 70, m: 110, l: 150 } },
        { name: 'Chicken Ghee Roast', pricing: { s: 70, m: 110, l: 150 } },
        { name: 'Chicken Butter Masala', pricing: { s: 80, m: 130, l: 180 } },
        { name: 'Goat Curry', pricing: { s: 80, m: 130, l: 180 } },
        { name: 'Saag Goat', pricing: { s: 80, m: 130, l: 180 } }
      ]
    },
    {
      id: 'rice', title: 'Biriyani & Rice', icon: 'rice_bowl', type: 'list',
      items: [
        { name: 'Chicken / Mutton Biriyani', description: 'Aromatic Dum Biriyani' },
        { name: 'Veg / Jackfruit Biriyani', description: 'Vegetarian Special' },
        { name: 'Veg Keema Biriyani', description: 'Minced Veggie Delight' },
        { name: 'Mutton / Veg Pulao', description: 'Rich Pulao' },
        { name: 'Fried Rice (Veg/Chicken)', description: 'Indo-Chinese Style' },
        { name: 'Jeera / Lemon Rice', description: 'Flavored Rice Sides' }
      ]
    },
    {
      id: 'puja', title: 'Puja Food', icon: 'spa', type: 'list',
      items: [
        { name: 'Dalma', description: 'Lentils with Veggies (No Onion/Garlic)' },
        { name: 'Ghanta Tarkari', description: 'Mixed Veggies' },
        { name: 'Dhokar Dalna', description: 'Lentil Cakes in Curry' },
        { name: 'Chenna Tarkari', description: 'Cheese Curd Curry' },
        { name: 'Vendi / Amba / Tomato Khatta', description: 'Sweet & Sour Chutneys' }
      ]
    },
    {
      id: 'eastern', title: 'Eastern Special', icon: 'phishing', type: 'list',
      items: [
        { name: 'Macha Besara', description: 'Fish in Mustard Gravy (Rohu/Mrigal)' },
        { name: 'Shorse Illishi', description: 'Hilsa in Mustard' },
        { name: 'Chingri Malai Curry', description: 'Prawns in Coconut Milk' },
        { name: 'Poi Chingri Ghanta', description: 'Malabar Spinach with Prawns' },
        { name: 'Janhi Aloo Posta', description: 'Ridge Gourd in Poppy Seeds' }
      ]
    },
    {
      id: 'chat', title: 'Chat Special', icon: 'fastfood', type: 'list',
      items: [
        { name: 'Pani Puri / Dahi Puri', description: 'Street Style' },
        { name: 'Samosa / Aloo Tikki Chat', description: 'Spicy & Tangy' },
        { name: 'Palak / Churmur Chat', description: 'Crunchy Savory Snacks' }
      ]
    },
    {
      id: 'dessert', title: 'Desserts', icon: 'icecream', type: 'list',
      items: [
        { name: 'Rasagulla', description: 'Patali Gurer (Jaggery) Available' },
        { name: 'Chenna Poda', description: 'Burnt Cheese Cake' },
        { name: 'Gur Payesh', description: 'Jaggery Rice Pudding' },
        { name: 'Rabdi / Malpua', description: 'Rich Milk Desserts' },
        { name: 'Gajar Halwa', description: 'Carrot Pudding' }
      ]
    }
  ]);
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="min-h-screen bg-background-light py-20 px-4">
//       <div class="max-w-4xl mx-auto">
//         <h1 class="text-5xl font-bold text-center text-deep-red mb-16">Our Menu</h1>
        
//         @for (category of categories; track category) {
//           <div class="mb-16">
//             <h2 class="text-3xl font-bold text-primary mb-8 border-b border-stone-200 pb-2">{{ category.name }}</h2>
//             <div class="grid md:grid-cols-2 gap-8">
//               @for (item of category.items; track item.name) {
//                 <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all">
//                   <div class="flex justify-between items-start mb-2">
//                     <h3 class="text-xl font-bold text-stone-800">{{ item.name }}</h3>
//                     <span class="text-lg font-bold text-primary">\${{ item.price }}</span>
//                   </div>
//                   <p class="text-stone-600">{{ item.description }}</p>
//                 </div>
//               }
//             </div>
//           </div>
//         }
//       </div>
//     </div>
//   `
// })
// export class MenuComponent {
//   // Hardcoded for now, move to Firebase later easily
//   categories = [
//     {
//       name: 'Starters',
//       items: [
//         { name: 'Dahi Bara Aloo Dum', price: 8.99, description: 'Lentil vadas in yogurt water with spicy potato curry.' },
//         { name: 'Gupchup (Pani Puri)', price: 6.99, description: 'Crispy hollow shells filled with spicy tamarind water.' }
//       ]
//     },
//     {
//       name: 'Thalis',
//       items: [
//         { name: 'Kalinga Veg Thali', price: 18.99, description: 'Rice, Dalma, Saga, Khata, and Kheer.' },
//         { name: 'Mutton Kassa Thali', price: 24.99, description: 'Spicy mutton curry served with rice and sides.' }
//       ]
//     }
//   ];
// }