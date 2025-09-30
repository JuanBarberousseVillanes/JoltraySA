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
        <app-contact
          [emails]="emails"
          phone="+59898347496"
          [display]="'+598 98 347 496'"
          wppMessage="¡Hola! Vengo desde la web de Joltray s.a. y me gustaría más información.">
        </app-contact>
      </section>
    </main>

    <app-footer></app-footer>
  `
})
export class AppComponent {
  // TODO: reemplazar por los emails reales de contacto
  emails = [ 'completar@joltray.com' ];
}
