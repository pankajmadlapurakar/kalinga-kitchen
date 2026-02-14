import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";
import {  NavbarComponent } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kalinga-kitchen');
}
