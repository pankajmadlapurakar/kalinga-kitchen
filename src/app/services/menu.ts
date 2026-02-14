import { Injectable, signal } from '@angular/core';

export interface DailySpecial {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private storageKey = 'kalinga_daily_special';

  private defaultSpecials: DailySpecial[] = [{
    title: 'Special Mutton Curry',
    description: 'Slow-cooked goat meat with traditional Odia spices, served with rice.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=800',
    available: true
  }];

  todaysSpecials = signal<DailySpecial[]>(this.loadSpecials());

  private loadSpecials(): DailySpecial[] {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [parsed];
    }
    return this.defaultSpecials;
  }

  updateSpecials(specials: DailySpecial[]) {
    this.todaysSpecials.set(specials);
    localStorage.setItem(this.storageKey, JSON.stringify(specials));
  }
}