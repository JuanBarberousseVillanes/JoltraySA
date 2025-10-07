import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact section">
      <div class="wrap">
        <h2>Contacto</h2>
        <p class="subtitle">No dudes en contactarnos.</p>

        <!-- Intro institucional -->
        <div class="intro-copy card">
          <p>En <strong>Joltray S.A.</strong> estamos comprometidos en darle el mejor servicio.</p>
          <p>Si Ud. quiere conocer más acerca de nosotros, no dude en contactarnos y a la brevedad nos comunicaremos.</p>
          <p>Muchas gracias.</p>
        </div>

        <div class="layout">
          <!-- Panel de información (teléfono y correo) -->
          <aside class="info-panel">
            <div class="block">
              <h3>Teléfono</h3>
              <a class="info" href="tel:REEMPLAZAR_NUMERO_PRINCIPAL">
                +598 98 347 496
              </a>
            </div>

            <div class="block">
              <h3>Correo electrónico</h3>
              <a class="info" href="mailto:REEMPLAZAR_EMAIL_DESTINO"
                 [innerText]="'contacto@joltray.com.uy'">
              </a>
            </div>

            <div class="quick">
              <a class="btn whatsapp"
                 [href]="waHref()"
                 target="_blank" rel="noopener">
                WhatsApp
              </a>
            </div>
          </aside>

          <!-- Card formulario -->
          <div class="card form-card">
            <form [formGroup]="frm" (ngSubmit)="onSubmit()">
              <label class="field">
                <span>Email</span>
                <input type="email" formControlName="email" placeholder="tuemail@ejemplo.com" />
                <small class="err" *ngIf="submitted() && frm.controls.email.invalid">
                  Ingresá un email válido.
                </small>
              </label>

              <label class="field">
                <span>Motivo / Consulta</span>
                <textarea formControlName="message" rows="8" placeholder="Contanos cómo podemos ayudarte"></textarea>
                <small class="err" *ngIf="submitted() && frm.controls.message.invalid">
                  Introduzca un mensaje de al menos 10 caracteres explicando el motivo de consulta.
                </small>
              </label>

              <div class="actions">
                <button class="btn primary" type="submit" [disabled]="loading()">
                  {{ loading() ? 'Enviando…' : 'Enviar' }}
                </button>
                <span *ngIf="status() === 'ok'" class="ok">¡Mensaje enviado! Te contactaremos a la brevedad.</span>
                <span *ngIf="status() === 'err'" class="err">Ocurrió un error. Probá de nuevo en unos minutos.</span>
              </div>
            </form>
          </div>
        </div>

        <p class="helper">
          *Completá los campos con tu dirección de correo electrónico y motivo de consulta. Nos pondremos en contacto lo antes posible.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .section{ padding:64px 16px; background:#fafafa; }
    .wrap{ max-width:1100px; margin:0 auto; }
    h2{ font-size:clamp(1.6rem,3.5vw,2.2rem); margin:0 0 .25rem; }
    .subtitle{ margin:0 0 1.5rem; color:#667085; }

    .card{ background:#fff; border:1px solid #eee; border-radius:16px; padding:1.25rem; box-shadow:0 4px 16px rgba(0,0,0,.04); }
    .intro-copy{ margin-bottom:1.25rem; }

    .layout{ display:grid; grid-template-columns: 1fr; gap:1.25rem; }
    @media (min-width: 960px){
      .layout{ grid-template-columns: 380px 1fr; }
    }

    .info-panel{
      background:#0F2451; color:#fff;
      border-radius:16px; padding:1.25rem 1rem;
      box-shadow:0 6px 20px rgba(0,0,0,.12);
    }
    .info-panel .block{ margin-bottom:1rem; }
    .info-panel h3, .info-panel h4{ margin:.1rem 0 .35rem; font-weight:700; }
    .info-panel h3{ font-size:1.05rem; }
    .info-panel h4{ font-size:.95rem; opacity:.95; }
    .info-panel .info{ color:#E6F0FF; text-decoration:none; display:inline-block; line-height:1.35; }
    .info-panel .info:hover{ text-decoration:underline; }

    .quick{ display:flex; gap:.5rem; margin-top:.75rem; }
    .btn{ display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.7rem 1rem; border-radius:12px; border:1px solid transparent; cursor:pointer; text-decoration:none; }
    .btn.whatsapp{ background:#25D366; color:#0b1512; font-weight:600; }
    .btn.primary{ background:#111827; color:#fff; }
    .btn[disabled]{ opacity:.7; cursor:not-allowed; }

    .form-card .field{ display:flex; flex-direction:column; gap:.4rem; margin-bottom:1rem; }
    .form-card .field span{ font-weight:600; color:#111827; }
    input, textarea{
      width:100%; padding:.8rem 1rem; border-radius:12px; border:1px solid #e5e7eb; background:#f9fafb;
      outline:none; transition:border-color .2s ease, background .2s ease; font: inherit;
    }
    input:focus, textarea:focus{ border-color:#94a3b8; background:#fff; }
    .actions{ display:flex; align-items:center; gap:.75rem; margin-top:.25rem; flex-wrap:wrap; }
    .ok{ color:#059669; }
    .err{ color:#dc2626; }

    .helper{ color:#98A2B3; font-size:.85rem; margin-top:.75rem; }
  `]
})
export class ContactComponent implements OnDestroy {
  private fb = inject(FormBuilder);

  // ========= Configurable =========
  readonly WHATSAPP_NUMBER = '59898347496';        // formato internacional sin + ni espacios
  readonly DEST_EMAIL = 'jbvcontacto@gmail.com';   // destino mailto (cambiar cuando uses API)

  frm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  loading = signal(false);
  status = signal<'idle'|'ok'|'err'>('idle');
  submitted = signal(false);

  // timers para auto-ocultar mensajes
  private statusTimer?: any;
  private submittedTimer?: any;

  waHref() {
    const base = 'https://wa.me/';
    const text = `Hola, estoy interesado/a en obtener más información. Mi email es: ${this.frm.value.email ?? ''}`;
    return `${base}${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  async onSubmit() {
    this.submitted.set(true);
    this.status.set('idle');

    // Si es inválido, muestra validaciones y las oculta solas
    if (this.frm.invalid) {
      clearTimeout(this.submittedTimer);
      this.submittedTimer = setTimeout(() => this.submitted.set(false), 3500); // 3.5 s
      return;
    }

    this.loading.set(true);
    try {
      // ==== Envío provisional por mailto (hasta tener API) ====
      const subject = 'Contacto web';
      const body = `Email: ${this.frm.value.email}\n\nMensaje:\n${this.frm.value.message}`;
      window.location.href = `mailto:${this.DEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Mostrar éxito y auto-ocultar
      this.status.set('ok');
      clearTimeout(this.statusTimer);
      this.statusTimer = setTimeout(() => this.status.set('idle'), 4000); // 4 s

      this.frm.reset();
      this.submitted.set(false);
    } catch (e) {
      console.error(e);
      this.status.set('err');
      clearTimeout(this.statusTimer);
      this.statusTimer = setTimeout(() => this.status.set('idle'), 4000); // 4 s
    } finally {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.statusTimer);
    clearTimeout(this.submittedTimer);
  }
}
