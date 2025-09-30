import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="wrap section">
      <h2>Quiénes somos</h2>
      <p>
        Joltray s.a. está integrada por profesionales en comercio y finanzas, con soporte de técnicos especializados por área
        (incluyendo conocimiento aduanero). Así garantizamos mejores prácticas y resultados en cada operación.
      </p>

      <div class="cards">
        <div class="card">
          <h3>Especialidad regional</h3>
          <p>Latinoamérica es nuestro foco: entendemos origen y destino para soluciones integrales y concretas.</p>
        </div>
        <div class="card">
          <h3>Alianzas globales</h3>
          <p>Vínculos en Asia, Europa y USA para encontrar lo que necesitás y negociar las mejores condiciones.</p>
        </div>
        <div class="card">
          <h3>Equipo técnico</h3>
          <p>Técnicos adecuados por producto/servicio y soporte post-venta cuando la operación lo requiere.</p>
        </div>
      </div>

      <h2 style="margin-top:2rem;">Dónde estamos</h2>
      <p>
        Base en la República Oriental del Uruguay, con acceso ágil a Chile, Argentina, Perú, Paraguay y Ecuador.
      </p>

      <h2 style="margin-top:2rem;">Nuestro valor</h2>
      <p>
        Combinamos conocimiento de origen y destino para bajar costos, acortar ciclos y reducir riesgo en importaciones y exportaciones.
      </p>
    </div>
  `,
  styles: [`
    .section { padding: 64px 16px; }
    .wrap { max-width: 1100px; margin: 0 auto; }
    h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: .75rem; }
    p { color:#555; }
    .cards { margin-top: 1.25rem; display:grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
    .card { border:1px solid #eee; border-radius:16px; padding: 1rem; background:#fff; }
    .card h3 { margin-top:0; }
    @media (max-width: 900px){ .cards{ grid-template-columns:1fr 1fr; } }
    @media (max-width: 580px){ .cards{ grid-template-columns:1fr; } }
  `]
})
export class AboutComponent {}
