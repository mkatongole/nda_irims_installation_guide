import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { OnlinedashboardComponent } from '../../views/online-dashboard/onlinedashboard/onlinedashboard.component';
import { OnlineLayoutComponent } from '../../views/online-dashboard/online-layout/online-layout.component';

const appRoutes: Routes = [
  {
      path: 'online-dashboard',
      component: OnlineLayoutComponent,
      canActivate: [AuthGuard],
      children: [{
      path: '',
      redirectTo: 'app-services', pathMatch: 'full'   
       },{
        path: 'app-services',
        component: OnlinedashboardComponent
       }],
  },
    ];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, { useHash: true })],
  declarations: []
})
export class OnlinedashboardRoutingModule { }
