import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login/login.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'app',
    loadChildren: () => import('./application/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
