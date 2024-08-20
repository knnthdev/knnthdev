import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  email = 'knnthbriones@gmail.com';
  grettings = "Hello I'm Kenneth Briones";
  projects = [
    {
      image: 'assets/projects/project-0.jpg',
      title: 'Website Developer',
      description: 'Si me preguntas ¿Qué area me gusta en el desarrollo de software? Creeme mi favorito es desarrollar app mobil y de escritorio pero la alta demanda de páginas web me ha dado mucha experiencia en este rubro y es dónde más fuerza tengo, mis habilidades se extienden desde Angular hasta Next.JS como también otras plataformas para construir base de datos y micro-servicios.',
      link: '/id01'
    },
    {
      image: 'assets/projects/project-1.jpg',
      title: 'App Developer',
      description: 'Mi primer lenguaje que aprendí fue Visual basic y transaq SQL, hoy cuento muchas habilidades para construir sistemas tanto para teléfonos móbiles como también para Linux y Windows, el desarrollo de aplicaciones web es quien está ganando la batalla por su versabilidad de estar en multiples plataformas.',
      link: '/id02'
    },
    {
      image: 'assets/projects/project-2.jpg',
      title: 'Website Manager',
      description: 'Me destaco por ser emprendedor y de intentar ser lo más autodidacta posible, en mi marca personal ofrezco lo posibilidad de que trabajes conmigo para desarrollar lo que será tu herramienta ayudar a tus clientes en contactar y conocer más sobre ti. Empieza ya y no te quedes sin tu sitio web profesional.',
      link: '/id03'
    },
    {
      image: 'assets/projects/project-3.jpg',
      title: 'Support Technician',
      description: 'El mundo de la tecnología es un mundo muy competitivo asi que no dejo pasar esta oportunidad de ofrecerte mis habilidades de soporte técnico, obten apoyo para la instalación de redes y sistemas operativos ya sea para ti o tu organización, además de atender llamadas para tus clientes y contestar sus mensajes para dar respuesta inmediata.',
      link: '/id04'
    }
  ];

}
