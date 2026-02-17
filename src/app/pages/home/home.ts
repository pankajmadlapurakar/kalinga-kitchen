import { Component } from '@angular/core';
import {  Hero } from '../../components/home/hero/hero';
// import { TodaysSpecialComponent } from '../../components/home/todays-special/todays-special.component';
import { Features } from '../../components/home/features/features';
// import { CtaComponent } from '../../components/cta/cta';
import { RouterLink } from '@angular/router';
import { TodaysSpecialsComponent } from "../../components/home/todays-special/todays-special";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Hero, Features, TodaysSpecialsComponent],
  template: `
    <app-hero></app-hero>
    <app-todays-specials></app-todays-specials>
    <app-features></app-features>
    <!-- <app-cta></app-cta> -->
  `
})
export class HomeComponent {}