import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="wrap section">
      <h2>Contacto</h2>
      <p>Escribinos o llamanos. ¡Respondemos rápido!</p>

      <div class="cards">
        <ng-container *ngIf="emails?.length; else todoEmails">
          <a class="card" *ngFor="let e of emails" [href]="'mailto:' + e">
            <div class="icon">✉️</div>
            <div>
              <h3>Email</h3>
              <p>{{ e }}</p>
            </div>
          </a>
        </ng-container>
        <ng-template #todoEmails>
          <div class="card muted">
            <div class="icon">✉️</div>
            <div>
              <h3>Email</h3>
              <p><em>Agregá los emails de contacto y los vinculamos</em></p>
            </div>
          </div>
        </ng-template>

        <a class="card" [href]="'tel:' + phone">
          <div class="icon">📞</div>
          <div>
            <h3>Teléfono</h3>
            <p>{{ displayPhone }}</p>
          </div>
        </a>

        <a class="card" [href]="whatsAppUrl()" rel="noopener" target="_blank">
          <div class="icon">🟢</div>
          <div>
            <h3>WhatsApp</h3>
            <p>Escribinos por WhatsApp</p>
          </div>
        </a>
      </div>
    </div>

    <!-- Botón flotante WhatsApp -->
    <a class="wpp-fab" [href]="whatsAppUrl()" rel="noopener" target="_blank" aria-label="WhatsApp">
      <img src="assets/whatsapp.svg" alt="WhatsApp" />
    </a>
  `,
  styles: [`
    .section { padding: 64px 16px; }
    .wrap { max-width: 1100px; margin: 0 auto; }
    .cards { margin-top: 1rem; display:grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
    .card { display:flex; gap:.75rem; align-items:center; border:1px solid #eee; border-radius:14px; padding:1rem; background:#fff; text-decoration:none; color:inherit; }
    .card:hover { background:#f8fdf9; border-color:#cdebd9; }
    .card.muted { opacity:.7; }
    .icon { font-size:1.5rem; }
    .wpp-fab {
      position: fixed; right: 18px; bottom: 18px; width: 56px; height:56px; border-radius:50%;
      display:grid; place-items:center; background:#25D366; box-shadow:0 8px 20px rgba(0,0,0,.15);
    }
    .wpp-fab img { width:30px; height:30px; filter: invert(100%); }
    @media (max-width: 900px){ .cards{ grid-template-columns:1fr 1fr; } }
    @media (max-width: 580px){ .cards{ grid-template-columns:1fr; } }
  `]
})
export class ContactComponent {
  @Input() emails: string[] = []; // ej: ['ventas@joltray.com','contacto@joltray.com']
  @Input() phone = '+59898347496'; // Número real de WhatsApp
  @Input() display = '+598 98 347 496';
  @Input() wppMessage = 'Hola! Me gustaría más información.';

  get displayPhone() { return this.display || this.phone; }

  whatsAppUrl() {
    const msg = encodeURIComponent(this.wppMessage);
    const clean = this.phone.replace(/[^\d]/g,''); // 59898347496
    return `https://wa.me/${clean}?text=${msg}`;
  }
}
