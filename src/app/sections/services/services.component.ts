import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 necesario para *ngFor/*ngIf

type Service = { title: string; points: string[] };

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule], // 👈 habilita *ngFor
  template: `
  <div class="wrap section">
    <h2>Servicios</h2>
    <p class="subtitle">Soluciones punta a punta para potenciar tus operaciones.</p>

    <!-- Intro -->
    <div class="card intro">
      <h3>¿Qué hacemos?</h3>
      <p>
        En Joltray s.a. ayudamos a potenciar tu negocio. Gracias a nuestras conexiones con Asia, Europa y USA,
        acercamos proveedores, servicios y condiciones que permiten escalar operaciones en Latinoamérica
        con menor riesgo y mayor eficiencia.
      </p>
      <p>
        Creamos valor encontrando exactamente lo que necesitás y acompañando cada etapa: selección de proveedores,
        verificación en origen, condiciones de financiamiento, logística integral y soporte técnico cuando la operación lo requiere.
      </p>
    </div>

    <!-- Grid de servicios -->
    <div class="grid">
      <div class="card svc" *ngFor="let s of services">
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
    .wrap    { max-width: 1100px; margin: 0 auto; }
    h2       { font-size: clamp(1.6rem, 3.5vw, 2.2rem); margin: 0 0 .25rem; }
    .subtitle{ margin: 0 0 1rem; color:#667085; }

    .card{ background:#fff; border:1px solid #eee; border-radius:16px; padding:1rem 1.1rem; box-shadow:0 4px 16px rgba(0,0,0,.03); }
    .card h3{ margin:0 0 .4rem; font-size:1.15rem; }
    .card p { margin:.25rem 0; color:#555; }
    .intro  { margin-bottom:1rem; }

    .grid{
      display:grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .svc ul { margin:.25rem 0 0 1.1rem; color:#555; }
    .svc li { margin:.35rem 0; }

    @media (max-width: 900px){
      .grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ServicesComponent {
  services: Service[] = [
    { title: 'Productos', points: [
        'Acceso a proveedores confiables y auditados.',
        'Desarrollo de nuevos productos según la necesidad del cliente.'
      ]},
    { title: 'Servicios', points: [
        'Verificación de mercadería en origen antes de la carga.',
        'Controles para asegurar que cada envío esté correctamente preparado.'
      ]},
    { title: 'Financiamiento', points: [
        'Negociación de condiciones óptimas con cada proveedor.',
        'Sinergias para mejorar flujo y reducir costos financieros.'
      ]},
    { title: 'Logística', points: [
        'Cotizaciones competitivas y comparativas de mercado.',
        'Asesoramiento en ciclos y flujos de importación/exportación para lograr el menor costo.'
      ]},
    { title: 'Maquinarias', points: [
        'Equipos confiables y soporte post-venta.',
        'Foco en papelera, corrugado, plástica y empaques en general.'
      ]}
  ];
}
