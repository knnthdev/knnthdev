import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../forms/contact/contact.component';
import { CVComponent } from '../forms/cv/cv.component';
import { ResponsiveService } from '../../tools/responsive.service';


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
      title: 'Website Developer',
      description:
        'Si me preguntas ¿Qué area me gusta en el desarrollo de software? Creeme mi favorito es desarrollar app mobil y de escritorio pero la alta demanda de páginas web me ha dado mucha experiencia en este rubro y es dónde más fuerza tengo, mis habilidades se extienden desde Angular hasta Next.JS como también otras plataformas para construir base de datos y micro-servicios.',
      link: 'build-your-website',
    },
    {
      image: 'assets/projects/project-1.jpg',
      title: 'Digital Marketing',
      description:
        'A lo largo de mi carrera, he adquirido una sólida experiencia en Marketing Digital, abarcando áreas como SEO, SEM, marketing de contenidos y gestión de redes sociales. Mi enfoque se centra en desarrollar estrategias integrales que impulsen el crecimiento y la visibilidad de la marca en el entorno digital.',
      link: 'digital-marketing',
    },
    {
      image: 'assets/projects/project-2.jpg',
      title: 'Website Manager',
      description:
        'Me destaco por ser emprendedor y de intentar ser lo más autodidacta posible, en mi marca personal ofrezco lo posibilidad de que trabajes conmigo para desarrollar lo que será tu herramienta ayudar a tus clientes en contactar y conocer más sobre ti. Empieza ya y no te quedes sin tu sitio web profesional.',
      link: 'get-your-plan',
    },
    {
      image: 'assets/projects/project-3.jpg',
      title: 'Support Technician',
      description:
        'El mundo de la tecnología es un mundo muy competitivo asi que no dejo pasar esta oportunidad de ofrecerte mis habilidades de soporte técnico, obten apoyo para la instalación de redes y sistemas operativos ya sea para ti o tu organización, además de atender llamadas para tus clientes y contestar sus mensajes para dar respuesta inmediata.',
      link: 'JGht83CvLrWsngHTXZyid04',
    },
  ];
  projects = HomeComponent.projects;

  constructor(private rs: ResponsiveService) {}

  ngOnInit(): void {
    if (this.rs.isLoaded()) {
      this.rs.changeTheme("green");
    }
  }

}
