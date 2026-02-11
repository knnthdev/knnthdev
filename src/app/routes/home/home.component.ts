import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../forms/contact/contact.component';
import { CVComponent } from '../forms/cv/cv.component';
import { ResponsiveService } from '../../tools/responsive.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  imports: [ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  email = 'knnthbriones@gmail.com';
  grettings = "Hello I'm Kenneth Briones";
  static projects = [
    {
      image: 'assets/projects/project-0.jpg',
      title: 'Desarrollo de sitios web',
      description:
        'A diferencia del desarrollo web tradicional que suele partir directamente del diseño visual o las especificaciones técnicas, mi proceso comienza siempre por el usuario final y los objetivos de negocio. Defino primero una ruta estratégica: investigo y mapeo a la audiencia, sus motivaciones, fricciones y momentos clave.',
      link: 'build-your-website',
    },
    {
      image: 'assets/projects/project-1.jpg',
      title: 'Marketing Digital',
      description:
        'He adquirido nociones iniciales en áreas como SEO básico, conceptos de publicidad online, marketing de contenidos y manejo de redes sociales, siempre aplicándolos en mis propios proyectos o en colaboraciones pequeñas. Mi fortaleza principal radica en el desarrollo técnico y en entender al usuario para crear sitios útiles, pero me motiva integrar estos conocimientos de marketing para que el sitio no solo sea bonito y rápido, sino que realmente ayude a cumplir objetivos de negocio.',
      link: 'digital-marketing',
    },
    {
      image: 'assets/projects/project-2.jpg',
      title: 'Planes y Estrategias',
      description:
        'Me destaco por ser emprendedor y de intentar ser lo más autodidacta posible, en mi marca personal ofrezco la posibilidad de que trabajes conmigo para desarrollar lo que será tu herramienta, ayudar a tus clientes en contactar y conocer más sobre ti. Empieza ya y no te quedes sin tu sitio web.',
      link: 'get-your-plan',
    },
    {
      image: 'assets/projects/project-3.jpg',
      title: 'Support Technician',
      description:
        'El mundo de la tecnología es un mundo muy competitivo asi que no dejo pasar esta oportunidad de ofrecerte mis habilidades de soporte técnico, obten apoyo para la instalación de redes y sistemas operativos ya sea para ti o tu organización, además de atender llamadas para tus clientes y contestar sus mensajes para dar respuesta inmediata.',
      link: 'tell-you',
    },
    {
      image: 'assets/projects/project-4.webp',
      title: 'Diseño de contenido',
      description: 'Como emprendedor, me fascina cómo el diseño de contenido digital puede transformar la presencia en línea de una marca. Me especializo en crear elementos visuales y textuales atractivos que no solo capturan la atención, sino que también impulsan la interacción en plataformas de redes sociales. Mi objetivo es que cada pieza de contenido resuene con la audiencia, comunicando mensajes clave de manera efectiva y contribuyendo al éxito de las campañas publicitarias.',
      link: 'disign-content'
    },
    // {
    //   image: 'assets/projects/project-4.webp',
    //   title: 'Portfolio',
    //   description: 'Como emprendedor, me fascina cómo el diseño de contenido digital puede transformar la presencia en línea de una marca. Me especializo en crear elementos visuales y textuales atractivos que no solo capturan la atención, sino que también impulsan la interacción en plataformas de redes sociales. Mi objetivo es que cada pieza de contenido resuene con la audiencia, comunicando mensajes clave de manera efectiva y contribuyendo al éxito de las campañas publicitarias.',
    //   link: 'disign-content'
    // }
  ];
  projects = HomeComponent.projects;

  constructor(private rs: ResponsiveService, private title : Title, private meta : Meta) { }

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      this.settingMetaSEO();
      this.rs.changeTheme("green");
    }
  }

  settingMetaSEO() {
  }

}
