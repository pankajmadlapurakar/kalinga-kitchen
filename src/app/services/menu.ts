import { Injectable, inject } from '@angular/core';
// import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DailySpecial } from '../models/special.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  // private firestore = inject(Firestore);

  // getTodaysSpecial(): Observable<DailySpecial> {
  //   // Fetches the document 'specials/today' from Firestore
  //   const specialDoc = doc(this.firestore, 'specials/today');
  //   return docData(specialDoc) as Observable<DailySpecial>;
  // }
}