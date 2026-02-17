
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

 const firebaseConfig = {
  apiKey: "AIzaSyA8rVZP5TYm-6iTdmtX71XyvxCwQeXvTZE",
  authDomain: "kalinga-kitchen-preview.firebaseapp.com",
  projectId: "kalinga-kitchen-preview",
  storageBucket: "kalinga-kitchen-preview.firebasestorage.app",
  messagingSenderId: "11266258063",
  appId: "1:11266258063:web:fbb2b0a031debc7ba3ecfa",
  measurementId: "G-88QMKK35BR"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};