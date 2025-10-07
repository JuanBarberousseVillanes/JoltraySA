import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="wrap section">
      <div class="qs-grid">
        <!-- Bloque título + texto (izquierda) -->
        <div class="qs-copy">
          <h2>Quiénes somos</h2>
          <p class="lead">
            Somos un equipo conformado por profesionales en comercio y finanzas,
            respaldado por técnicos especializados que acompañan cada etapa de la operación.
            Contamos con el soporte en cada área en la que operamos, incluyendo expertos con conocimiento aduanero y perfiles técnicos adecuados a
            cada producto y servicio. Esta combinación de experiencia y supervisión técnica nos permite aplicar
            las mejores prácticas, reducir riesgos y asegurar resultados medibles en cada operación.
          </p>
        </div>

        <!-- Imagen (derecha) -->
        <div class="qs-photo" aria-hidden="true">
          <img src="assets/quienessomos.png" alt="Equipo de trabajo en reunión" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Contenedor principal: ya usamos .wrap .section globales */

    .qs-grid{
      display:grid;
      grid-template-columns: 1.05fr .95fr;         /* texto | imagen */
      gap: clamp(16px, 3vw, 32px);
      align-items:center;
    }

    .qs-copy{
      display:flex;
      flex-direction:column;
      justify-content:center;
      gap: .6rem;
      padding-block: clamp(4px, 1vw, 12px);
    }

    .qs-copy h2{
      margin: 0;
      font-size: clamp(1.6rem, 3.5vw, 2.2rem);
    }

    .qs-copy .lead{
      margin:0;
      color:#555;
      line-height:1.7;
      font-weight:400;
      max-width: 70ch; /* mejor lectura en desktop */
    }

    .qs-photo img{
      width:100%;
      height:auto;
      aspect-ratio: 16 / 11;                    /* imagen consistente sin altura fija */
      object-fit: cover;
      border-radius: var(--radius, 16px);
      border:1px solid #eee;
      box-shadow: var(--shadow-1, 0 8px 24px rgba(0,0,0,.06));
      background:#f5f7fa;
    }

    /* Mobile / tablet: una columna y ajustamos la proporción de la imagen */
    @media (max-width: 980px){
      .qs-grid{ grid-template-columns: 1fr; }
      .qs-photo img{ aspect-ratio: 4 / 3; }     /* un poco más alta en pantallas chicas */
    }
  `]
})
export class AboutComponent {}
