import { Component, inject, signal } from '@angular/core';
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
        <p class="subtitle">Escribinos y te respondemos a la brevedad.</p>

        <!-- Intro institucional -->
        <div class="intro-copy card">
          <p>En <strong>Joltray S.A.</strong> estamos comprometidos en darle el mejor servicio.</p>
          <p>Si Ud. quiere conocer más acerca de nosotros, no dude en contactarnos y a la brevedad nos comunicaremos.</p>
          <p>Muchas gracias.</p>
        </div>

        <div class="layout">
          <!-- Panel de información (teléfonos y correo) -->
          <aside class="info-panel">
            <div class="block">
              <h3>Teléfonos</h3>
              <!-- Reemplazar el href tel: y los textos -->
              <a class="info" href="tel:REEMPLAZAR_NUMERO_PRINCIPAL">
                (+598) 2708 9936 – 8 líneas colectivas
                <!-- Ejemplo: (+598) 2708 9936 – 8 líneas colectivas -->
              </a>
            </div>

            <div class="block">
              <h4>Fuera del horario de oficina</h4>
              <!-- Reemplazar el href tel: y los textos -->
              <a class="info" href="tel:REEMPLAZAR_NUMERO_EMERGENCIA">
                Teléfono de emergencias<br/>
                (+598) 96 365 304
                <!-- Ejemplo: (+598) 96 365 304 -->
              </a>
            </div>

            <div class="block">
              <h3>Correo electrónico</h3>
              <!-- Reemplazar el mailto: y el texto -->
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
              <!-- Configurar el número en WHATSAPP_NUMBER más abajo -->
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
                  Escribí al menos 10 caracteres.
                </small>
              </label>

              <div class="actions">
                <button class="btn primary" type="submit" [disabled]="loading()">
                  {{ loading() ? 'Enviando…' : 'Enviar' }}
                </button>
                <span *ngIf="status() === 'ok'" class="ok">¡Mensaje enviado! Te estaremos contactando.</span>
                <span *ngIf="status() === 'err'" class="err">Ocurrió un error. Probá de nuevo en unos minutos.</span>
              </div>
            </form>
          </div>
        </div>

        <p class="helper">
          *Completá los campos con tu direccion de correo electronico y motivo de consulta. Nos podremos en contacto lo antes posiblers de <strong>teléfono</strong>, <strong>emergencias</strong>, <strong>correo</strong> y <strong>WhatsApp</strong>.
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
      background:#0F2451; /* azul profundo */
      color:#fff;
      border-radius:16px;
      padding:1.25rem 1rem;
      box-shadow:0 6px 20px rgba(0,0,0,.12);
    }
    .info-panel .block{ margin-bottom:1rem; }
    .info-panel h3, .info-panel h4{
      margin:.1rem 0 .35rem;
      font-weight:700;
    }
    .info-panel h3{ font-size:1.05rem; }
    .info-panel h4{ font-size:.95rem; opacity:.95; }
    .info-panel .info{
      color:#E6F0FF;
      text-decoration:none;
      display:inline-block;
      line-height:1.35;
    }
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
export class ContactComponent {
  private fb = inject(FormBuilder);

  // ========= Completar luego =========
  /* WhatsApp: número en formato internacional sin + ni espacios (ej.: 59891234567) */
  readonly WHATSAPP_NUMBER = 'REEMPLAZAR_NUMERO_WA';

  /* Email destino para recibir formularios (usado en API o fallback mailto) */
  readonly DEST_EMAIL = 'REEMPLAZAR_EMAIL_DESTINO';

  frm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  loading = signal(false);
  status = signal<'idle'|'ok'|'err'>('idle');
  submitted = signal(false);

  waHref() {
    const base = 'https://wa.me/';
    const text = `Hola, quiero más información. Mi email es: ${this.frm.value.email ?? ''}`;
    return `${base}${this.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  async onSubmit() {
    this.submitted.set(true);
    this.status.set('idle');
    if (this.frm.invalid) return;

    this.loading.set(true);
    try {
      // ==== Opción A: tu API (recomendado) ====
      // const res = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: this.DEST_EMAIL,
      //     email: this.frm.value.email,
      //     message: this.frm.value.message,
      //   }),
      // });
      // if (!res.ok) throw new Error('HTTP ' + res.status);

      // ==== Opción C: Fallback mailto (hasta configurar backend) ====
      const subject = 'Contacto web';
      const body = `Email: ${this.frm.value.email}\n\nMensaje:\n${this.frm.value.message}`;
      window.location.href = `mailto:${this.DEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      this.status.set('ok');
      this.frm.reset();
      this.submitted.set(false);
    } catch (e) {
      console.error(e);
      this.status.set('err');
    } finally {
      this.loading.set(false);
    }
  }
}
