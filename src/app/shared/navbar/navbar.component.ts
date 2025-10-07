import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [class.scrolled]="scrolled">
      <nav class="container">
        <a class="brand" href="#inicio" (click)="smoothScroll($event, 'inicio')">Joltray S.A.</a>

        <!-- Botón hamburguesa (solo mobile) -->
        <button class="burger"
                type="button"
                aria-label="Abrir menú"
                aria-controls="main-menu"
                [attr.aria-expanded]="menuOpen"
                (click)="toggleMenu()">
          <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>

        <!-- Menú desktop -->
        <ul class="menu" id="main-menu">
          <li><a href="#inicio" (click)="smoothScroll($event, 'inicio')">Inicio</a></li>
          <li><a href="#sobre" (click)="smoothScroll($event, 'sobre')">Nosotros</a></li>
          <li><a href="#servicios" (click)="smoothScroll($event, 'servicios')">Servicios</a></li>
          <li><a href="#contacto" (click)="smoothScroll($event, 'contacto')">Contacto</a></li>
        </ul>
      </nav>

      <!-- Menú móvil (drawer simple) -->
      <div class="mobile-panel" [class.open]="menuOpen">
        <a href="#inicio"    (click)="navAndClose($event, 'inicio')">Inicio</a>
        <a href="#sobre"     (click)="navAndClose($event, 'sobre')">Nosotros</a>
        <a href="#servicios" (click)="navAndClose($event, 'servicios')">Servicios</a>
        <a href="#contacto"  (click)="navAndClose($event, 'contacto')">Contacto</a>
      </div>
    </header>
  `,
  styles: [`
    :host{ --wrap-max: 1200px; --nav-h: 64px; }

    header{
      position: sticky; top:0; z-index: 200;
      background: rgba(255,255,255,0.9);
      backdrop-filter: saturate(180%) blur(8px);
      border-bottom: 1px solid #eee;
      transition: box-shadow .2s ease, background-color .2s ease;
    }
    header.scrolled{ box-shadow: 0 4px 12px rgba(0,0,0,.08); }

    .container{
      max-width: var(--wrap-max);
      margin: 0 auto;
      display:flex; align-items:center; justify-content:space-between;
      padding: .6rem 1rem;
      min-height: var(--nav-h);
    }

    .brand{
      font-weight:800; letter-spacing:.3px; color:#111827; text-decoration:none;
      font-size: clamp(1.05rem, 2.5vw, 1.2rem);
    }

    /* Menú desktop */
    .menu{
      display:flex; gap: clamp(.6rem, 2.2vw, 1rem);
      list-style:none; margin:0; padding:0;
    }
    .menu a{
      text-decoration:none; color:#333; font-weight:600;
      padding: .55rem .7rem; border-radius:10px;
      transition: background-color .15s ease, color .15s ease, opacity .15s ease;
    }
    .menu a:hover{ background:#f2f4f7; }

    /* Burger (oculto en desktop) */
    .burger{
      display:none; position:relative;
      width: 42px; height: 38px; border:0; background:transparent; cursor:pointer;
      border-radius:8px;
    }
    .burger:focus-visible{ outline: 2px solid #94a3b8; outline-offset: 2px; }
    .burger .bar{
      display:block; width: 24px; height: 2px; margin: 5px auto;
      background:#111827; border-radius:2px; transition: transform .2s ease, opacity .2s ease;
    }

    /* Panel móvil */
    .mobile-panel{
      display:none; position: absolute; inset: calc(var(--nav-h)) 0 auto 0;
      background: #ffffff; border-bottom:1px solid #eee;
      padding: .4rem .8rem .9rem;
      box-shadow: 0 8px 24px rgba(0,0,0,.08);
    }
    .mobile-panel a{
      display:block; padding:.8rem; border-radius:10px; color:#111827; text-decoration:none; font-weight:600;
    }
    .mobile-panel a:hover{ background:#f2f4f7; }

    /* Breakpoint: mobile/tablet */
    @media (max-width: 900px){
      .menu{ display:none; }
      .burger{ display:inline-block; }
      .mobile-panel{ display:block; pointer-events:none; opacity:0; transform: translateY(-6px); transition: opacity .18s ease, transform .18s ease; }
      .mobile-panel.open{ pointer-events:auto; opacity:1; transform: translateY(0); }
    }
  `]
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll') onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 900 && this.menuOpen) this.menuOpen = false;
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  navAndClose(event: Event, id: string) {
    this.menuOpen = false;
    this.smoothScroll(event, id);
  }

  smoothScroll(event: Event, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // offset para que no quede tapado por el header sticky
    const header = (document.querySelector('header') as HTMLElement) ?? null;
    const offset = header ? header.getBoundingClientRect().height + 6 : 70;

    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
