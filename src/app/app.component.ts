import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { ContactComponent } from './sections/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, HeroComponent, AboutComponent, ServicesComponent, ContactComponent],
  template: `
    <app-navbar></app-navbar>

    <main>
      <section id="inicio"><app-hero></app-hero></section>
      <section id="sobre"><app-about></app-about></section>
      <section id="servicios"><app-services></app-services></section>
      <section id="contacto">
        <app-contact></app-contact>
      </section>
    </main>

    <app-footer></app-footer>

    <!-- Botón flotante de WhatsApp -->
    <a class="wapp-float"
       [href]="waHref"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Chatear por WhatsApp">
      <!-- usa ruta relativa por si el sitio no está en la raíz del dominio -->
      <img src="assets/whatsapp.png" alt="WhatsApp" />
    </a>

  `,
  styles: [`
    .wapp-float{
      position: fixed;
      right: max(16px, env(safe-area-inset-right));
      bottom: calc(16px + env(safe-area-inset-bottom));
      width: 56px; height: 56px;
      border-radius: 50%;
      background: #25D366;
      box-shadow: 0 10px 24px rgba(0,0,0,.18);
      display: grid; place-items: center;
      z-index: 2000;
      text-decoration: none;
      transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
    }
    .wapp-float:hover{
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(0,0,0,.22);
      filter: brightness(0.95);
    }
    .wapp-float img{
      width: 60%; height: 60%; object-fit: contain;
      filter: drop-shadow(0 1px 0 rgba(0,0,0,.1));
    }
    @media (max-width: 480px){
      .wapp-float{ width: 52px; height: 52px; }
    }
    /* ultra-chico: subilo un poquito para no pisar el footer */
    @media (max-width: 360px){
      .wapp-float{ bottom: calc(22px + env(safe-area-inset-bottom)); }
    }
  `]
})
export class AppComponent {
  private readonly WAPP_NUMBER = '59898347496';

  get waHref(): string {
    const msg = '¡Hola! Vengo desde la web de Joltray S.A. y me gustaría más información sobre los servicios que brindan.';
    return `https://wa.me/${this.WAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }
}

