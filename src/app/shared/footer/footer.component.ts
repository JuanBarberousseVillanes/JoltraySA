import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="wrap">
        <div>© {{year}} Joltray s.a. Todos los derechos reservados.</div>
        <div class="links">
          <a href="#sobre">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer { border-top:1px solid #eee; padding: 18px 16px; background:#fff; }
    .wrap { max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:.75rem; }
    .links { display:flex; gap:.75rem; }
    a { color:#444; text-decoration:none; }
    a:hover { text-decoration:underline; }
    @media (max-width:640px){ .wrap{ flex-direction:column; } }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
