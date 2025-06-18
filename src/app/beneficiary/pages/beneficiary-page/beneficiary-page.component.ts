import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';

@Component({
  selector: 'app-beneficiary-page',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './beneficiary-page.component.html',
})
export default class BeneficiaryPageComponent {
  mainLinks = [
    {
      name: 'Inicio',
      url: '/home',
      icon: 'fas fa-home',
    },
    {
      name: 'Portfolio',
      url: '/portfolio',
      icon: 'fas fa-folder-open',
    },
    {
      name: 'Equipo',
      url: '/equipo',
      icon: 'fas fa-users',
    },
    {
      name: 'Blog',
      url: '/blog',
      icon: 'fas fa-blog',
    },
    {
      name: 'Contacto',
      url: '/contacto',
      icon: 'fas fa-envelope',
    },
  ];
}
