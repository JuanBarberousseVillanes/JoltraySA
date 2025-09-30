import { Component } from '@angular/core';

type Service = { title: string; points: string[]; };

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
  <div class="wrap section">
    <h2>Servicios</h2>
    <p>Soluciones punta a punta para potenciar tus operaciones.</p>

    <div class="grid">
      <div class="svc" *ngFor="let s of services">
        <h3>{{ s.title }}</h3>
        <ul>
          <li *ngFor="let p of s.points">{{ p }}</li>
        </ul>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .section { padding: 64px 16px; background:#fafafa; }
    .wrap { max-width: 1100px; margin: 0 auto; }
    h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin-bottom: .5rem; }
    .grid { display:grid; grid-template-columns: repeat(2,1fr); gap: 1rem; margin-top:1rem; }
    .svc { background:#fff; border:1px solid #eee; border-radius:16px; padding:1rem; }
    h3 { margin-top:0; }
    ul { margin: .25rem 0 0 1rem; color:#555; }
    li { margin:.35rem 0; }
    @media (max-width: 800px){ .grid { grid-template-columns: 1fr; } }
  `]
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'Productos',
      points: [
        'Proveedores confiables.',
        'Desarrollo de nuevos productos a medida de la necesidad del cliente.'
      ]
    },
    {
      title: 'Servicios',
      points: [
        'Verificación de mercadería antes de la carga en origen.',
        'Control para asegurar que todo esté correctamente preparado.'
      ]
    },
    {
      title: 'Financiamiento',
      points: [
        'Negociación de condiciones óptimas con proveedores.',
        'Búsqueda de sinergias para mejorar flujo y costos.'
      ]
    },
    {
      title: 'Logística',
      points: [
        'Cotizaciones competitivas en el mercado.',
        'Asesoramiento en ciclos y flujos de importación/exportación para lograr el menor costo.'
      ]
    },
    {
      title: 'Maquinarias',
      points: [
        'Equipos confiables y soporte post-venta.',
        'Foco en industrias papelera, corrugado, plástica y de empaques en general.'
      ]
    }
  ];
}
