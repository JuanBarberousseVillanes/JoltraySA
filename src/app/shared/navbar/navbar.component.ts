import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [class.scrolled]="scrolled">
      <nav class="container">
        <div class="brand">Joltray S.A.</div>
        <ul>
          <li><a href="#inicio" (click)="smoothScroll($event, 'inicio')">Inicio</a></li>
          <li><a href="#sobre" (click)="smoothScroll($event, 'sobre')">Nosotros</a></li>
          <li><a href="#servicios" (click)="smoothScroll($event, 'servicios')">Servicios</a></li>
          <li><a href="#contacto" (click)="smoothScroll($event, 'contacto')">Contacto</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    header { position: sticky; top:0; z-index:100; background: rgba(255,255,255,0.9); backdrop-filter: saturate(180%) blur(8px); border-bottom: 1px solid #eee; transition: box-shadow .2s ease; }
    header.scrolled { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
    .container { max-width: 1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding: .75rem 1rem; }
    .brand { font-weight:700; letter-spacing:.3px; }
    ul { display:flex; gap:1rem; list-style:none; margin:0; padding:0; }
    a { text-decoration:none; color:#333; font-weight:500; }
    a:hover { opacity:.8; }
    @media (max-width: 640px){ ul { gap:.6rem; font-size:.95rem; } }
  `]
})
export class NavbarComponent {
  scrolled = false;
  @HostListener('window:scroll') onScroll() { this.scrolled = window.scrollY > 10; }
  smoothScroll(event: Event, id: string) { event.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
