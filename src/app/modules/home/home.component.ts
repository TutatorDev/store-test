import { Component } from '@angular/core';
import { GeneralService } from '../../core/services/general.service';
import { ZnLoaderComponent } from '../../project/components/zn-loader/zn-loader.component';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule, NgIf } from '@angular/common';
import { NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ZnLoaderComponent,
    TranslateModule,
    SidebarModule,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  date = new Date();
  sidebarVisible = false;
  items = [
    {
       label: 'Dashboard',
       icon: 'grid_view',
       routerLink: 'dashboard',
       permission: true,
    },
    {
      label: "Test",
      icon: "science",
      routerLink: "test",
      permission: true
    },
    {
      label: "Test 2",
      icon: "store",
      routerLink: "test2",
      permission: true
    }
  ];
  user = this.gs.user;

  constructor(public gs: GeneralService, private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((event) => {
      this.sidebarVisible = false;
    });

  }
  toggleSideMenu() {

    this.sidebarVisible = !this.sidebarVisible;
  }
}
