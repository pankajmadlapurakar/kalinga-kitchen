// src/app/models/special.model.ts

import { Timestamp } from "firebase/firestore";

export interface Special {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional: if you want to allow image uploads later
  date: Timestamp;   // The date this special is active
  type: 'daily' | 'holiday';
  price?: number;
}
