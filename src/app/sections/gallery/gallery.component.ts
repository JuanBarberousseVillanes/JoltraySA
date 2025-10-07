import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: `
    <div class="wrap section">
      <h2>Galería</h2>

      <div class="grid">
        <img
          *ngFor="let i of images; let idx = index"
          [src]="'assets/gallery/' + i + '.jpg'"
          [alt]="'Imagen ' + i"
          loading="lazy"
          decoding="async"
          [attr.sizes]="sizesAttr"
          class="ph"
        />
      </div>
    </div>
  `,
  styles: [`
    .section { padding: clamp(48px, 6vw, 80px) 16px; background:#fafafa; }
    .wrap    { max-width: 1200px; margin: 0 auto; }

    /* Grilla fluida: crea tantas columnas como entren cómodas */
    .grid{
      margin-top: 1rem;
      display:grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: clamp(10px, 2vw, 16px);
    }

    /* Imágenes con misma proporción y sin saltos de layout */
    img{
      width: 100%;
      aspect-ratio: 16 / 10;    /* ajustable: 4/3, 1/1, 21/9, etc. */
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid #eee;
      background: #f2f2f2;
      box-shadow: 0 4px 12px rgba(0,0,0,.04);
      transition: transform .25s ease, box-shadow .25s ease;
    }

    /* Hover (solo desktop) */
    @media (hover: hover){
      img:hover{
        transform: translateY(-2px) scale(1.01);
        box-shadow: 0 10px 22px rgba(0,0,0,.10);
      }
    }
  `]
})
export class GalleryComponent {
  // poné 6 fotos en assets/gallery/1.jpg ... 6.jpg
  images = [1,2,3,4,5,6];

  // Ayuda al navegador a elegir resolución según viewport/columna
  // - <=580px: ocupa todo el ancho (~100vw)
  // - <=900px: aprox 50vw
  // - >900px: aprox 33vw
  sizesAttr = '(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw';
}
