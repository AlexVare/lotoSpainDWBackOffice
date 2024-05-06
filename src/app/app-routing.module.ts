import { Component, NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PrincIpalPageComponent } from './princ-ipal-page/princ-ipal-page.component';
import { PostComponent } from './post/post.component';
import { AutoresComponent } from './autores/autores.component';
import { ProductosComponent } from './home/productos/productos.component';
import { AuthClassGuard } from './services/auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthClassGuard] ,//funcional//
    canActivate: [() => inject(AuthClassGuard).canActivate()],
    component: NavigationComponent,

  },
  {
    path: 'login',
    component: LoginComponent,

  },

  {
    path: 'i',
    component: NavigationComponent,
    // canActivate: [() => inject(AuthClassGuard).canActivate()],

    // // canActivate: [AuthClassGuard] ,//funcional//
    // canActivateChild: [() => inject(AuthClassGuard).canActivate()],
    children: [
      {
        path: 'home',

        component: HomeComponent,

      },
      {
        path: 'post',

        component: PostComponent,

      },
      {
        path: 'autores',
        component: AutoresComponent,

      },
      {
        path: 'products',
        component: ProductosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
