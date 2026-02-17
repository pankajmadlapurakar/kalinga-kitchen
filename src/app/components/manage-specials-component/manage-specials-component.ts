import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpecialsService, Special } from '../../services/specials-service';
import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-manage-specials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-specials-component.html'
})
export class ManageSpecialsComponent {
  private fb = inject(FormBuilder);
  private specialsService = inject(SpecialsService);
  private auth = inject(Auth);
  private storage = inject(Storage);

  currentUser = toSignal(authState(this.auth), { initialValue: null });
  loginError = signal('');

  specials = toSignal(this.specialsService.getUpcomingSpecials(), { initialValue: [] });
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  uploadProgress = signal<number | null>(null);
  editingId = signal<string | null>(null);
  specialForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    type: ['daily', Validators.required],
    imageUrl: ['']
  });

  async login() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    try {
      await signInWithEmailAndPassword(this.auth, email!, password!);
      this.loginError.set('');
    } catch (err) {
      this.loginError.set('Invalid email or password');
    }
  }

  logout() {
    signOut(this.auth);
  }

  onSubmit() {
    if (this.specialForm.invalid) return;
    const val = this.specialForm.value;

    if (this.editingId()) {
      this.specialsService.updateSpecial(this.editingId()!, val);
    } else {
      this.specialsService.addSpecial(val);
    }
    this.cancelEdit();
  }

  startEdit(special: Special) {
    this.editingId.set(special.id!);
    
    // Convert Firestore Timestamp to YYYY-MM-DD for input[type="date"]
    let dateStr = special.date;
    if (special.date) {
      const d = (special.date as any).toDate ? (special.date as any).toDate() : new Date(special.date);
      if (!isNaN(d.getTime())) dateStr = d.toISOString().split('T')[0];
    }

    this.specialForm.patchValue({ ...special, date: dateStr });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteSpecial(id: string | undefined) {
    if (!id) return;
    if (confirm('Delete this special?')) this.specialsService.deleteSpecial(id);
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const filePath = `specials/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadProgress.set(progress);
      },
      (error) => {
        console.error('Upload failed', error);
        this.uploadProgress.set(null);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        this.specialForm.patchValue({ imageUrl: downloadURL });
        this.uploadProgress.set(null);
      }
    );
  }

  cancelEdit() {
    this.editingId.set(null);
    this.specialForm.reset({ type: 'daily', date: new Date().toISOString().split('T')[0], price: 0, imageUrl: '' });
  }

  isDaily(special: Special): boolean {
    return special.type === 'daily';
  }

  isHoliday(special: Special): boolean {
    return (special.type as string) === 'holiday';
  }

  formatDate(date: any): string {
    if (date && typeof date.toDate === 'function') return date.toDate().toLocaleDateString();
    return new Date(date).toLocaleDateString();
  }
}









// src/app/admin/manage-specials/manage-specials.component.ts
// import { Component, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// import { toSignal } from '@angular/core/rxjs-interop';

// import { SpecialsService } from '../../services/specials-service';
// import { Timestamp } from 'firebase/firestore';

// @Component({
//   selector: 'app-manage-specials',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './manage-specials-component.html',
// })
// export class ManageSpecialsComponent {
//   private fb = inject(FormBuilder);
//   private specialsService = inject(SpecialsService);

//   // Signal to hold the list of upcoming specials
//   specials = toSignal(this.specialsService.getUpcomingSpecials(), { initialValue: [] });

//   specialForm = this.fb.group({
//     title: ['', Validators.required],
//     description: [''],
//     date: ['', Validators.required],
//     type: ['daily', Validators.required], // Default to daily
//     price: ['']
//   });

//   async onSubmit() {
//     if (this.specialForm.valid) {
//       try {
//         await this.specialsService.addSpecial(this.specialForm.value);
//         this.specialForm.reset({ type: 'daily' }); // Reset form but keep default type
//         alert('Special scheduled successfully!');
//       } catch (error) {
//         console.error('Error adding special', error);
//         alert('Failed to add special.');
//       }
//     }
//   }

//   async deleteSpecial(id: string | undefined) {
//     if (!id) return;
//     if (confirm('Are you sure you want to delete this scheduled special?')) {
//       await this.specialsService.deleteSpecial(id);
//     }
//   }

//   // Helper to format Firestore Timestamp to readable date
//   formatDate(timestamp: any): string {
//     if (timestamp instanceof Timestamp) {
//       return timestamp.toDate().toLocaleDateString();
//     }
//     return '';
//   }
// }
