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
            las mejores prácticas, reducir riesgos y asegurar resultados medibles en cada operación.          </p>
        </div>

        <!-- Imagen (derecha) -->
        <div class="qs-photo" aria-hidden="true">
          <img src="assets/quienessomos.png" alt="Equipo de trabajo en reunión" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .section { padding: 48px 16px; }
    .wrap   { max-width: 1100px; margin: 0 auto; }

    .qs-grid{
      display:grid;
      grid-template-columns: 1.1fr .9fr;   /* texto | imagen */
      gap:1.5rem;
      align-items:center;                   /* centra ambos bloques verticalmente */
    }

    /* Centro vertical título+texto y los alineo a la izquierda */
    .qs-copy{
      min-height: 380px;                    /* misma altura que la imagen */
      display:flex;
      flex-direction:column;
      justify-content:center;               /* centra vertical el bloque completo */
    }

    .qs-copy h2{
      margin: 0 0 .6rem;
      font-size: clamp(1.6rem, 3.5vw, 2.2rem);
    }

    .qs-copy .lead{
      margin:0;
      color:#555;
      line-height:1.7;
      font-weight:400;
    }

    .qs-photo img{
      width:100%;
      height:380px;                         /* referencia para el centrado */
      object-fit:cover;
      border-radius:16px;
      border:1px solid #eee;
      box-shadow:0 8px 24px rgba(0,0,0,.06);
      background:#f5f7fa;
    }

    @media (max-width:980px){
      .qs-grid{ grid-template-columns:1fr; gap:1.25rem; }
      .qs-copy{ min-height:0; }             /* en mobile no forzamos altura */
      .qs-photo img{ height:300px; }
    }
  `]
})
export class AboutComponent {}
