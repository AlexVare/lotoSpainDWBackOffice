import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss', './queries/navigation.component-mobile.scss']
})
export class NavigationComponent {
  @ViewChild('drawer')
  drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  navigateToTienda() {
    this.router.navigate(['i/products']);
  }

  navigateToInicio(){
    this.router.navigate(['i/home'])
  }

  navigateToAutores() {
    this.router.navigate(['i/autores']);
  }

  navigateToPost() {
    this.router.navigate(['i/post']);
  }

  // Estos métodos se pueden llamar en respuesta a eventos, por ejemplo, en un botón.
  isMenuOpen = false;
  // ...

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openDrawer() {
    console.log('openDrawer() called');
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }
  logout(){
    localStorage.removeItem('Token');
    this.router.navigate(['login']);
  }
}

