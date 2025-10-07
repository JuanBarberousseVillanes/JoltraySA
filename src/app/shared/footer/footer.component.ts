import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="wrap">
        <div class="copy">© {{year}} Joltray S.A. Todos los derechos reservados.</div>
        <nav class="links" aria-label="Enlaces de pie de página">
          <a href="#sobre">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </footer>
  `,
  styles: [`
    :host{ --wrap-max: 1200px; }

    footer{
      border-top:1px solid #eee;
      background:#fff;
      padding: clamp(14px, 2.2vw, 20px) 16px;
    }

    .wrap{
      max-width: var(--wrap-max);
      margin: 0 auto;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap: clamp(8px, 2vw, 16px);
      flex-wrap: wrap; /* permite apilar si no entra */
    }

    .copy{
      color:#444;
      font-size: clamp(.9rem, 1.9vw, 1rem);
    }

    .links{
      display:flex;
      align-items:center;
      gap: clamp(10px, 2.2vw, 18px);
      flex-wrap: wrap;
    }

    .links a{
      color:#444;
      text-decoration:none;
      padding: 8px 10px;              /* tap target + cómodo */
      border-radius: 8px;
      transition: background-color .15s ease, color .15s ease;
    }
    .links a:hover{
      text-decoration:underline;
    }
    .links a:focus-visible{
      outline: 2px solid #94a3b8;
      outline-offset: 2px;
      text-decoration: none;
    }

    /* Mobile: apila y centra */
    @media (max-width: 640px){
      .wrap{ flex-direction:column; align-items:flex-start; }
      .links{ margin-top: 4px; }
    }

    /* Evita solaparse con safe areas (iPhone) y botones flotantes */
    @supports (bottom: env(safe-area-inset-bottom)){
      footer{ padding-bottom: calc(clamp(14px, 2.2vw, 20px) + env(safe-area-inset-bottom)); }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
