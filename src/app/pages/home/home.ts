import { Component } from '@angular/core';
import {  Hero } from '../../components/home/hero/hero';
// import { TodaysSpecialComponent } from '../../components/home/todays-special/todays-special.component';
import { Features } from '../../components/home/features/features';
// import { CtaComponent } from '../../components/cta/cta';
import { TodaysSpecialComponent } from '../../components/home/todays-special/todays-special';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TodaysSpecialComponent , Hero, Features],
  template: `
    <app-hero></app-hero>
    <app-todays-special></app-todays-special>
    <app-features></app-features>
    <!-- <app-cta></app-cta> -->
  `
})
export class HomeComponent {}