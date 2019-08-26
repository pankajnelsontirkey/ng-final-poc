import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./admin.guard";
import { AdminDashboardComponent } from "./adminDashboard.component";

const AdminRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
