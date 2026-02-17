// // src/app/services/specials.service.ts
// import { Injectable, inject } from '@angular/core';
// import { Observable, tap, catchError, of } from 'rxjs';
// import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, updateDoc } from '@angular/fire/firestore';

// export interface Special {
//   id?: string;
//   title: string;
//   description: string;
//   price: number;
//   date: any; // Firestore Timestamp or Date
//   type: 'daily' | 'weekly' | 'seasonal' | 'holiday';
//   imageUrl?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class SpecialsService {
//   private firestore = inject(Firestore);
//   private specialsCollection = collection(this.firestore, 'specials');

//   // Fetch specials starting from today, ordered by date
//   getUpcomingSpecials(): Observable<Special[]> {
//     const q = query(
//       this.specialsCollection,
//       orderBy('date', 'asc')
//     );
    
//     return (collectionData(q, { idField: 'id' }) as Observable<Special[]>).pipe(
//       tap(data => console.log('Specials fetched from DB:', data)),
//       catchError(error => {
//         console.error('Error fetching specials (Check app.config.ts imports):', error);
//         return of([]); // Return empty array so the app doesn't crash
//       })
//     );
//   }

//   addSpecial(special: Special) {
//     // Convert string date from input to Firestore Timestamp
//     const specialData = {
//         ...special,
//         date: new Date(special.date)
//     };
//     return addDoc(this.specialsCollection, specialData);
//   }

//   updateSpecial(id: string, data: Partial<Special>) {
//     const docRef = doc(this.firestore, 'specials', id);
//     const updateData = { ...data };
//     // If date is being updated (it comes as string from form), convert to Timestamp
//     if (updateData.date && typeof updateData.date === 'string') {
//         updateData.date = new Date(updateData.date);
//     }
//     return updateDoc(docRef, updateData);
//   }

//   deleteSpecial(id: string) {
//     const docRef = doc(this.firestore, 'specials', id);
//     return deleteDoc(docRef);
//   }
// }
import { Injectable, inject } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, updateDoc, where, Timestamp } from '@angular/fire/firestore';

export interface Special {
  id?: string;
  title: string;
  description: string;
  price: number;
  date: any; 
  type: 'daily' | 'weekly' | 'seasonal' | 'holiday';
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpecialsService {
  private firestore = inject(Firestore);
  
  // Use a getter instead of a class property
  private get specialsCollection() {
    return collection(this.firestore, 'specials');
  }

  getUpcomingSpecials(): Observable<Special[]> {
    const q = query(
      this.specialsCollection,
      orderBy('date', 'asc')
    );
    
    return (collectionData(q, { idField: 'id' }) as Observable<Special[]>).pipe(
      tap(data => console.log('Specials fetched from DB:', data)),
      catchError(error => {
        console.error('Error fetching specials:', error);
        return of([]);
      })
    );
  }

  addSpecial(special: Special) {
    const specialData = {
      ...special,
      date: Timestamp.fromDate(new Date(special.date))
    };
    return addDoc(this.specialsCollection, specialData);
  }

  updateSpecial(id: string, data: Partial<Special>) {
    const docRef = doc(this.firestore, 'specials', id);
    const updateData = { ...data };
    if (updateData.date && typeof updateData.date === 'string') {
      updateData.date = Timestamp.fromDate(new Date(updateData.date));
    }
    return updateDoc(docRef, updateData);
  }

  deleteSpecial(id: string) {
    const docRef = doc(this.firestore, 'specials', id);
    return deleteDoc(docRef);
  }
}