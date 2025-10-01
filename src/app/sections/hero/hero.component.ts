import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero">
      <div class="overlay"></div>
      <div class="content">
        <h1>Potenciamos tu negocio en <span>Latinoamérica</span></h1>
        <p>Con conexiones en Asia, Europa y USA, acercamos productos, servicios, financiamiento, logística y maquinaria a tus operaciones.</p>
        <a href="#contacto" class="cta">Contactanos</a>
      </div>
    </section>
  `,
  styles: [`
    .hero { position:relative; min-height: 78vh; display:grid; place-items:center; background: url('/assets/Transporte.png') center/cover no-repeat; color:#fff; }
    .overlay { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.55)); }
    .content { position:relative; text-align:center; padding: 0 1rem; }
    h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight:800; line-height:1.1; }
    h1 span { color: #ffd166; }
    p { margin:.75rem 0 1.25rem; opacity:.95; font-size:clamp(1rem, 2.5vw, 1.15rem); }
    .cta { display:inline-block; padding:.8rem 1.2rem; border-radius:999px; background:#06c167; color:#fff; font-weight:700; text-decoration:none; }
    .cta:hover { filter:brightness(0.95); }
  `]
})
export class HeroComponent {}
