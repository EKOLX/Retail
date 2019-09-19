import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./main/home.component";
import { ItemsComponent } from "./items/items.component";
import { ItemComponent } from "./items/item/item.component";

import { AuthGuard } from "./guards/auth.guard";
import { LockOutGuard } from "./guards/lock-out.guard";

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "home", component: HomeComponent, canDeactivate: [LockOutGuard] },
  { path: "sign-in", component: SignInComponent },
  {
    path: "items",
    component: ItemsComponent,
    //canActivate: [AuthGuard],
    children: [{ path: ":id", component: ItemComponent }]
  },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
