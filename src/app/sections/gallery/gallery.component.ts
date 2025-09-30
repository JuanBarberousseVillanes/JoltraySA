import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: `
  <div class="wrap section">
    <h2>Galería</h2>
    <div class="grid">
      <img *ngFor="let i of images" [src]="'assets/gallery/' + i + '.jpg'" [alt]="'Imagen ' + i" loading="lazy">
    </div>
  </div>
  `,
  styles: [`
    .section { padding: 64px 16px; background:#fafafa; }
    .wrap { max-width: 1100px; margin: 0 auto; }
    .grid { margin-top:1rem; display:grid; grid-template-columns: repeat(3, 1fr); gap:.75rem; }
    img { width:100%; height:220px; object-fit:cover; border-radius:12px; border:1px solid #eee; background:#f2f2f2; }
    @media (max-width: 900px){ .grid{ grid-template-columns:1fr 1fr; } img{ height:200px; } }
    @media (max-width: 580px){ .grid{ grid-template-columns:1fr; } img{ height:180px; } }
  `]
})
export class GalleryComponent {
  images = [1,2,3,4,5,6]; // poné 6 fotos en assets/gallery/1.jpg ... 6.jpg
}
