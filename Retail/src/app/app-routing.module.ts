import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SignInComponent } from "./sign-in/sign-in.component";
import { HomeComponent } from "./main/home.component";
import { ItemsComponent } from "./items/items.component";
import { ItemComponent } from "./items/item/item.component";

import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "home", component: HomeComponent },
  { path: "sign-in", component: SignInComponent },
  {
    path: "items",
    //canActivate: [AuthGuard],
    component: ItemsComponent,
    children: [{ path: ":id", component: ItemComponent }]
  },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
