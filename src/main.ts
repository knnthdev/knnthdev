import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// Interface for Image Element (optional, but improves type safety)
interface ImageElement {
  src: string;
  alt: string;
}

function onClick(element: ImageElement): void {
  const img01 = document.getElementById('img01') as HTMLImageElement; // Type assertion for clarity
  img01.src = element.src;

  const modal01 = document.getElementById('modal01') as HTMLElement;
  modal01.style.display = 'block';

  const captionText = document.getElementById('caption') as HTMLElement;
  captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = myFunction;

function myFunction(): void {
  const navbar = document.getElementById('myNavbar') as HTMLElement;
  const isScrolled = window.scrollY > 100; // More modern approach for scroll position

  navbar.className = isScrolled
    ? 'w3-bar w3-card w3-animate-top w3-gray'
    : navbar.className.replace('w3-bar w3-card w3-animate-top w3-gray', 'w3-bar');
}
